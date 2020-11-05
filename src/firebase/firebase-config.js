import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyC1ZwjVoOwtGvsfyo_bGtjUaF2zTtCoa-4",
    authDomain: "react-app-cursos-7fd0b.firebaseapp.com",
    databaseURL: "https://react-app-cursos-7fd0b.firebaseio.com",
    projectId: "react-app-cursos-7fd0b",
    storageBucket: "react-app-cursos-7fd0b.appspot.com",
    messagingSenderId: "1063561440842",
    appId: "1:1063561440842:web:d7180b94a181a93d6100b3"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider=new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }