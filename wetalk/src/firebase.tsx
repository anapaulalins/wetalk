import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCi5hkCDzKbscq3ZunRUmLhvrDH4-vNyk8',
  authDomain: 'wetalk-464ff.firebaseapp.com',
  projectId: 'wetalk-464ff',
  storageBucket: 'wetalk-464ff.appspot.com',
  messagingSenderId: '128970528113',
  appId: '1:128970528113:web:04a3e3bb9deb5386c852d0',
  databaseURL: '',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default () => {
  return {firebase, auth, firestore, storage};
};
