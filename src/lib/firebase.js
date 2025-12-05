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
// const analytics = getAnalytics(app); // Có thể bỏ comment nếu cần dùng analytics

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// --- ĐÃ SỬA: XÓA CÁC DÒNG addScope GÂY LỖI ---
// Bạn chỉ cần dòng này nếu muốn ép buộc tài khoản Google (tùy chọn)
// googleProvider.setCustomParameters({ prompt: 'select_account' });

// Tuyệt đối KHÔNG thêm addScope('...spreadsheets...') hay addScope('...drive...')
// trừ khi bạn định viết code gọi trực tiếp Google API từ phía client (điều mà code hiện tại của bạn không làm).
// ----------------------------------------------

export default app;
