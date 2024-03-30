  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBdATvjw1T2LvQjN_41oOnXgGGuto6dQxM",
  authDomain: "angular2024-8774c.firebaseapp.com",
  projectId: "angular2024-8774c",
  storageBucket: "angular2024-8774c.appspot.com",
  messagingSenderId: "248105714710",
  appId: "1:248105714710:web:a324787eba7af43c4a6137",
  measurementId: "G-Y0WKWM3CVD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);