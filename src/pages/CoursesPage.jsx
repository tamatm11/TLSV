/** @format */

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import React, { useState, useEffect, memo } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Clock,
  Calendar,
  ShieldCheck,
  Sparkles,
  Globe,
  GraduationCap,
  ArrowLeft,
  ExternalLink,
  Loader2,
  FolderOpen,
  Code2,
  TrendingUp,
  FileText,
  Video,
  LaptopMinimal,
  Component,
  BadgeJapaneseYen,
  FolderKanban,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// --- CẤU HÌNH ---
// !!! DÁN LINK WEB APP SCRIPT CỦA BẠN VÀO ĐÂY !!!
const GAS_API_URL =
  "https://script.google.com/macros/s/AKfycbxiYFhoTEuG90S5lOLeodLrep0UqsgX-jJhzmz4R1zvE2MTwTOfdcFnlY35-9LjAj4K/exec";

const SUBJECTS = [
  {
    id: "2k8thpt",
    name: "ĐGNL & ĐGTD 2K8 THPT",
    keywords: ["đgnl", "đgtd", "năng lực", "tư duy"],
    icon: Sparkles,
    color: "text-purple-500",
    bg: "from-purple-500/10 to-pink-500/10",
    border: "group-hover:border-purple-500/50",
  },
  {
    id: "daicuong",
    name: "Đại Cương ĐH",
    keywords: ["đại cương", "cao cấp", "giải tích"],
    icon: GraduationCap,
    color: "text-indigo-500",
    bg: "from-indigo-500/10 to-violet-500/10",
    border: "group-hover:border-indigo-500/50",
  },
  {
    id: "english_ielts",
    name: "Tiếng Anh (IELTS)",
    keywords: ["ielts"],
    icon: Globe,
    color: "text-cyan-500",
    bg: "from-cyan-500/10 to-sky-500/10",
    border: "group-hover:border-cyan-500/50",
  },
  {
    id: "english_toeic",
    name: "Tiếng Anh (TOEIC)",
    keywords: ["toeic"],
    icon: Globe,
    color: "text-cyan-500",
    bg: "from-cyan-500/10 to-sky-500/10",
    border: "group-hover:border-cyan-500/50",
  },
  {
    id: "english_basic",
    name: "Lấy gốc tiếng Anh",
    keywords: ["anh", "ielts", "toeic", "english"],
    icon: FolderKanban,
    color: "text-cyan-500",
    bg: "from-cyan-500/10 to-sky-500/10",
    border: "group-hover:border-cyan-500/50",
  },
  {
    id: "chinese",
    name: "Tiếng Trung",
    keywords: ["tiếng trung", "trung"],
    icon: Globe,
    color: "text-rose-500",
    bg: "from-rose-500/10 to-pink-500/10",
    border: "group-hover:border-rose-500/50",
  },
  {
    id: "korean",
    name: "Tiếng Hàn",
    keywords: ["tiếng hàn", "hàn"],
    icon: Globe,
    color: "text-blue-400",
    bg: "from-blue-500/10 to-indigo-500/10",
    border: "group-hover:border-blue-500/50",
  },
  {
    id: "japanese",
    name: "Tiếng Nhật",
    keywords: ["tiếng nhật", "nhật"],
    icon: BadgeJapaneseYen,
    color: "text-red-500",
    bg: "from-red-500/10 to-orange-500/10",
    border: "group-hover:border-red-500/50",
  },
  {
    id: "design",
    name: "Thiết Kế",
    keywords: ["thiết kế", "geography"],
    icon: Component,
    color: "text-teal-500",
    bg: "from-teal-500/10 to-green-500/10",
    border: "group-hover:border-teal-500/50",
  },
  {
    id: "finance",
    name: "Đầu Tư & Kỹ Năng",
    keywords: ["chứng khoán", "đầu tư", "kỹ năng", "finance"],
    icon: TrendingUp,
    color: "text-amber-400",
    bg: "from-amber-500/10 to-yellow-500/10",
    border: "group-hover:border-amber-500/50",
  },
  {
    id: "it",
    name: "CNTT & Lập Trình",
    keywords: ["cntt", "lập trình", "it", "code"],
    icon: Code2,
    color: "text-lime-400",
    bg: "from-lime-500/10 to-green-500/10",
    border: "group-hover:border-lime-500/50",
  },
  {
    id: "office",
    name: "TIN HỌC VĂN PHÒNG",
    keywords: ["tin học", "office", "word", "excel", "powerpoint"],
    icon: LaptopMinimal,
    color: "text-blue-600",
    bg: "from-blue-600/10 to-cyan-500/10",
    border: "group-hover:border-blue-600/50",
  },
];

