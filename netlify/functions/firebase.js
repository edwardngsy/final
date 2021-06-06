const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyD4j1LGSGq4i5LUe7nEqr6d_Lha2bfzH2Q",
  authDomain: "kiei-451-d48d7.firebaseapp.com",
  projectId: "kiei-451-d48d7",
  storageBucket: "kiei-451-d48d7.appspot.com",
  messagingSenderId: "161828601481",
  appId: "1:161828601481:web:8ed02708769570bbcc1058"
} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase