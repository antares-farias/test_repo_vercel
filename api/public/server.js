import express from 'express';
import {config} from './public/config.js';
const app = express()
const port = config.port

import bodyParser from 'body-parser';
app.use(express.urlencoded({ extended: true }));
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

import connect_fb from './connect_firebase.js';
//const server = require('http').Server(app);
//const helmet = require('helmet');

/*app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	next();
});/*/

//send index
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
//send public folder
app.use('/public', express.static(__dirname + '/public'));
//get example
app.get('/testget/', (req, res) => {
    res.status(200);
	res.json(
        { 
            working: true,
            param1: req.query.param1,
            param2: req.query.param2
        });
	res.end();
});
//post example
app.post('/testpost', (req, res) => {
    const param1 = req.body.param1;
    const param2 = req.body.param2;

    res.status(200);
	res.json({
        working: true,
        'param1': param1,
        'param2': param2
        });
	res.end();
});
// firebase: create user
app.get('/createUser', (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    connect_fb.createUser(email, password, (data) => {
        res.status(200);
        res.send(data);
    });
});
// firebase: sing user
app.get('/singUser', (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    connect_fb.singIn(email, password, (data) => {
        res.status(200);
        res.send(data);
    });
});
// firebase: setData
app.get('/getDB', (req, res) => {
    const table = req.query.table;
    console.log('Getting__ '+table);
    connect_fb.getStorage(table, (data) => {
        res.status(200);
        res.send(data);
    });
});
// firebase: putData
app.post('/putDB', (req, res) => {
    const table = req.body.table;
    const dataIn = req.body.data;
    connect_fb.putStorage(table, dataIn, (data) => {
        res.status(200);
        res.json(data);
        res.end();
    });
});
// firebase: upsertData
app.post('/upsertDB', (req, res) => {
    const table = req.body.table;
    const id = req.body.id;
    const dataIn = req.body.data;
    connect_fb.updateStorage(table, id, dataIn, (data) => {
        res.status(200);
        res.json(data);
        res.end();
    });
});
// firebase: deleteData
app.post('/delDB', (req, res) => {
    const table = req.body.table;
    const id = req.body.id;
    connect_fb.removeStorage(table, id, (data) => {
        res.status(200);
        res.json(data);
        res.end();
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})