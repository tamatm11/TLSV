/** @format */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2loKzMaJa8mr6ian2g_QFPDqK9T6NZ3I",
  authDomain: "web-tlsv.firebaseapp.com",
  projectId: "web-tlsv",
  storageBucket: "web-tlsv.firebasestorage.app",
  messagingSenderId: "808854630872",
  appId: "1:808854630872:web:cf67babb0d6a99c41682ad",
  measurementId: "G-K2333GGMTE",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// --- QUAN TRỌNG: PHẢI CÓ ĐỦ 2 DÒNG NÀY ---
googleProvider.addScope(
  "https://www.googleapis.com/auth/spreadsheets.readonly"
);
googleProvider.addScope("https://www.googleapis.com/auth/drive.readonly");
// ------------------------------------------

export default app;
