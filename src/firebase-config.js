import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyD_V07ekOJ0l92mTmXsuzV8rO5i2rG-_tw",
    authDomain: "fir-tutorial-7a61c.firebaseapp.com",
    projectId: "fir-tutorial-7a61c",
    storageBucket: "fir-tutorial-7a61c.firebasestorage.app",
    messagingSenderId: "3618455915",
    appId: "1:3618455915:web:988acb2256a5fbf38a0c2e",
    measurementId: "G-P0P94Z3SH7"
  };

  const app = initializeApp(firebaseConfig)

  export const db= getFirestore(app)