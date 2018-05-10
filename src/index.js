import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from "firebase";


// Initialize Firebase
var config = {
    apiKey: "AIzaSyDMKo_jUktFUt8OAHdn0_X4v4GerbhypGs",
    authDomain: "classchat-b26c2.firebaseapp.com",
    databaseURL: "https://classchat-b26c2.firebaseio.com",
    projectId: "classchat-b26c2",
    storageBucket: "classchat-b26c2.appspot.com",
    messagingSenderId: "719587954062"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();