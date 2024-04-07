// Firebase core
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAf4SnLmWrUKfU06BxlO5vNCapRuBYbQdc",
    authDomain: "filmchaser-wmdd02.firebaseapp.com",
    projectId: "filmchaser-wmdd02",
    storageBucket: "filmchaser-wmdd02.appspot.com",
    messagingSenderId: "731346899702",
    appId: "1:731346899702:web:ffa3bfd185516dbf0fd2d7",
    measurementId: "G-K0SQT99MCY",
    databaseURL: "https://filmchaser-wmdd02-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export { firebase };