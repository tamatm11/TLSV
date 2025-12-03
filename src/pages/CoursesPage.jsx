/** @format */

import { signInWithPopup } from "firebase/auth";
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
  Award,
  GraduationCap,
  Briefcase,
  Languages,
  BookOpenCheck,
  ArrowLeft,
  ExternalLink,
  Loader2,
  PlayCircle,
  FolderOpen,
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  History,
  Map,
  Code2,
  TrendingUp,
  FileText,
  Video,
  Play,
  LaptopMinimal,
  Component,
  BadgeJapaneseYen,
  FolderKanban, // Import thêm icon mới
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// --- CẤU HÌNH ---
const SHEET_ID = "1OrSkxufnQxoxBE4Ky9FJcovGpve4wJpOJzI-kJoCjCA";
const SHEET_GID = "0";

const SUBJECTS = [
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
    color: "text-cyan-500",
    bg: "from-cyan-500/10 to-sky-500/10",
    border: "group-hover:border-cyan-500/50",
  },
  {
    id: "korean",
    name: "Tiếng Hàn",
    keywords: ["tiếng hàn", "hàn"],
    icon: Globe,
    color: "text-cyan-500",
    bg: "from-cyan-500/10 to-sky-500/10",
    border: "group-hover:border-cyan-500/50",
  },
  {
    id: "japanese",
    name: "Tiếng Nhật",
    keywords: ["tiếng nhật", "nhật"],
    icon: BadgeJapaneseYen,
    color: "text-yellow-500",
    bg: "from-yellow-500/10 to-orange-500/10",
    border: "group-hover:border-yellow-500/50",
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
    color: "text-amber-400",
    bg: "from-amber-500/10 to-yellow-500/10",
    border: "group-hover:border-amber-500/50",
  },
  {
    id: "2k8thpt",
    name: "ĐGNL & ĐGTD 2K8 THPT",
    keywords: ["đgnl", "đgtd", "năng lực", "tư duy"],
    icon: Sparkles,
    color: "text-rose-500",
    bg: "from-rose-500/10 to-pink-500/10",
    border: "group-hover:border-rose-500/50",
  },
];

const ClockHeader = memo(() => {
  const [dateTime, setDateTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-right hidden sm:block min-w-[180px]">
      <div className="text-xs text-gray-400 flex items-center justify-end gap-1">
        <Calendar className="w-3 h-3" /> {dateTime.toLocaleDateString("vi-VN")}
      </div>
      <div className="text-xl font-mono font-bold text-cyan-400 flex items-center justify-end gap-2">
        <Clock className="w-4 h-4" />{" "}
        {dateTime.toLocaleTimeString("vi-VN", { hour12: false })}
      </div>
    </div>
  );
});

const LoginScreen = ({ onLogin }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onLogin({
        name: result.user.displayName,
        handle: result.user.email,
        avatar: result.user.photoURL,
        verified: true,
      });
    } catch (e) {
      alert("Đăng nhập thất bại: " + e.message);
    } finally {
      setIsLoggingIn(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsIDI1NSwgMjU1LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
      <div className="relative z-10 w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 text-center shadow-[0_0_50px_rgba(0,255,255,0.1)]">
        <div className="inline-flex p-4 bg-cyan-500/10 rounded-full mb-4 border border-cyan-500/30">
          <ShieldCheck className="w-12 h-12 text-cyan-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Đăng nhập</h2>
        <p className="text-gray-400 mb-8">
          Vui lòng đăng nhập để truy cập kho tài liệu
        </p>
        <Button
          onClick={handleGoogleLogin}
          disabled={isLoggingIn}
          className="w-full h-12 bg-white text-black hover:bg-gray-200 font-bold rounded-xl flex items-center justify-center gap-2 transition-all">
          {isLoggingIn ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Tiếp tục với Google"
          )}
        </Button>
        <Link
          to="/"
          className="block mt-6 text-cyan-500 hover:underline text-sm">
          ← Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
};

