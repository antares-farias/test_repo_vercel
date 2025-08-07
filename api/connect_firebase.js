/**
 * Doc
 * https://firebase.google.com/docs/auth/web/start#web-version-8
 */
 import { initializeApp } from "firebase/app";
 import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
 import { getFirestore, collection, doc, getDocs, addDoc, updateDoc, deleteDoc   } from "firebase/firestore";
 import {firebaseConfig} from "./public/config.js";
 /*const firebaseConfig = {
  apiKey: "AIzaSyCagpmwCMzy4OjwYsJZOhNbtUxcJAkRumc",
  authDomain: "campayotwitch.firebaseapp.com",
  projectId: "campayotwitch",
  storageBucket: "campayotwitch.appspot.com",
  messagingSenderId: "576532675614",
  appId: "1:576532675614:web:488dde5e71ec38bd12020f",
  measurementId: "G-8309TLTERT"
};*/

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object


console.log(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

//create user 
function createUser(email, password, cb) {
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log('user');
        var user = userCredential.user;
        cb(user);
        // ...
      })
      .catch((error) => {
        console.log('error', error.message);
        var errorCode = error.code;
        var errorMessage = error.message;
        cb(error);
        // ..
      });
}

function singIn(email, password, cb) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        cb(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        cb(error);
      });
}
async function getStorage(table, cb){
    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, table));
    var colArr = [];
    querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    colArr.push(doc.data());
    });
    cb(colArr);
}
async function putStorage(table, data, cb){
  var resp = {};
  const db = getFirestore(app);
  try {
    const docRef = await addDoc(collection(db, table), data);
    console.log("Document written with ID: ", docRef.id);
    resp.id = docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    resp.error = e;
  }
    cb(resp);
}
async function updateStorage(table, id, data, cb){
  var resp = {};
  const db = getFirestore(app);
  try {
    const updateRef = doc(db, table, id);

    // Set the "capital" field of the city 'DC'
    const updoc = await updateDoc(updateRef, data);
    resp = updoc;
  } catch (e) {
    console.error("Error updating document: ", e);
    resp.error = e;
  }
    cb(resp);
}
async function removeStorage(table, id, cb){
  var resp = {};
  const db = getFirestore(app);
  try {
    await deleteDoc(doc(db, table, id));
    resp.status = "DONE";
  } catch (e) {
    console.error("Error deleting document: ", e);
    resp.error = e;
  }
    cb(resp);
}

const connect_fb = {
    createUser: createUser,
    singIn: singIn,
    getStorage: getStorage,
    putStorage: putStorage,
    updateStorage: updateStorage,
    removeStorage: removeStorage,
};
  
export default connect_fb;