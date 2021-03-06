import React from 'react';
require('es6-promise').polyfill();
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './style/css/index.scss';
import App from './App';
const appId = 'app-wrapper';
ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById(appId));
/**
 * 
 * Firebase Setup
 */

var config = {
    apiKey: "AIzaSyAxUoFv6a4aIOr1UqsS960Vuo2xoQFdki0",
    authDomain: "mystuff-57cd4.firebaseapp.com",
    databaseURL: "https://mystuff-57cd4.firebaseio.com",
    projectId: "mystuff-57cd4",
    storageBucket: "mystuff-57cd4.appspot.com",
    messagingSenderId: "58394593767"
};


if ('serviceWorker' in navigator) {
    firebase.initializeApp(config);
    var messaging = firebase.messaging();
    messaging.requestPermission().then(function () {
        return messaging.getToken();
    }).then(function (token) {
        console.log(token);
        window.localStorage.setItem('deviceToken', token);
    }).catch(function (err) {
         
        console.log("No Permission!! ",err);
    });

    messaging.onMessage(function (payload) {
        console.log('Message received. ', payload);
    });

    navigator.serviceWorker.register('firebase-messaging-sw.js')
            .then(function (registration) {
                if ('sync' in registration) {
                    console.log("Set reg in store !!!");
                    store.reg = registration;
                }
                console.log('Registration successful, scope is:', registration.scope);
            }).catch(function (err) {
        console.log('Service worker registration failed, error:', err);
    });
}