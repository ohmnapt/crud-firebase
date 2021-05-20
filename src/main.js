import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import firebase from 'firebase'

let app
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDtRbgAA8I_YZ09OvTr5vBY-bAKG5sCdyw",
    authDomain: "rentproject-1d0fa.firebaseapp.com",
    databaseURL: "https://rentproject-1d0fa-default-rtdb.firebaseio.com",
    projectId: "rentproject-1d0fa",
    storageBucket: "rentproject-1d0fa.appspot.com",
    messagingSenderId: "933093247152",
    appId: "1:933093247152:web:dd8235ebcdb6473bba1375",
    measurementId: "G-SBSTCXGJ0P"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user)=>{
    if(!app){
        app = createApp(App).use(router).mount('#app')
    }
})

  