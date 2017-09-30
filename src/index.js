import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase';
import registerServiceWorker from './registerServiceWorker';

const config = {
    apiKey: "AIzaSyAMdSPThgSl0yk9GEZmw2AlwFX1PfYRIi0",
    authDomain: "dummy-project-login.firebaseapp.com",
    databaseURL: "https://dummy-project-login.firebaseio.com",
    projectId: "dummy-project-login",
    storageBucket: "dummy-project-login.appspot.com",
    messagingSenderId: "120569584911"
};
firebase.initializeApp(config);

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
