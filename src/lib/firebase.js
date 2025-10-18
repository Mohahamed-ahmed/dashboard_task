import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWvjuEUGgBGosVaj0qeaCUJcXVI2twDbo",
  authDomain: "dashboard-task-173f4.firebaseapp.com",
  projectId: "dashboard-task-173f4",
  storageBucket: "dashboard-task-173f4.appspot.com",
  messagingSenderId: "292280631991",
  appId: "1:292280631991:web:abfe94379e623155528332",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
