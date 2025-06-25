import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRIvb59DgoM4fsCvO01dv_yHGgRSOemVE",
  authDomain: "projetofront-8409b.firebaseapp.com",
  projectId: "projetofront-8409b",
  storageBucket: "projetofront-8409b.firebasestorage.app",
  messagingSenderId: "830911128084",
  appId: "1:830911128084:web:4709918a09686efef27d01"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
