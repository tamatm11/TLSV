/** @format */

import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Loader2,
  LogOut,
  Coffee,
  Clock,
  Calendar,
  Sparkles,
  Globe,
  GraduationCap,
  FolderOpen,
  Code2,
  TrendingUp,
  LaptopMinimal,
  Component,
  BadgeJapaneseYen,
  FolderKanban,
  Lock,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

// --- CẤU HÌNH ---
// HÃY DÁN LINK DEPLOY MỚI NHẤT CỦA BẠN VÀO ĐÂY
const GAS_API_URL =
  "https://script.google.com/macros/s/AKfycbxBOz4WC8yoHvySaVL041ycxT_W6JbIcsCGWGdUZIRhg0ccVkSi_xKGK1fBqhQnsQxg/exec";

// --- DATA MÔN HỌC (ĐẦY ĐỦ) ---
const SUBJECTS = [
  {
    id: "trial",
    name: "Khóa Trải Nghiệm Web",
    keywords: ["TRẢI NGHIỆM WEB", "free", "trải nghiệm", "web"],
    icon: Coffee,
    color: "text-cyan-600 dark:text-cyan-500",
    bg: "from-cyan-500/10 to-sky-500/10",
    border: "group-hover:border-cyan-500/50",
  },
  {
    id: "2k8thpt",
    name: "ĐGNL & ĐGTD 2K8 THPT",
    keywords: ["đgnl", "đgtd", "năng lực", "tư duy"],
    icon: Sparkles,
    color: "text-purple-600 dark:text-purple-500",
    bg: "from-purple-500/10 to-pink-500/10",
    border: "group-hover:border-purple-500/50",
  },
  {
    id: "daicuong",
    name: "Đại Cương ĐH",
    keywords: ["đại cương", "cao cấp", "giải tích"],
    icon: GraduationCap,
    color: "text-indigo-600 dark:text-indigo-500",
    bg: "from-indigo-500/10 to-violet-500/10",
    border: "group-hover:border-indigo-500/50",
  },
  {
    id: "english_ielts",
    name: "Tiếng Anh (IELTS)",
    keywords: ["ielts"],
    icon: Globe,
    color: "text-cyan-700 dark:text-cyan-500",
    bg: "from-cyan-500/10 to-sky-500/10",
    border: "group-hover:border-cyan-500/50",
  },
  {
    id: "english_toeic",
    name: "Tiếng Anh (TOEIC)",
    keywords: ["toeic"],
    icon: Globe,
    color: "text-sky-600 dark:text-sky-500",
    bg: "from-sky-500/10 to-blue-500/10",
    border: "group-hover:border-sky-500/50",
  },
  {
    id: "english_basic",
    name: "Lấy gốc tiếng Anh",
    keywords: ["anh", "ielts", "toeic", "english"],
    icon: FolderKanban,
    color: "text-blue-600 dark:text-blue-500",
    bg: "from-blue-500/10 to-indigo-500/10",
    border: "group-hover:border-blue-500/50",
  },
  {
    id: "chinese",
    name: "Tiếng Trung",
    keywords: ["tiếng trung", "trung"],
    icon: Globe,
    color: "text-rose-600 dark:text-rose-500",
    bg: "from-rose-500/10 to-pink-500/10",
    border: "group-hover:border-rose-500/50",
  },
  {
    id: "korean",
    name: "Tiếng Hàn",
    keywords: ["tiếng hàn", "hàn"],
    icon: Globe,
    color: "text-blue-500 dark:text-blue-400",
    bg: "from-blue-500/10 to-indigo-500/10",
    border: "group-hover:border-blue-500/50",
  },
  {
    id: "japanese",
    name: "Tiếng Nhật",
    keywords: ["tiếng nhật", "nhật"],
    icon: BadgeJapaneseYen,
    color: "text-red-600 dark:text-red-500",
    bg: "from-red-500/10 to-orange-500/10",
    border: "group-hover:border-red-500/50",
  },
  {
    id: "design",
    name: "Thiết Kế",
    keywords: ["thiết kế", "geography"],
    icon: Component,
    color: "text-teal-600 dark:text-teal-500",
    bg: "from-teal-500/10 to-green-500/10",
    border: "group-hover:border-teal-500/50",
  },
  {
    id: "finance",
    name: "Đầu Tư & Kỹ Năng",
    keywords: ["chứng khoán", "đầu tư", "kỹ năng", "finance"],
    icon: TrendingUp,
    color: "text-amber-600 dark:text-amber-400",
    bg: "from-amber-500/10 to-yellow-500/10",
    border: "group-hover:border-amber-500/50",
  },
  {
    id: "it",
    name: "CNTT & Lập Trình",
    keywords: ["cntt", "lập trình", "it", "code"],
    icon: Code2,
    color: "text-lime-600 dark:text-lime-400",
    bg: "from-lime-500/10 to-green-500/10",
    border: "group-hover:border-lime-500/50",
  },
  {
    id: "office",
    name: "TIN HỌC VĂN PHÒNG",
    keywords: ["tin học", "office", "word", "excel", "powerpoint"],
    icon: LaptopMinimal,
    color: "text-blue-700 dark:text-blue-600",
    bg: "from-blue-600/10 to-cyan-500/10",
    border: "group-hover:border-blue-600/50",
  },
];

const extractSheetId = (url) => {
  if (!url) return null;
  const match = url.match(/\/d\/(.*?)(\/|$)/);
  return match ? match[1] : null;
};

// --- COMPONENTS ---

const ClockHeader = memo(() => {
  const [dateTime, setDateTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="hidden lg:flex items-center gap-3 bg-white/50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/50 rounded-full px-5 py-2 backdrop-blur-sm shadow-sm dark:shadow-none transition-colors duration-300">
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
        <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        <span>{dateTime.toLocaleDateString("vi-VN")}</span>
      </div>
      <div className="w-px h-4 bg-gray-300 dark:bg-gray-700"></div>
      <div className="flex items-center gap-2 text-base font-mono font-bold text-cyan-600 dark:text-cyan-400">
        <Clock className="w-4 h-4" />
        <span>{dateTime.toLocaleTimeString("vi-VN", { hour12: false })}</span>
      </div>
    </div>
  );
});

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-10 h-10 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-yellow-400 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-none backdrop-blur-sm">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}>
          {theme === "dark" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5 text-amber-500" />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
};

const LoginScreen = ({ onLogin, theme, toggleTheme }) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onLogin({
        name: result.user.displayName,
        handle: result.user.email,
        avatar: result.user.photoURL,
        verified: true,
      });
    } catch (e) {
      alert("Lỗi đăng nhập: " + e.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0f] p-4 relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-5 right-5 z-50">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      <div className="relative z-10 w-full max-w-md bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-cyan-500/30 rounded-3xl p-10 text-center shadow-2xl dark:shadow-[0_0_60px_-15px_rgba(6,182,212,0.3)] backdrop-blur-xl transition-all">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-cyan-100 to-purple-100 dark:from-cyan-500/20 dark:to-purple-500/20 rounded-3xl flex items-center justify-center mb-8 border border-cyan-200 dark:border-cyan-500/30">
          <ShieldCheck className="w-10 h-10 text-cyan-600 dark:text-cyan-400" />
        </div>
        <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
          Trạm Sinh Viên
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-10 text-base">
          Nguồn tài nguyên học tập chất lượng cao. Đăng nhập để bắt đầu.
        </p>
        <Button
          onClick={handleLogin}
          className="w-full h-14 bg-gray-900 hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-gray-200 font-bold rounded-2xl text-lg transition-all hover:scale-[1.02]">
          Tiếp tục với Google
        </Button>
      </div>
    </div>
  );
};

// --- MODAL THÔNG BÁO TỪ CHỐI TRUY CẬP ---
const AccessDeniedModal = ({ isOpen, onClose, reason }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-[#1e2329] rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700 relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <X className="w-6 h-6" />
        </button>

        <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-red-500 dark:text-red-400" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Chưa được cấp quyền
        </h3>

        {reason && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-300 font-mono text-left break-words">
              {reason}
            </p>
          </div>
        )}

        <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm">
          Nếu bạn đã đăng ký, vui lòng liên hệ Admin để kiểm tra lại.
        </p>

        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Đóng
          </Button>
          <Button
            onClick={() => window.open("https://zalo.me/0862370152", "_blank")}
            className="flex-1 bg-blue-600 text-white">
            Liên hệ Admin
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

// --- LOADING MODAL KHI CHECK QUYỀN ---
const CheckingAccessModal = ({ isOpen }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#161b22] px-8 py-6 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-200 dark:border-gray-700">
        <Loader2 className="w-6 h-6 text-cyan-500 animate-spin" />
        <span className="text-gray-700 dark:text-gray-200 font-medium">
          Đang kiểm tra quyền truy cập...
        </span>
      </div>
    </div>
  );
};

const LessonList = ({ course, onBack, theme }) => {
  const sheetId = extractSheetId(course.link);
  const embedUrl = sheetId
    ? `https://docs.google.com/spreadsheets/d/${sheetId}/preview?widget=true&headers=false`
    : null;

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-[#0d1117] transition-colors duration-300">
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 dark:border-gray-800/60 bg-white/90 dark:bg-[#0d1117]/90 backdrop-blur-md sticky top-0 z-10 transition-colors">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 p-2 rounded-full h-10 w-10 md:h-12 md:w-12">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white uppercase line-clamp-1">
              {course.name}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
              <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-500" />
              <span>Chế độ xem trực tiếp</span>
            </div>
          </div>
        </div>
        <Button
          size="sm"
          onClick={() => window.open(course.link, "_blank")}
          className="hidden md:flex bg-green-50 dark:bg-green-600/20 hover:bg-green-100 dark:hover:bg-green-600/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-600/30 gap-2 rounded-xl font-semibold transition-colors">
          <ExternalLink className="w-4 h-4 md:w-5 md:h-5" /> Sheet Gốc
        </Button>
      </div>

      <div className="flex-1 w-full h-full relative bg-white dark:bg-[#0d1117] overflow-hidden">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title="Google Sheet Content"
            className={`absolute inset-0 w-full h-full border-none transition-all duration-300 ${
              theme === "dark"
                ? "filter invert hue-rotate-180 brightness-90 contrast-95"
                : ""
            }`}
            allow="autoplay"
            loading="lazy"></iframe>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
            <LogOut className="w-12 h-12 opacity-20 text-red-400" />
            <p className="text-gray-500 dark:text-gray-400">
              Link Google Sheet không hợp lệ hoặc chưa được cập nhật.
            </p>
            <Button
              variant="outline"
              onClick={onBack}
              className="border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              Quay lại
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const CourseList = ({ subject, onBack, onCourseClick }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const load = async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const searchKeyword = subject.keywords[0];
        const url = `${GAS_API_URL}?action=getCourses&category=${encodeURIComponent(
          searchKeyword
        )}`;

        const res = await fetch(url, { signal });
        const json = await res.json();

        if (json.status === "success") {
          setCourses(json.data);
          if (json.data.length === 0) {
            setErrorMsg(
              `Đã tìm thấy combo "${searchKeyword}" nhưng chưa có khóa học nào.`
            );
          }
        } else {
          setErrorMsg(json.message || "Lỗi tải dữ liệu từ Server.");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Fetch Error:", err);
          setErrorMsg("Không thể kết nối đến máy chủ.");
        }
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };

    if (subject) load();
    return () => controller.abort();
  }, [subject]);

  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="flex items-center gap-5 mb-4 pb-5 border-b border-gray-200 dark:border-gray-800/60 p-6 sticky top-0 bg-white/90 dark:bg-[#0d1117]/90 backdrop-blur-md z-10 transition-colors duration-300">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 p-2 rounded-full h-12 w-12">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div
          className={`p-3 rounded-2xl bg-gray-100 dark:bg-gray-800/50 ${subject.color}`}>
          <subject.icon className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          {subject.name}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-80 gap-4">
            <Loader2 className="w-10 h-10 text-cyan-600 dark:text-cyan-500 animate-spin" />
            <p className="text-gray-500 text-base">
              Đang tải danh sách khóa học...
            </p>
          </div>
        ) : errorMsg ? (
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
              <LogOut className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              {errorMsg}
            </p>
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => onCourseClick(c)}
                className="group bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-800 hover:border-cyan-500/40 rounded-2xl p-6 cursor-pointer hover:shadow-[0_8px_30px_-10px_rgba(6,182,212,0.2)] transition-all hover:-translate-y-1.5 flex flex-col justify-between h-full gap-5 min-h-[180px] shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-500/80 mb-2">
                      {c.category}
                    </p>
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 text-xl leading-snug group-hover:text-cyan-600 dark:group-hover:text-white transition-colors line-clamp-3">
                      {c.name}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center text-gray-500 border border-gray-100 dark:border-gray-700 shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800/50 pt-4 mt-auto">
                  <span className="text-sm text-gray-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 font-medium flex items-center gap-2 transition-colors">
                    <FolderOpen className="w-4 h-4" /> Nhấn để học
                  </span>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-cyan-500 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-gray-500">
            <p className="text-lg text-center max-w-md font-medium text-gray-500 dark:text-gray-400 mb-4">
              Không có khóa học nào trong mục này.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const Dashboard = ({ user, onLogout, theme, toggleTheme }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [showDeniedModal, setShowDeniedModal] = useState(false);
  const [deniedReason, setDeniedReason] = useState("");

  const handleCourseClick = async (course) => {
    setIsChecking(true);
    setDeniedReason("");
    try {
      const userEmail = user?.handle || "";
      // Thêm debug=true để bỏ qua cache khi test (có thể bỏ đi khi chạy thực tế)
      const url = `${GAS_API_URL}?action=checkAccess&url=${encodeURIComponent(
        course.link
      )}&email=${encodeURIComponent(userEmail)}&debug=true`;

      const res = await fetch(url);
      const json = await res.json();

      if (json.hasAccess) {
        setSelectedCourse(course);
      } else {
        setDeniedReason(json.reason || "Bạn chưa được cấp quyền truy cập.");
        setShowDeniedModal(true);
      }
    } catch (error) {
      console.error("Check access error:", error);
      alert("Lỗi kết nối server.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] text-gray-900 dark:text-white flex flex-col font-sans overflow-hidden transition-colors duration-300">
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsIDI1NSwgMjU1LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40 dark:opacity-30 pointer-events-none" />

      {/* HEADER */}
      <header className="h-20 px-6 md:px-8 flex items-center justify-between bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 relative z-50 sticky top-0 transition-colors duration-300">
        <div className="flex items-center gap-5">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
            <img
              src={user.avatar}
              alt="User"
              className="relative w-11 h-11 rounded-full border-2 border-white dark:border-[#161b22] object-cover shadow-sm"
            />
            {user.verified && (
              <div className="absolute -bottom-0.5 -right-0.5 bg-cyan-500 text-white rounded-full p-[3px] border-2 border-white dark:border-[#161b22]">
                <ShieldCheck className="w-3 h-3" />
              </div>
            )}
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-base text-gray-800 dark:text-gray-100 leading-tight">
              {user.name}
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-mono tracking-wide uppercase">
                {user.handle}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <ClockHeader />
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <div className="h-8 w-px bg-gray-200 dark:bg-gray-800 mx-1 hidden sm:block"></div>
          <Button
            onClick={onLogout}
            size="lg"
            variant="ghost"
            className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full h-11 w-11 p-0 md:w-auto md:px-5 md:rounded-xl">
            <LogOut className="w-5 h-5 md:mr-2" />
            <span className="hidden md:inline text-sm font-semibold">
              Thoát
            </span>
          </Button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 relative overflow-hidden flex flex-col p-4 md:p-8 lg:p-10">
        <div className="flex-1 bg-white/60 dark:bg-[#161b22]/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800/60 rounded-[2rem] overflow-hidden flex flex-col relative shadow-xl dark:shadow-2xl ring-1 ring-black/5 dark:ring-white/5 transition-colors duration-300">
          <AnimatePresence mode="wait">
            {selectedCourse ? (
              <motion.div
                key="lesson"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="absolute inset-0 bg-gray-50 dark:bg-[#0d1117] z-20">
                <LessonList
                  theme={theme}
                  course={selectedCourse}
                  onBack={() => setSelectedCourse(null)}
                />
              </motion.div>
            ) : selectedSubject ? (
              <motion.div
                key="course"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="absolute inset-0 bg-gray-50 dark:bg-[#0d1117] z-10 transition-colors duration-300">
                <CourseList
                  subject={selectedSubject}
                  onBack={() => setSelectedSubject(null)}
                  onCourseClick={handleCourseClick}
                />
              </motion.div>
            ) : (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 overflow-y-auto custom-scrollbar p-8 md:p-12">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3 bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
                    Khám Phá Tri Thức
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Chọn một chủ đề bên dưới để bắt đầu hành trình của bạn
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  {SUBJECTS.map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedSubject(sub)}
                      className={`group cursor-pointer bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700/50 ${sub.border} p-8 rounded-3xl flex flex-col items-center gap-6 hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-all hover:-translate-y-2 shadow-lg dark:shadow-xl relative overflow-hidden`}>
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${sub.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      <div
                        className={`relative z-10 p-6 rounded-2xl bg-gray-50 dark:bg-[#0d1117] group-hover:scale-110 transition-transform duration-300 ${sub.color} shadow-inner border border-black/5 dark:border-white/5`}>
                        <sub.icon className="w-12 h-12" />
                      </div>
                      <h3 className="relative z-10 font-bold text-2xl text-center text-gray-800 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors">
                        {sub.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* POPUPs */}
      <AnimatePresence>
        {isChecking && <CheckingAccessModal key="checking" isOpen={true} />}
        {showDeniedModal && (
          <AccessDeniedModal
            key="denied"
            isOpen={true}
            onClose={() => setShowDeniedModal(false)}
            reason={deniedReason}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const CoursesPage = () => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined")
      return localStorage.getItem("theme") || "dark";
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  useEffect(() => {
    const u = localStorage.getItem("tslv_user");
    if (u) setUser(JSON.parse(u));
  }, []);

  return (
    <>
      {!user ? (
        <LoginScreen
          theme={theme}
          toggleTheme={toggleTheme}
          onLogin={(u) => {
            localStorage.setItem("tslv_user", JSON.stringify(u));
            setUser(u);
          }}
        />
      ) : (
        <Dashboard
          user={user}
          theme={theme}
          toggleTheme={toggleTheme}
          onLogout={() => {
            localStorage.removeItem("tslv_user");
            setUser(null);
          }}
        />
      )}
    </>
  );
};

export default CoursesPage;
