// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD17My_biUI-PcH0Xhf9QYbwDk44mn6-cQ",
    authDomain: "ticketing-system-c6af2.firebaseapp.com",
    projectId: "ticketing-system-c6af2",
    storageBucket: "ticketing-system-c6af2.appspot.com",
    messagingSenderId: "239817268797",
    appId: "1:239817268797:web:2fc92bed7fd13d164f5454"
};

// Initialize Firebase
const cong = initializeApp(firebaseConfig);
export default cong;