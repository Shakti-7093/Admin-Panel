import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPnNWmAxBREeBUUqgIulKmlGyWvLRpr2E",
  authDomain: "authentication-66f7f.firebaseapp.com",
  projectId: "authentication-66f7f",
  storageBucket: "authentication-66f7f.appspot.com",
  messagingSenderId: "809074683801",
  appId: "1:809074683801:web:4ef010af29b74a3ade6d08",
  measurementId: "G-EX4CSSZNDS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };