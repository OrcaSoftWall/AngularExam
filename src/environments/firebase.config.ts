import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyA9Hp5-6godR6x3BzzbHlFgNA1QO2iACds",
  authDomain: "softuniangular2024.firebaseapp.com",
  projectId: "softuniangular2024",
  storageBucket: "softuniangular2024.appspot.com",
  messagingSenderId: "767820601047",
  appId: "1:767820601047:web:3cdc5607d6839329018292",
  measurementId: "G-7V71D2EQ54"
};

export const googleMapConfig = {
  apiKey:'AIzaSyBdATvjw1T2LvQjN_41oOnXgGGuto6dQxM',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);