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
import { useToast } from "@/components/ui/use-toast";

// --- CẤU HÌNH ---
const MASTER_SHEET_ID = "1OrSkxufnQxoxBE4Ky9FJcovGpve4wJpOJzI-kJoCjCA";
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

// --- DANH SÁCH MÔN HỌC ---
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
  {
    id: "2k8thpt",
    name: "ĐGNL & ĐGTD 2K8 THPT",
    keywords: ["đgnl", "đgtd", "năng lực", "tư duy"],
    icon: Sparkles,
    color: "text-purple-500",
    bg: "from-purple-500/10 to-pink-500/10",
    border: "group-hover:border-purple-500/50",
  },
];

// --- UTILS ---
const extractSheetInfo = (url) => {
  if (!url) return { id: null };
  const idMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return { id: idMatch ? idMatch[1] : null };
};

const getCellValue = (cell) => {
  if (!cell) return "";
  if (cell.hyperlink) return cell.hyperlink;
  return cell.formattedValue || "";
};

const isLink = (text) => {
  if (!text) return false;
  const s = text.toString().toLowerCase();
  return (
    s.startsWith("http") || s.includes("drive.google") || s.includes("youtube")
  );
};

// --- COMPONENTS ---
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
      // 1. Ép buộc hỏi quyền để lấy Refresh Token mới (FIX LỖI 403)
      googleProvider.setCustomParameters({
        prompt: "select_account consent",
      });

      // 2. Thêm lại scope Drive Readonly để chắc chắn
      googleProvider.addScope(
        "https://www.googleapis.com/auth/spreadsheets.readonly"
      );
      googleProvider.addScope("https://www.googleapis.com/auth/drive.readonly");

      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      if (token) {
        localStorage.setItem("google_access_token", token);
      } else {
        throw new Error("Không lấy được Access Token.");
      }

      onLogin({
        name: result.user.displayName,
        handle: result.user.email,
        avatar: result.user.photoURL,
        verified: true,
      });
    } catch (e) {
      alert("Đăng nhập thất bại: " + e.message);
      console.error("Login Error:", e);
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
          Đăng nhập bằng Gmail để xác thực quyền truy cập.
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

// --- CẤP 3: CHI TIẾT BÀI HỌC (SHEET CON - PRIVATE) ---
const LessonList = ({ course, onBack }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const getLinkFromCell = (cell) => {
    if (!cell) return null;
    if (cell.hyperlink) return cell.hyperlink;
    const val = cell.formattedValue || "";
    if (val.startsWith("http")) return val;
    return null;
  };

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      setErrorMsg("");

      const token = localStorage.getItem("google_access_token");
      if (!token) {
        setLoading(false);
        setErrorMsg("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
        return;
      }

      if (!course.link || !course.link.toString().includes("docs.google.com")) {
        setLoading(false);
        setErrorMsg("Link khóa học không hợp lệ.");
        return;
      }

      try {
        const { id } = extractSheetInfo(course.link);
        if (!id) throw new Error("ID Sheet không hợp lệ");

        // Gọi API Sheets - QUAN TRỌNG: Lấy toàn bộ data, không chỉ định Sheet1
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${id}?includeGridData=true&fields=sheets(data(rowData(values(formattedValue,hyperlink))))`;

        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error("LessonList Error:", errorData);

          if (res.status === 403) {
            throw new Error(
              "Lỗi 403: Bạn không có quyền xem file này. Vui lòng liên hệ Admin để được cấp quyền Viewer."
            );
          }
          if (res.status === 401) {
            throw new Error(
              "Lỗi 401: Token hết hạn. Vui lòng Đăng xuất và Đăng nhập lại."
            );
          }
          throw new Error(
            `Lỗi Google API (${res.status}): ${errorData.error?.message}`
          );
        }

        const data = await res.json();
        const rows = data.sheets?.[0]?.data?.[0]?.rowData || [];
        const extractedLessons = [];

        // --- XỬ LÝ LOGIC ĐỌC SHEET NHIỀU CỘT ---
        // Sheet của bạn có cấu trúc: Tên | Link | Trống | Tên | Link | Trống...
        // Index cột sẽ là: 0(Tên), 1(Link) -> 3(Tên), 4(Link) -> 6(Tên), 7(Link)
        rows.forEach((row, rowIndex) => {
          if (!row.values) return;
          // Bỏ qua dòng tiêu đề (thường là dòng 0) nếu nó chứa chữ "Buổi Học"
          if (rowIndex === 0 && row.values[0]?.formattedValue?.includes("Buổi"))
            return;

          // Duyệt qua từng cặp cột. Bước nhảy là 3 (Cột A,B -> D,E -> G,H)
          for (let i = 0; i < row.values.length; i += 3) {
            const nameCell = row.values[i];
            const linkCell = row.values[i + 1];

            const name = nameCell?.formattedValue;
            const link = getLinkFromCell(linkCell);

            // Kiểm tra tính hợp lệ: Phải có tên và link
            if (name && link && name.length > 2) {
              const isDoc =
                link.includes("drive/folders") ||
                link.includes(".pdf") ||
                link.includes("doc") ||
                link.includes("slide");

              // Kiểm tra trùng lặp
              const existing = extractedLessons.find((l) => l.name === name);
              if (existing) {
                if (isDoc && !existing.doc) existing.doc = link;
                else if (!isDoc && !existing.video) existing.video = link;
              } else {
                extractedLessons.push({
                  name: name,
                  video: !isDoc ? link : null,
                  doc: isDoc ? link : null,
                });
              }
            }
          }
        });

        if (extractedLessons.length === 0)
          setErrorMsg(
            "Không tìm thấy bài học nào. Kiểm tra lại cấu trúc Sheet."
          );
        else {
          // Sắp xếp lại bài học theo tên (Buổi 1, Buổi 2...) nếu cần
          // extractedLessons.sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true }));
          setLessons(extractedLessons);
        }
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [course]);

  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="flex items-center gap-4 p-4 border-b border-gray-700 bg-[#0d1117]/50 backdrop-blur-sm sticky top-0 z-10">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 p-2 h-auto rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="flex-1 overflow-hidden">
          <h2
            className="text-xl font-bold text-white uppercase truncate"
            title={course.name}>
            {course.name}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
            <Lock className="w-3 h-3 text-yellow-500" /> Tài liệu nội bộ
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-auto custom-scrollbar p-4 md:p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
            <p className="text-gray-400 font-medium animate-pulse">
              Đang xác thực quyền truy cập...
            </p>
          </div>
        ) : errorMsg ? (
          <div className="flex flex-col items-center justify-center py-20 bg-red-500/10 rounded-2xl border border-red-500/20 text-red-400 px-4 text-center">
            <Lock className="w-12 h-12 mb-3 opacity-50" />
            <p className="font-medium">{errorMsg}</p>
            {errorMsg.includes("quyền") && (
              <p className="text-xs text-gray-500 mt-2 max-w-xs mx-auto">
                Hãy liên hệ Admin để được thêm vào danh sách lớp.
              </p>
            )}
          </div>
        ) : lessons.length > 0 ? (
          <div className="bg-[#0d1117] rounded-xl shadow-lg border border-gray-800 overflow-hidden">
            <div className="flex items-center bg-gradient-to-r from-gray-800 to-gray-900 p-4 border-b border-gray-700 text-sm font-bold text-white">
              <div className="flex-1">DANH SÁCH BÀI HỌC ({lessons.length})</div>
              <div className="w-32 text-center hidden md:block">HÀNH ĐỘNG</div>
            </div>
            <div className="divide-y divide-gray-800">
              {lessons.map((lesson, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col md:flex-row md:items-center hover:bg-gray-800/50 transition-colors py-4 px-5 gap-3">
                  <div className="flex-1 flex items-start gap-3">
                    <div className="mt-1 min-w-[24px] text-gray-500 font-mono text-xs">
                      {idx + 1}.
                    </div>
                    <span className="text-gray-300 font-medium text-sm leading-relaxed group-hover:text-white transition-colors">
                      {lesson.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-end md:justify-center min-w-[150px] gap-3">
                    {lesson.video && (
                      <Button
                        size="sm"
                        onClick={() => window.open(lesson.video, "_blank")}
                        className="h-8 px-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-lg text-xs font-bold transition-all shadow-sm gap-1.5">
                        <Video className="w-3.5 h-3.5" /> Video
                      </Button>
                    )}
                    {lesson.doc && (
                      <Button
                        size="sm"
                        onClick={() => window.open(lesson.doc, "_blank")}
                        className="h-8 px-3 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white border border-blue-500/20 rounded-lg text-xs font-bold transition-all shadow-sm gap-1.5">
                        <FileText className="w-3.5 h-3.5" /> Tài liệu
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

// --- CẤP 2: DANH SÁCH KHÓA HỌC (SHEET TỔNG - PUBLIC) ---
const CourseList = ({ subject, onBack, onSelectCourse }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${MASTER_SHEET_ID}?includeGridData=true&fields=sheets(data(rowData(values(formattedValue,hyperlink))))&key=${API_KEY}`;

        const res = await fetch(url);

        if (!res.ok) {
          const errorData = await res.json();
          console.error("Master Sheet API Error:", errorData);
          throw new Error(
            `Lỗi API (${res.status}): ${
              errorData.error?.message || "Kiểm tra API Key/ID Sheet"
            }`
          );
        }

        const data = await res.json();
        const rows = data.sheets?.[0]?.data?.[0]?.rowData || [];

        if (rows.length === 0) {
          console.warn("Sheet Tổng trả về dữ liệu rỗng.");
        }

        const processedCourses = [];
        let currentCategory = "";

        rows.forEach((row, index) => {
          if (!row.values) return;

          const cellA = row.values[0];
          if (cellA?.formattedValue) currentCategory = cellA.formattedValue;

          const cellB = row.values[1];
          const courseName = cellB?.formattedValue;

          const cellC = row.values[2];
          const courseLink = getCellValue(cellC);

          if (courseName && currentCategory) {
            const isMatch = subject.keywords.some((keyword) =>
              currentCategory.toLowerCase().includes(keyword.toLowerCase())
            );
            if (isMatch) {
              processedCourses.push({
                name: courseName,
                link: courseLink || "#",
                category: currentCategory,
              });
            }
          }
        });

        setCourses(processedCourses);
      } catch (err) {
        toast({
          title: "Lỗi tải danh sách",
          description: err.message,
          variant: "destructive",
        });
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [subject, toast]);

  return (
    <div className="flex flex-col h-full bg-transparent">
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-700 p-4 bg-[#0d1117]/50 backdrop-blur-sm">
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
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-10 px-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
            <p className="text-gray-400">Đang tải danh sách...</p>
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {courses.map((course, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => onSelectCourse(course)}
                className="group cursor-pointer bg-[#0d1117] border border-gray-800 hover:border-cyan-500/50 hover:bg-gray-800/50 rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-cyan-500 font-bold shadow-sm border border-gray-700 group-hover:border-cyan-500/30">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-200 text-lg group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {course.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                      {course.category}
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-cyan-400 transition-colors" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p className="text-lg font-medium">Chưa tìm thấy dữ liệu</p>
            <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">
              Vui lòng kiểm tra lại cấu trúc file Google Sheet hoặc API Key.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- DASHBOARD ---
const Dashboard = ({ user, onLogout }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col font-sans">
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsIDI1NSwgMjU1LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none" />
      <header className="bg-[#161b22]/90 backdrop-blur-md border-b border-gray-800 p-4 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto relative flex justify-between items-center h-14">
          <div className="flex items-center gap-4 z-10">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-200"></div>
              <img
                src={user.avatar}
                alt="Avt"
                className="relative w-11 h-11 rounded-full object-cover border-2 border-[#161b22]"
              />
              {user.verified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-0.5 border border-[#0d1117]">
                  <ShieldCheck className="w-2.5 h-2.5" />
                </div>
              )}
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">
                  {user.name}
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono bg-gray-800/50 px-1.5 py-0.5 rounded border border-gray-700/50 inline-block mt-1">
                {user.handle}
              </p>
            </div>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block w-auto z-0">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative px-8 py-2 rounded-full bg-gray-900/40 border border-cyan-500/20 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)] group hover:border-cyan-500/40 transition-all duration-300">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 mb-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
                  <span className="text-sm font-bold bg-gradient-to-r from-cyan-200 via-white to-purple-200 bg-clip-text text-transparent">
                    Chúc bạn có buổi học tập thật năng suất! 🌙
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 italic tracking-wider group-hover:text-gray-300 transition-colors">
                  "Bạn chỉ thất bại khi đã từ bỏ mọi nỗ lực !!!"
                </p>
              </div>
            </motion.div>
          </div>
          <div className="flex gap-4 items-center z-10">
            <ClockHeader />
            <Button
              onClick={onLogout}
              variant="destructive"
              size="sm"
              className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 transition-all hover:scale-105">
              <LogOut className="w-4 h-4 md:mr-2" />{" "}
              <span className="hidden md:inline">Thoát</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 relative z-10 container mx-auto">
        <div className="bg-[#161b22]/80 backdrop-blur-md border border-gray-800 rounded-3xl overflow-hidden shadow-2xl h-[calc(100vh-140px)] flex flex-col transition-colors duration-500">
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
                className="h-full overflow-y-auto custom-scrollbar p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
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
                localStorage.removeItem("google_access_token");
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
