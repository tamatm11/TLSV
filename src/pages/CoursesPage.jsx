/** @format */
// Thêm 2 dòng này vào đầu file
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import React, { useState, useEffect, useMemo, memo } from "react";
// import { Helmet } from "react-helmet";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  LogOut,
  Clock,
  Calendar,
  User,
  ShieldCheck,
  Sparkles,
  Atom,
  Dna,
  FlaskConical,
  Calculator,
  Languages,
  Globe,
  History,
  BrainCircuit,
  Target,
  ArrowLeft,
  ChevronRight,
  PlayCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// --- Constants ---
const MOCK_USER = {
  name: "Sinh Viên Ưu Tú",
  handle: "@sinhvien2025",
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
  verified: true,
};

const SUBJECTS = [
  {
    id: "math",
    name: "Môn Toán",
    keywords: ["toán", "math"],
    icon: Calculator,
    color: "text-blue-500",
  },
  {
    id: "physics",
    name: "Môn Lý",
    keywords: ["lý", "vật lý", "physics"],
    icon: Atom,
    color: "text-purple-500",
  },
  {
    id: "chemistry",
    name: "Môn Hóa",
    keywords: ["hóa", "chemistry"],
    icon: FlaskConical,
    color: "text-green-500",
  },
  {
    id: "english",
    name: "Tiếng Anh",
    keywords: ["anh", "english", "ielts", "toeic"],
    icon: Languages,
    color: "text-yellow-500",
  },
  {
    id: "biology",
    name: "Môn Sinh",
    keywords: ["sinh", "biology"],
    icon: Dna,
    color: "text-pink-500",
  },
  {
    id: "literature",
    name: "Môn Văn",
    keywords: ["văn", "literature"],
    icon: BookOpen,
    color: "text-cyan-500",
  },
  {
    id: "history",
    name: "Môn Sử",
    keywords: ["sử", "history"],
    icon: History,
    color: "text-orange-500",
  },
  {
    id: "geography",
    name: "Môn Địa",
    keywords: ["địa", "geography"],
    icon: Globe,
    color: "text-teal-500",
  },
  {
    id: "dgnl",
    name: "ĐGNL",
    keywords: ["đgnl", "năng lực"],
    icon: BrainCircuit,
    color: "text-rose-500",
  },
  {
    id: "dgtd",
    name: "ĐGTD",
    keywords: ["đgtd", "tư duy"],
    icon: Target,
    color: "text-red-500",
  },
];

// --- Utility Components ---

