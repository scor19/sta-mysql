// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC-E0o8kmdoh4Y7G2vxIvP4QUUqwCI1PfE',
  authDomain: 'simple-turn-app.firebaseapp.com',
  projectId: 'simple-turn-app',
  storageBucket: 'simple-turn-app.appspot.com',
  messagingSenderId: '409397797504',
  appId: '1:409397797504:web:c75e23435c446553ebfc65',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
