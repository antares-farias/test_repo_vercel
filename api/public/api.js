//import { config } from './config.js';
const config = {
    port: 3000,
    url: 'http://localhost'
}
const backendURL = config.url+":"+config.port+"/";
function test() {
    console.log('test');
}
function get(endPoint ,paramArr, cb){
    console.log(paramArr);
    var params = "?";
    Object.keys(paramArr).forEach(function(key){
        params += key + "=" + paramArr[key] + "&";
    });
    console.log(backendURL+ endPoint+"/"+params)
    $.ajax({
        method: "GET",
        url: backendURL + endPoint+"/"+params,
    })
    .done(function( data ) {
        console.log( "Data GET: " + JSON.stringify(data) );
        cb(data);
    });
}
function post(endPoint, dataIn){
    $.ajax({
        method: "POST",
        url: backendURL+endPoint,
        data: dataIn
    })
    .done(function( data ) {
        console.log( "Data POST: " + JSON.stringify(data) );
        cb(data);
    });
}
/*export default {
    get,
    post,
    test
};*/