import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPnNWmAxBREeBUUqgIulKmlGyWvLRpr2E",
  authDomain: "authentication-66f7f.firebaseapp.com",
  projectId: "authentication-66f7f",
  storageBucket: "authentication-66f7f.appspot.com",
  messagingSenderId: "809074683801",
  appId: "1:809074683801:web:59992a90bff3abe2de6d08",
  measurementId: "G-9DMKQP1LCT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };