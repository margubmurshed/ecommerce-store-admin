import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyBp1F8MgyhLbEaazZiZPqeK5X-dZasLYR8",
  authDomain: "margub-webshop.firebaseapp.com",
  projectId: "margub-webshop",
  storageBucket: "margub-webshop.appspot.com",
  messagingSenderId: "114059764871",
  appId: "1:114059764871:web:04c1044c19aad82e828422",
  measurementId: "G-VSMB3B0LJV"
};

export const FirebaseINIT = firebase.initializeApp(firebaseConfig);
export const FireStore = FirebaseINIT.firestore();
export const FirebaseAuth = FirebaseINIT.auth();
export const Storage = firebase.storage().ref();