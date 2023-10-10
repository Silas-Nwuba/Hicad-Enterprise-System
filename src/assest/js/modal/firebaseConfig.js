// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAWmJQaTFanBEi-TPisitO-LrGFOmGA8s8",
  authDomain: "enterprise-project-2ccfa.firebaseapp.com",
  projectId: "enterprise-project-2ccfa",
  storageBucket: "enterprise-project-2ccfa.appspot.com",
  messagingSenderId: "706949740442",
  appId: "1:706949740442:web:8d088f2535bb2239aeec23",
  measurementId: "G-84P7JWZMXP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
