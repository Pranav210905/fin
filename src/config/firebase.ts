import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAQs6kaNW0f_0sGLkKlXL3w1Kea80sAivE",
  authDomain: "investwise-fin.firebaseapp.com",
  projectId: "investwise-fin",
  storageBucket: "investwise-fin.firebasestorage.app",
  messagingSenderId: "579509820852",
  appId: "1:579509820852:web:9cc5c589a037412a94e6e1"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);