const extractSheetId = (url) => {
  if (!url) return null;
  const idMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return idMatch ? idMatch[1] : null;
};

// --- COMPONENTS ---
const ClockHeader = memo(() => {
  const [dateTime, setDateTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="hidden lg:flex items-center gap-3 bg-gray-800/40 border border-gray-700/50 rounded-full px-5 py-2 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
        <Calendar className="w-4 h-4 text-purple-400" />
        <span>{dateTime.toLocaleDateString("vi-VN")}</span>
      </div>
      <div className="w-px h-4 bg-gray-700"></div>
      <div className="flex items-center gap-2 text-base font-mono font-bold text-cyan-400">
        <Clock className="w-4 h-4" />
        <span>{dateTime.toLocaleTimeString("vi-VN", { hour12: false })}</span>
      </div>
    </div>
  );
});

const LoginScreen = ({ onLogin }) => {
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
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsIDI1NSwgMjU1LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
      <div className="relative z-10 w-full max-w-md bg-gray-900/80 border border-cyan-500/30 rounded-3xl p-10 text-center shadow-[0_0_60px_-15px_rgba(6,182,212,0.3)] backdrop-blur-xl">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center mb-8 border border-cyan-500/30">
          <ShieldCheck className="w-10 h-10 text-cyan-400" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-3">Chào Mừng</h2>
        <p className="text-gray-400 mb-10 text-base">
          Đăng nhập để truy cập kho tài liệu học tập.
        </p>
        <Button
          onClick={handleLogin}
          className="w-full h-14 bg-white text-black hover:bg-gray-200 font-bold rounded-2xl text-lg transition-all hover:scale-[1.02]">
          Tiếp tục với Google
        </Button>
      </div>
    </div>
  );
};

