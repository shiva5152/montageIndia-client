// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrF39-NlW5oBtZKIrHjIpJjz_F_6gwB80",
    authDomain: "montageindia-81ad1.firebaseapp.com",
    projectId: "montageindia-81ad1",
    storageBucket: "montageindia-81ad1.appspot.com",
    messagingSenderId: "950428576686",
    appId: "1:950428576686:web:98c676908485a4f405763f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);