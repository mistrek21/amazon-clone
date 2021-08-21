import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCwKPNE3IrZhvbe7pZEQQzLL6x43lHlKMY",
  authDomain: "fir-9be70.firebaseapp.com",
  projectId: "fir-9be70",
  storageBucket: "fir-9be70.appspot.com",
  messagingSenderId: "501208186261",
  appId: "1:501208186261:web:67718d274d4c6b82ad4a9c",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore;

export default db;
