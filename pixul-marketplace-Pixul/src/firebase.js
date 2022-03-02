import {initializeApp, getApps} from 'firebase/app';
import {getAuth, connectAuthEmulator} from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// See https://firebase.google.com/docs/web/setup for more details.
if (getApps().length === 0) {

  initializeApp({
    "projectId": "thecollective-4667a",
    "appId": "1:333602383518:web:d94a0342c89439d7273d8f",
    "storageBucket": "thecollective-4667a.appspot.com",
    "locationId": "us-central",
    "apiKey": "AIzaSyCoM6J7p2Bxg_n3sR0PPb8n1emleM46cgs",
    "authDomain": "thecollective-4667a.firebaseapp.com",
    "messagingSenderId": "333602383518",
    "measurementId": "G-01X9FR01YC"
  });

// fetch('/__/firebase/init.json').then(async response => {
//   initializeApp(await response.json());
// });
}

const db = getFirestore();
const authentication = getAuth;
const auth = getAuth();

// Create a root reference
const storage = getStorage();

// eslint-disable-next-line no-restricted-globals
  if (location.hostname === 'localhost') {
    connectFirestoreEmulator(db, "localhost", 8080);
    connectAuthEmulator(auth, 'http://localhost:9099/');
    connectStorageEmulator(storage, "localhost", 9199);
  }

export { db, authentication, auth, storage  };