const LessonList = ({ course, onBack }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      const sheetId = extractSheetId(course.link);
      if (!sheetId) {
        setLoading(false);
        setError("Link không hợp lệ");
        return;
      }

      try {
        const res = await fetch(
          `${GAS_API_URL}?action=getLessons&sheetId=${sheetId}`
        );
        const json = await res.json();
        if (json.status === "success") setItems(json.data);
        else throw new Error(json.message || "Lỗi Server");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [course]);

  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="flex items-center justify-between p-6 border-b border-gray-800/60 bg-[#0d1117]/90 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-5">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-gray-400 hover:text-white hover:bg-white/5 p-2 rounded-full h-12 w-12">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-white uppercase line-clamp-1">
              {course.name}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>Dữ liệu được đồng bộ từ Sheet</span>
            </div>
          </div>
        </div>
        <Button
          size="lg"
          onClick={() => window.open(course.link, "_blank")}
          className="hidden md:flex bg-green-600/10 hover:bg-green-600/20 text-green-400 border border-green-600/20 gap-2 rounded-xl font-semibold">
          <ExternalLink className="w-5 h-5" /> Sheet Gốc
        </Button>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar p-6 md:p-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-80 gap-4">
            <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
            <p className="text-gray-500 text-lg font-medium animate-pulse">
              Đang tải dữ liệu...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="inline-flex p-4 rounded-full bg-red-500/10 mb-4">
              <LogOut className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-red-400 font-medium text-lg">{error}</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <FolderOpen className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg">Không tìm thấy bài học nào.</p>
            <Button
              variant="link"
              onClick={() => window.open(course.link, "_blank")}
              className="text-cyan-400 mt-2 text-base">
              Kiểm tra Sheet gốc
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {items.map((item, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02 }}
                key={idx}
                className="group flex items-center justify-between bg-[#161b22] border border-gray-800/60 p-5 rounded-2xl hover:border-cyan-500/30 hover:bg-gray-800/60 transition-all shadow-sm hover:shadow-md">
                <div className="flex items-center gap-5 overflow-hidden">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      item.type === "doc"
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-red-500/10 text-red-400"
                    }`}>
                    {item.type === "doc" ? (
                      <FileText className="w-6 h-6" />
                    ) : (
                      <Video className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1 overflow-hidden">
                    <span className="font-bold text-gray-200 truncate text-base md:text-lg group-hover:text-white transition-colors">
                      {item.name || `Bài học ${idx + 1}`}
                    </span>
                    <span className="text-sm text-gray-500 group-hover:text-gray-400">
                      {item.type === "doc" ? "Tài liệu đọc" : "Video bài giảng"}
                    </span>
                  </div>
                </div>
                <Button
                  size="lg"
                  onClick={() => window.open(item.link, "_blank")}
                  className="shrink-0 ml-4 bg-gray-800 hover:bg-cyan-600 hover:text-white border border-gray-700 text-gray-300 rounded-xl font-semibold transition-all px-6">
                  Mở
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CourseList = ({ subject, onBack, onSelectCourse }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${GAS_API_URL}?action=getCourses`);
        const json = await res.json();
        if (json.status === "success") {
          const filtered = json.data.filter((c) =>
            subject.keywords.some((k) =>
              c.category.toLowerCase().includes(k.toLowerCase())
            )
          );
          setCourses(filtered);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [subject]);

  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="flex items-center gap-5 mb-4 pb-5 border-b border-gray-800/60 p-6 sticky top-0 bg-[#0d1117]/90 backdrop-blur-md z-10">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-gray-400 hover:text-white hover:bg-white/5 p-2 rounded-full h-12 w-12">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div
          className={`p-3 rounded-2xl bg-gray-800/50 ${subject.color} border border-white/5 shadow-inner`}>
          <subject.icon className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight">
          {subject.name}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-80 gap-4">
            <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
            <p className="text-gray-500 text-base">Đang tải khóa học...</p>
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => onSelectCourse(c)}
                className="group bg-[#161b22] border border-gray-800 hover:border-cyan-500/40 rounded-2xl p-6 cursor-pointer hover:shadow-[0_8px_30px_-10px_rgba(6,182,212,0.2)] transition-all hover:-translate-y-1.5 flex flex-col justify-between h-full gap-5 min-h-[180px]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-cyan-500/80 mb-2">
                      {c.category}
                    </p>
                    <h3 className="font-bold text-gray-100 text-xl leading-snug group-hover:text-white transition-colors line-clamp-3">
                      {c.name}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gray-800/50 flex items-center justify-center text-gray-500 text-sm font-mono border border-gray-700 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-colors shrink-0">
                    {i + 1}
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-gray-800/50 pt-4 mt-auto">
                  <span className="text-sm text-gray-500 group-hover:text-gray-400 flex items-center gap-2">
                    <FolderOpen className="w-4 h-4" /> Tài nguyên
                  </span>
                  <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-cyan-400 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // --- ĐÃ SỬA THÔNG BÁO LỖI TẠI ĐÂY ---
          <div className="flex flex-col items-center justify-center py-24 text-gray-500">
            <Lock className="w-16 h-16 mb-4 opacity-20 text-yellow-500" />
            <p className="text-lg text-center max-w-md font-medium text-gray-400 mb-4">
              Bạn chưa đăng ký khóa, vui lòng liên hệ Admin để đăng ký khóa học
            </p>
            <Button
              variant="outline"
              className="border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-xl gap-2"
              onClick={() =>
                window.open("https://zalo.me/0862370152", "_blank")
              }>
              Liên hệ Admin
            </Button>
          </div>
          // ------------------------------------
        )}
      </div>
    </div>
  );
};

