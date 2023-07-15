import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyACECEi2IJkNolpk6y3WaOudbe8ioJ6oH0",
    authDomain: "agency-renovate.firebaseapp.com",
    databaseURL: "https://agency-renovate-default-rtdb.firebaseio.com",
    projectId: "agency-renovate",
    storageBucket: "agency-renovate.appspot.com",
    messagingSenderId: "992416303439",
    appId: "1:992416303439:web:41da49500c44d4eb5fdd3a"
};

if (!firebase.length) {
    // Firebase init
    firebase.initializeApp(config);
}

const secondary = firebase.initializeApp(config, "Secondary");

export const auth = firebase.auth;
export const database = firebase.database;
export const storage = firebase.storage;

// New instance for user creation and keep them signed out.
export const secondaryApp = secondary;