// Isolated Clock Component to prevent parent re-renders
const ClockHeader = memo(() => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const days = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];
    return `${days[date.getDay()]}, ${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("vi-VN", { hour12: false });
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-right hidden sm:block min-w-[180px]">
      <div className="text-xs text-gray-400 flex items-center justify-end gap-1">
        <Calendar className="w-3 h-3" /> {formatDate(dateTime)}
      </div>
      <div className="text-xl font-mono font-bold text-cyan-400 flex items-center justify-end gap-2">
        <Clock className="w-4 h-4" /> {formatTime(dateTime)}
      </div>
    </div>
  );
});

const LoginScreen = ({ onLogin }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  //   const handleGoogleLogin = () => {
  //     setIsLoggingIn(true);
  //     setTimeout(() => {
  //       onLogin();
  //     }, 1500);
  //   };
  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Tạo object user theo cấu trúc của web
      const userData = {
        name: user.displayName,
        handle: user.email, // Dùng email làm handle hoặc user.uid
        avatar: user.photoURL,
        verified: true,
      };

      onLogin(userData); // Truyền data thật ra ngoài
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      // Sử dụng toast (giả sử bạn có truyền toast vào hoặc dùng hook ở ngoài)
      alert("Đăng nhập thất bại: " + error.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] relative overflow-hidden p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsIDI1NSwgMjU1LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 max-w-md w-full bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,255,255,0.1)]">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full mb-4 border border-cyan-500/30">
            <ShieldCheck className="w-12 h-12 text-cyan-400" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Đăng nhập
          </h2>
          <p className="text-gray-400">
            Vui lòng đăng nhập để truy cập kho tài liệu
          </p>
        </div>

        <Button
          onClick={handleGoogleLogin}
          disabled={isLoggingIn}
          className="w-full h-14 bg-white text-gray-900 hover:bg-gray-100 font-bold text-lg rounded-xl flex items-center justify-center gap-3 transition-all duration-300 group">
          {isLoggingIn ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full"
            />
          ) : (
            <>
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  className="text-[#4285F4]"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  className="text-[#34A853]"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  className="text-[#FBBC05]"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  className="text-[#EA4335]"
                />
              </svg>
              <span>Tiếp tục với Google</span>
            </>
          )}
        </Button>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-cyan-500 hover:text-cyan-400 text-sm hover:underline">
            ← Quay lại trang chủ
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

// Extracted to prevent re-definition on every render
const SubjectGrid = memo(({ onSelect }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
    {SUBJECTS.map((subject, index) => (
      <motion.button
        key={subject.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ scale: 1.02, translateY: -5 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelect(subject)}
        className="group relative bg-white border border-gray-200 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-300 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-[0_0_30px_rgba(0,255,255,0.15)] min-h-[180px]">
        <div className="flex items-center justify-center gap-3">
          <subject.icon className={`w-8 h-8 ${subject.color}`} />
          <span className="font-bold text-gray-800 text-xl group-hover:text-cyan-600 transition-colors">
            {subject.name}
          </span>
        </div>
      </motion.button>
    ))}
  </div>
));

// Extracted to prevent re-definition on every render
const SubjectDetail = memo(({ subject, courses, onBack }) => {
  const { toast } = useToast();

  // Memoize filtered courses to prevent calculation on every render
  const subjectCourses = useMemo(() => {
    return courses.filter((course) => {
      const courseNameLower = course.name.toLowerCase();
      const categoryLower = course.category.toLowerCase();
      return subject.keywords.some(
        (keyword) =>
          courseNameLower.includes(keyword) || categoryLower.includes(keyword)
      );
    });
  }, [courses, subject]);

  const Icon = subject.icon;

  return (
    <div className="flex flex-col h-full min-h-[500px]">
      {/* Subject Header Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg mb-6 flex items-center justify-center relative">
        <Button
          variant="ghost"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-600 hover:bg-cyan-50"
          onClick={onBack}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Quay lại
        </Button>

        <div className="flex items-center gap-3">
          <Icon className={`w-8 h-8 ${subject.color}`} />
          <h2 className="text-2xl font-bold text-gray-800">{subject.name}</h2>
        </div>
      </motion.div>

      {/* Breadcrumb / List Title */}
      <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-white/80">
        <span>Danh sách khóa học:</span>
        <div className="flex items-center gap-1 text-cyan-400">
          <Icon className="w-4 h-4" />
          <span>{subject.name}</span>
        </div>
      </div>

      {/* Course List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-6">
        {subjectCourses.length > 0 ? (
          <div className="space-y-3">
            {subjectCourses.map((course, index) => (
              <motion.div
                key={`${subject.id}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md hover:shadow-cyan-500/10 border border-transparent hover:border-cyan-200 transition-all duration-200 group cursor-pointer"
                onClick={() =>
                  toast({
                    title: "Khóa học: " + course.name,
                    description: "Đang mở nội dung bài học...",
                    className: "bg-gray-900 border-cyan-500 text-white",
                  })
                }>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-cyan-50 transition-colors">
                      <PlayCircle className={`w-5 h-5 ${subject.color}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm md:text-base group-hover:text-cyan-700 transition-colors">
                        {course.name}
                      </h3>
                      {course.description && (
                        <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                          {course.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-cyan-500 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center bg-white/5 rounded-2xl border border-dashed border-white/10">
            <div className="p-4 rounded-full bg-white/10 mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-300 font-medium">
              Chưa có khóa học nào cho môn này
            </p>
            <p className="text-gray-500 text-sm mt-1">Vui lòng quay lại sau</p>
          </div>
        )}
      </div>
    </div>
  );
});

const Dashboard = ({ user, onLogout }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const sheetId = "1OrSkxufnQxoxBE4Ky9FJcovGpve4wJpOJzI-kJoCjCA";
      const gid = "0";
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&gid=${gid}`;

      const response = await fetch(url);
      const text = await response.text();
      const json = JSON.parse(text.substr(47).slice(0, -2));

      const rows = json.table.rows;
      const coursesData = rows.slice(1).map((row) => ({
        name: row.c[0]?.v || "Khóa học chưa đặt tên",
        description: row.c[1]?.v || "",
        duration: row.c[2]?.v || "",
        students: row.c[3]?.v || "",
        price: row.c[4]?.v || "Miễn phí",
        category: row.c[5]?.v || "Tổng hợp",
      }));

      setCourses(coursesData);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast({
        title: "Lỗi tải dữ liệu",
        description: "Không thể kết nối tới máy chủ dữ liệu.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsIDI1NSwgMjU1LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none" />

      {/* Header Section */}
      <header className="bg-[#161b22] border-b border-cyan-900/30 p-4 relative z-20 shadow-lg">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left: User Info */}
          <div className="flex items-center gap-3 w-full md:w-1/3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-[2px]">
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              {user.verified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-0.5 border-2 border-[#161b22]">
                  <ShieldCheck className="w-3 h-3" />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white">
                  {user.name}
                </span>
                <ShieldCheck className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-sm text-gray-400 bg-gray-800/50 px-2 py-0.5 rounded-full w-fit">
                {user.handle}
              </span>
            </div>
          </div>

          {/* Center: Motivational Quote */}
          <div className="flex-1 w-full md:w-1/3 flex flex-col items-center justify-center text-center hidden lg:flex">
            <div className="flex items-center gap-2 text-sm text-cyan-400 font-medium mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Chúc bạn có buổi học tập thật năng suất! 🌙</span>
            </div>
            <p className="text-xs text-gray-500 italic">
              "Bạn chỉ thất bại khi đã từ bỏ mọi nỗ lực !!!"
            </p>
          </div>

          {/* Right: Time & Logout */}
          <div className="flex items-center justify-end gap-4 w-full md:w-1/3">
            <ClockHeader />
            <Button
              onClick={onLogout}
              variant="destructive"
              className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20">
              <LogOut className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Đăng xuất</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 relative z-10 overflow-hidden">
        <div className="container mx-auto h-full flex flex-col">
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-3xl p-6 shadow-2xl flex-1 overflow-hidden flex flex-col min-h-[600px]">
            {/* Content Area */}
            <div className="flex-1 h-full overflow-hidden">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center gap-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full"
                  />
                  <p className="text-cyan-400 animate-pulse">
                    Đang đồng bộ dữ liệu học tập...
                  </p>
                </div>
              ) : (
                <AnimatePresence mode="wait" initial={false}>
                  {selectedSubject ? (
                    <motion.div
                      key="detail"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="h-full">
                      <SubjectDetail
                        subject={selectedSubject}
                        courses={courses}
                        onBack={() => setSelectedSubject(null)}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="grid"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="h-full overflow-y-auto custom-scrollbar pr-2">
                      <SubjectGrid onSelect={setSelectedSubject} />
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>

          {/* Footer Banner */}
          {!selectedSubject && (
            <div className="mt-6 flex justify-center">
              <div className="bg-[#8B0000] px-8 py-2 rounded-full border border-red-500/50 shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center gap-2 animate-pulse">
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                <span className="text-white font-bold text-sm uppercase tracking-wider">
                  Hoàng Sa & Trường Sa là của Việt Nam! 🇻🇳
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const CoursesPage = () => {
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("tslv_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    // Thêm tham số userData
    // Nếu userData có giá trị (đăng nhập thật) thì dùng, nếu không thì dùng MOCK_USER (fallback)
    const userToSave = userData || MOCK_USER;

    localStorage.setItem("tslv_user", JSON.stringify(userToSave));
    setUser(userToSave);

    toast({
      title: "Đăng nhập thành công! 🎉",
      description: `Chào mừng trở lại, ${userToSave.name}`,
      className: "bg-green-900 border-green-500 text-white",
    });
  };
  const handleLogout = () => {
    localStorage.removeItem("tslv_user");
    setUser(null);
    toast({
      title: "Đã đăng xuất",
      description: "Hẹn gặp lại bạn sớm!",
    });
  };

  return (
    <>
      <Helmet>
        <title>Hệ Thống Học Tập - Tài Liệu Sinh Viên</title>
        <meta
          name="description"
          content="Truy cập kho khóa học và tài liệu chất lượng cao."
        />
      </Helmet>

      <AnimatePresence mode="wait">
        {!user ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <LoginScreen onLogin={handleLogin} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <Dashboard user={user} onLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CoursesPage;