// --- CẤP 3: CHI TIẾT BÀI HỌC (Lesson List) ---
const LessonList = ({ course, onBack }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const extractSheetInfo = (url) => {
    const idMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    const gidMatch = url.match(/[#&]gid=([0-9]+)/);
    return {
      id: idMatch ? idMatch[1] : null,
      gid: gidMatch ? gidMatch[1] : "0",
    };
  };

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const { id, gid } = extractSheetInfo(course.link);
        if (!id) throw new Error("Link không hợp lệ");

        const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&gid=${gid}`;
        const res = await fetch(url);
        const txt = await res.text();
        const json = JSON.parse(txt.substr(47).slice(0, -2));

        const lessonData = json.table.rows
          .slice(1)
          .map((row) => ({
            name: row.c[0]?.v || "Bài học không tên",
            video: row.c[1]?.v || null,
            doc: row.c[2]?.v || null,
          }))
          .filter((l) => l.name);

        setLessons(lessonData);
      } catch (err) {
        console.error(err);
        toast({
          title: "Không thể tải bài học",
          description:
            "Link sheet con có thể bị sai hoặc chưa cấp quyền truy cập.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (course.link && course.link.includes("docs.google.com")) {
      fetchLessons();
    } else {
      setLoading(false);
    }
  }, [course, toast]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-800">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-gray-400 hover:text-white hover:bg-white/10 p-2 h-auto rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-white leading-tight">
            {course.name}
          </h2>
          <p className="text-cyan-400 text-sm mt-1">
            Danh sách bài giảng & tài liệu
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
            <p className="text-gray-400">Đang tải danh sách bài học...</p>
          </div>
        ) : lessons.length > 0 ? (
          <div className="space-y-3">
            {lessons.map((lesson, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-cyan-500 hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 min-w-[24px]">
                      <PlayCircle className="w-6 h-6 text-cyan-600" />
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg">
                      {lesson.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {lesson.video && (
                      <Button
                        size="sm"
                        className="bg-red-500 hover:bg-red-600 text-white gap-2"
                        onClick={() => window.open(lesson.video, "_blank")}>
                        <Video className="w-4 h-4" /> Xem Video
                      </Button>
                    )}
                    {lesson.doc && (
                      <Button
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 text-white gap-2"
                        onClick={() => window.open(lesson.doc, "_blank")}>
                        <FileText className="w-4 h-4" /> Tài Liệu
                      </Button>
                    )}
                    {!lesson.video && !lesson.doc && (
                      <span className="text-gray-400 text-sm italic px-2">
                        Đang cập nhật...
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10 text-gray-400">
            <FolderOpen className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg">Không tìm thấy bài học nào.</p>
            {course.link && !course.link.includes("docs.google.com") && (
              <Button
                variant="link"
                className="text-cyan-400 mt-2"
                onClick={() => window.open(course.link, "_blank")}>
                Mở liên kết gốc <ExternalLink className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// --- CẤP 2: DANH SÁCH KHÓA HỌC (Course List) ---
const CourseList = ({ subject, onBack, onSelectCourse }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${SHEET_GID}`;
        const res = await fetch(url);
        const txt = await res.text();
        const json = JSON.parse(txt.substr(47).slice(0, -2));

        const rows = json.table.rows;
        const processedCourses = [];
        let currentCategory = "";

        rows.forEach((row) => {
          const cellA = row.c[0]?.v;
          if (cellA) currentCategory = cellA.toString();
          const cellB = row.c[1]?.v;
          const cellC = row.c[2]?.v;

          if (cellB && currentCategory) {
            const isMatch = subject.keywords.some((keyword) =>
              currentCategory.toLowerCase().includes(keyword.toLowerCase())
            );
            if (isMatch) {
              processedCourses.push({
                name: cellB,
                link: cellC || "#",
                category: currentCategory,
              });
            }
          }
        });
        setCourses(processedCourses);
      } catch (err) {
        toast({
          title: "Lỗi kết nối",
          description: "Không thể tải danh sách khóa học.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [subject, toast]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-800">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-gray-400 hover:text-white hover:bg-white/10 p-2 h-auto rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className={`p-3 rounded-xl bg-gray-800 ${subject.color}`}>
          <subject.icon className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">{subject.name}</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
            <p className="text-gray-400">Đang tải...</p>
          </div>
        ) : courses.length > 0 ? (
          <div className="space-y-3">
            {courses.map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => onSelectCourse(course)}
                className="group cursor-pointer bg-white hover:bg-cyan-50 rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
                    <FolderOpen className="w-6 h-6 text-gray-500 group-hover:text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg group-hover:text-cyan-700 transition-colors line-clamp-1">
                      {course.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                      {course.category}
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-cyan-500" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            Chưa có dữ liệu cho môn này.
          </div>
        )}
      </div>
    </div>
  );
};

// --- CẤP 1: DASHBOARD ---
const Dashboard = ({ user, onLogout }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col font-sans">
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsIDI1NSwgMjU1LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none" />
      <header className="bg-[#161b22]/90 backdrop-blur-md border-b border-gray-800 p-4 sticky top-0 z-50 shadow-md flex justify-between items-center">
        {/* --- USER PROFILE ĐÃ ĐƯỢC NÂNG CẤP --- */}
        <div className="flex items-center w-full md:w-1/3">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 bg-gray-800/40 backdrop-blur-md border border-white/10 rounded-full pl-2 pr-6 py-2 hover:border-cyan-500/30 hover:bg-gray-800/60 transition-all duration-300 group cursor-pointer shadow-sm">
            {/* Avatar có vòng sáng */}
            <div className="relative">
              {/* Glow Effect phía sau avatar */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full blur-sm opacity-40 group-hover:opacity-80 transition duration-500"></div>

              <img
                src={user.avatar}
                alt="Avt"
                className="relative w-11 h-11 rounded-full object-cover border-2 border-[#161b22] group-hover:scale-105 transition-transform duration-300"
              />

              {/* Tích xanh verified */}
              {user.verified && (
                <div className="absolute -bottom-0.5 -right-0.5 bg-blue-500 text-white rounded-full p-[2px] border-2 border-[#161b22] z-10">
                  <ShieldCheck className="w-2.5 h-2.5" />
                </div>
              )}
            </div>

            {/* Thông tin Text */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-gray-100 group-hover:text-cyan-400 transition-colors">
                  {user.name}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] font-mono font-medium text-gray-400 bg-black/20 px-2 py-0.5 rounded-md border border-white/5 group-hover:border-cyan-500/20 group-hover:text-cyan-200/80 transition-colors">
                  {user.handle}
                </span>
                {/* Chấm xanh Online */}
                <div className="flex items-center gap-1" title="Đang hoạt động">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        {/* ------------------------------------- */}

        {/* --- PHẦN ĐÃ ĐƯỢC NÂNG CẤP HIỆU ỨNG --- */}
        <div className="hidden lg:flex flex-col items-center justify-center w-1/3">
          {/* Container với hiệu ứng kính và viền sáng nhẹ */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative bg-gray-900/40 backdrop-blur-md border border-cyan-500/20 rounded-full px-8 py-3 shadow-[0_0_15px_rgba(0,255,255,0.05)] hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] hover:border-cyan-500/40 transition-all duration-300 group">
            {/* Hiệu ứng Glow nền phía sau mờ ảo */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

            {/* Dòng tiêu đề với chữ Gradient */}
            <div className="flex items-center justify-center gap-2 text-sm font-bold mb-1">
              {/* Icon xoay nhẹ */}
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}>
                <Sparkles className="w-4 h-4 text-cyan-300" />
              </motion.div>

              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                Chúc bạn có buổi học tập thật năng suất! 🌙
              </span>
            </div>

            {/* Dòng quote bên dưới */}
            <p className="text-xs text-center text-gray-400 italic tracking-wider drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] group-hover:text-gray-300 transition-colors">
              "Bạn chỉ thất bại khi đã từ bỏ mọi nỗ lực !!!"
            </p>
          </motion.div>
        </div>
        {/* --------------------------------- */}

        <div className="flex gap-4 items-center">
          <ClockHeader />
          <Button onClick={onLogout} variant="destructive" size="sm">
            <LogOut className="w-4 h-4 mr-2" /> Thoát
          </Button>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 relative z-10 container mx-auto">
        <div className="bg-[#161b22]/80 backdrop-blur-md border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl h-[calc(100vh-140px)] flex flex-col">
          <AnimatePresence mode="wait">
            {selectedCourse ? (
              <motion.div
                key="lesson"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="h-full">
                <LessonList
                  course={selectedCourse}
                  onBack={() => setSelectedCourse(null)}
                />
              </motion.div>
            ) : selectedSubject ? (
              <motion.div
                key="course"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="h-full">
                <CourseList
                  subject={selectedSubject}
                  onBack={() => setSelectedSubject(null)}
                  onSelectCourse={setSelectedCourse}
                />
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-full overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                  {SUBJECTS.map((sub, i) => (
                    <motion.button
                      key={sub.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedSubject(sub)}
                      className={`group relative bg-gray-800/40 border border-gray-700/50 rounded-2xl p-8 flex flex-col items-center justify-center gap-6 hover:shadow-xl transition-all min-h-[220px] ${sub.border}`}>
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${sub.bg} opacity-0 group-hover:opacity-100 transition-opacity`}
                      />
                      <div
                        className={`relative z-10 p-5 rounded-2xl bg-[#0d1117] group-hover:bg-gray-800 ${sub.color}`}>
                        <sub.icon className="w-12 h-12" />
                      </div>
                      <h3
                        className={`relative z-10 text-2xl font-bold group-hover:text-white ${sub.color}`}>
                        {sub.name}
                      </h3>
                    </motion.button>
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
  const { toast } = useToast();
  useEffect(() => {
    const u = localStorage.getItem("tslv_user");
    if (u) setUser(JSON.parse(u));
  }, []);
  return (
    <>
      <Helmet>
        <title>Hệ Thống Học Tập | Trạm Sinh Viên</title>
      </Helmet>
      <AnimatePresence mode="wait">
        {!user ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <LoginScreen
              onLogin={(u) => {
                localStorage.setItem("tslv_user", JSON.stringify(u));
                setUser(u);
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <Dashboard
              user={user}
              onLogout={() => {
                localStorage.removeItem("tslv_user");
                setUser(null);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default CoursesPage;
