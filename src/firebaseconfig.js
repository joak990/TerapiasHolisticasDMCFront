
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, setPersistence } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDVDik8WXVOK9SQqn_c_3vuh0_Q_pzoDYI",
    authDomain: "terapiasholisticasdmc.firebaseapp.com",
    projectId: "terapiasholisticasdmc",
    storageBucket: "terapiasholisticasdmc.appspot.com",
    messagingSenderId: "807008836405",
    appId: "1:807008836405:web:0c1a6abdc94eeb41c24a7c",
    measurementId: "G-0V9C0E1M69"
  };
  
  const app = getApps.length >0 ? getApp() : initializeApp(firebaseConfig)

  const firestore = getFirestore(app)
  const storage = getStorage(app)
  const auth = getAuth(app);

  export {auth,app,firestore,storage}