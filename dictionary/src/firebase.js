import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7jyeMM1j2DcPl02FK8_mIq-Hn8MXL9Oo",
  authDomain: "sparta-react-f05ca.firebaseapp.com",
  projectId: "sparta-react-f05ca",
  storageBucket: "sparta-react-f05ca.appspot.com",
  messagingSenderId: "387824718666",
  appId: "1:387824718666:web:c65aaeaa6b1c2b887d27b3",
  measurementId: "G-WCHKL2ZBH9"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };