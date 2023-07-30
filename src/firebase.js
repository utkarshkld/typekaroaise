// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC7knM_dwhv10QYNzCGaSBlCI-XrfV42zA",
    authDomain: "typekaroaise.firebaseapp.com",
    projectId: "typekaroaise",
    storageBucket: "typekaroaise.appspot.com",
    messagingSenderId: "991453292178",
    appId: "1:991453292178:web:e691a1ab2132b82cbe284b",
    databaseURL: "https://typekaroaise-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);