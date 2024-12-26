import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA1SDKIHFs8WCV6Km_ym6OIYImqEbfN7ZI",
  authDomain: "amer-3f64c.firebaseapp.com",
  databaseURL: "https://amer-3f64c-default-rtdb.firebaseio.com",
  projectId: "amer-3f64c",
  storageBucket: "amer-3f64c.firebasestorage.app",
  messagingSenderId: "339491266126",
  appId: "1:339491266126:web:10e27a59e59916f7dbed1f",
  measurementId: "G-9R47D8Q7T1"
}

const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);

 export default db