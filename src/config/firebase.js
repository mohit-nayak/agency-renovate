import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyAvy4eAb-SJ6sP8wiFc-ItxAn5-LYRDlVg",
    authDomain: "agencyrenovate.firebaseapp.com",
    databaseURL: "https://agencyrenovate-default-rtdb.firebaseio.com",
    projectId: "agencyrenovate",
    storageBucket: "agencyrenovate.appspot.com",
    messagingSenderId: "143010439922",
    appId: "1:143010439922:web:e07f01c8194d07b0bce66b",
    measurementId: "G-PSK4SHDDBL"
};

if (!firebase.length) {
    // Firebase init
    firebase.initializeApp(config);
}

export const auth = firebase.auth;
export const database = firebase.database;
export const storage = firebase.storage;