const Dashboard = ({ user, onLogout }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col font-sans overflow-hidden">
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsIDI1NSwgMjU1LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none" />

      {/* HEADER MỚI CHỈNH CHU & TO HƠN */}
      <header className="h-20 px-6 md:px-8 flex items-center justify-between bg-[#161b22]/80 backdrop-blur-md border-b border-gray-800 relative z-50 sticky top-0">
        {/* LEFT: LOGO & USER */}
        <div className="flex items-center gap-5">
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
            <img
              src={user.avatar}
              alt="User"
              className="relative w-11 h-11 rounded-full border-2 border-[#161b22] object-cover"
            />
            {user.verified && (
              <div className="absolute -bottom-0.5 -right-0.5 bg-cyan-500 text-white rounded-full p-[3px] border-2 border-[#161b22]">
                <ShieldCheck className="w-3 h-3" />
              </div>
            )}
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-base text-gray-100 leading-tight">
              {user.name}
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-gray-400 font-mono tracking-wide uppercase">
                {user.handle}
              </span>
            </div>
          </div>
        </div>

        {/* CENTER: QUOTE */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center">
          <div className="px-8 py-2 rounded-full bg-gray-900/50 border border-gray-700/50 flex flex-col items-center justify-center backdrop-blur-sm shadow-sm hover:border-cyan-500/30 transition-colors cursor-default">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
              <span className="text-sm font-bold bg-gradient-to-r from-cyan-200 via-white to-purple-200 bg-clip-text text-transparent">
                Chúc bạn có buổi học tập thật năng suất! 🌙
              </span>
            </div>
            <p className="text-xs text-gray-400 italic tracking-wider">
              "Bạn chỉ thất bại khi đã từ bỏ mọi nỗ lực !!!"
            </p>
          </div>
        </div>

        {/* RIGHT: TOOLS */}
        <div className="flex items-center gap-4">
          <ClockHeader />
          <div className="h-8 w-px bg-gray-800 mx-1 hidden sm:block"></div>
          <Button
            onClick={onLogout}
            size="lg"
            variant="ghost"
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-full h-11 w-11 p-0 md:w-auto md:px-5 md:rounded-xl">
            <LogOut className="w-5 h-5 md:mr-2" />
            <span className="hidden md:inline text-sm font-semibold">
              Thoát
            </span>
          </Button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 relative overflow-hidden flex flex-col p-4 md:p-8 lg:p-10">
        <div className="flex-1 bg-[#161b22]/60 backdrop-blur-xl border border-gray-800/60 rounded-[2rem] overflow-hidden flex flex-col relative shadow-2xl ring-1 ring-white/5">
          <AnimatePresence mode="wait">
            {selectedCourse ? (
              <motion.div
                key="lesson"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="absolute inset-0 bg-[#0d1117] z-20">
                <LessonList
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
                className="absolute inset-0 bg-[#0d1117] z-10">
                <CourseList
                  subject={selectedSubject}
                  onBack={() => setSelectedSubject(null)}
                  onSelectCourse={setSelectedCourse}
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
                  <h2 className="text-4xl font-extrabold text-white mb-3 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Khám Phá Tri Thức
                  </h2>
                  <p className="text-gray-400 text-lg">
                    Chọn một chủ đề bên dưới để bắt đầu hành trình của bạn
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  {SUBJECTS.map((sub) => (
                    <div
                      key={sub.id}
                      onClick={() => setSelectedSubject(sub)}
                      className={`group cursor-pointer bg-[#161b22] border border-gray-700/50 hover:border-${
                        sub.color.split("-")[1]
                      }-500/50 p-8 rounded-3xl flex flex-col items-center gap-6 hover:bg-gray-800/80 transition-all hover:-translate-y-2 shadow-xl relative overflow-hidden`}>
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${sub.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      <div
                        className={`relative z-10 p-6 rounded-2xl bg-[#0d1117] group-hover:scale-110 transition-transform duration-300 ${sub.color} shadow-inner border border-white/5`}>
                        <sub.icon className="w-12 h-12" />
                      </div>
                      <h3 className="relative z-10 font-bold text-2xl text-center text-gray-200 group-hover:text-white transition-colors">
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
    </div>
  );
};

const CoursesPage = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const u = localStorage.getItem("tslv_user");
    if (u) setUser(JSON.parse(u));
  }, []);
  return (
    <>
      {!user ? (
        <LoginScreen
          onLogin={(u) => {
            localStorage.setItem("tslv_user", JSON.stringify(u));
            setUser(u);
          }}
        />
      ) : (
        <Dashboard
          user={user}
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
