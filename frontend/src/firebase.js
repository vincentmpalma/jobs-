import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2mxmsoT-s22Q4CbOuP9sOXTqXfEJbjSI",
  authDomain: "jobs-d38ea.firebaseapp.com",
  projectId: "jobs-d38ea",
  storageBucket: "jobs-d38ea.firebasestorage.app",
  messagingSenderId: "1034812179044",
  appId: "1:1034812179044:web:014ffc985c889f246b1571",
  measurementId: "G-FYWSM3FJE5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();