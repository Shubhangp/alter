import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBCKY9PPhRLpZ7xLOynwYuknVruFix2sPc",
    authDomain: "alter-c21bf.firebaseapp.com",
    projectId: "alter-c21bf",
    storageBucket: "alter-c21bf.appspot.com",
    messagingSenderId: "1069679776670",
    appId: "1:1069679776670:web:c9669cbffd87aeab8f7c8f",
    measurementId: "G-5D5ZYEKY0V"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };