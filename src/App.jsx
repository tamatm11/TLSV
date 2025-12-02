/** @format */

import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// src/App.jsx
import SocialIcons from "@/components/SocialIcons";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import CoursesPage from "@/pages/CoursesPage";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

function App() {
  return (
    <Router>
      <Helmet>
        <title>Tài Liệu Sinh Viên - Nền Tảng Học Tập Trực Tuyến</title>
        <meta
          name="description"
          content="Truy cập các khóa học chất lượng cao môn Toán, Lý, Hóa và nhiều môn học khác. Giúp sinh viên đạt kết quả cao trong học tập."
        />
      </Helmet>
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
        <SocialIcons />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
