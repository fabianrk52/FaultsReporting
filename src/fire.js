 import firebase from 'firebase'
 var firebaseConfig = {
    apiKey: "AIzaSyDzBn60yA_DYdcV4zWdQhNbnNGVaG_Z7TU",
    authDomain: "error-reporting-88098.firebaseapp.com",
    databaseURL: "https://error-reporting-88098.firebaseio.com",
    projectId: "error-reporting-88098",
    storageBucket: "error-reporting-88098.appspot.com",
    messagingSenderId: "611096331923",
    appId: "1:611096331923:web:a91cbaba69ac70449bef66",
    measurementId: "G-1VH15VVN4E"
  };
  // Initialize Firebase
var fire = firebase.initializeApp(firebaseConfig);
export default fire;