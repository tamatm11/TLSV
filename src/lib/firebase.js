/** @format */

// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // <--- 1. Thêm dòng này

const firebaseConfig = {
  apiKey: "AIzaSyA2loKzMaJa8mr6ian2g_QFPDqK9T6NZ3I",
  authDomain: "web-tlsv.firebaseapp.com",
  projectId: "web-tlsv",
  storageBucket: "web-tlsv.firebasestorage.app",
  messagingSenderId: "808854630872",
  appId: "1:808854630872:web:cf67babb0d6a99c41682ad",
  measurementId: "G-K2333GGMTE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 2. Khởi tạo và Export Auth + Provider để các file khác dùng được
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
