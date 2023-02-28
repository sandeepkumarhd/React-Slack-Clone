import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzn0h75wd1jiT5rU7u_lfDCG83j2zaO2s",
  authDomain: "react-slack-clone-f7ae6.firebaseapp.com",
  projectId: "react-slack-clone-f7ae6",
  storageBucket: "react-slack-clone-f7ae6.appspot.com",
  messagingSenderId: "211308263195",
  appId: "1:211308263195:web:1294fc0c4099fb7c8bc5be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;