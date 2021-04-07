/* eslint-disable import/no-anonymous-default-export */
import firebase from 'firebase/app'
import "firebase/firebase-auth"
import "firebase/firebase-firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCi5hkCDzKbscq3ZunRUmLhvrDH4-vNyk8",
    authDomain: "wetalk-464ff.firebaseapp.com",
    projectId: "wetalk-464ff",
    storageBucket: "wetalk-464ff.appspot.com",
    messagingSenderId: "128970528113",
    appId: "1:128970528113:web:04a3e3bb9deb5386c852d0",
    databaseURL: "",
};


const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

const auth = firebaseApp.auth()

export default () => {
    return {auth, db, firebase};
};