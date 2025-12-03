/** @format */

import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  DollarSign,
  Youtube,
  Mail,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const HeroSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openYouTubeGuide = () => {
    toast({
      title: "🚧 Đang phát triển",
      description: "Video hướng dẫn sẽ sớm được cập nhật!",
    });
  };

  const openGoogleSheet = () => {
    window.open(
      "https://docs.google.com/spreadsheets/d/1OrSkxufnQxoxBE4Ky9FJcovGpve4wJpOJzI-kJoCjCA/edit?gid=0#gid=0",
      "_blank"
    );
  };

  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 inline-block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-3xl opacity-50 animate-pulse" />
              <h1 className="relative text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Trạm Sinh Viên
              </h1>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Nguồn tài nguyên học tập chất lượng cao dành cho sinh viên. Khóa học
            đa dạng, tài liệu phong phú, hỗ trợ tận tình.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              onClick={() => navigate("/courses")}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all duration-300 border-0">
              <BookOpen className="mr-2 h-5 w-5" />
              Vào học ngay
            </Button>

            <Button
              onClick={() => scrollToSection("pricing")}
              variant="outline"
              className="border-2 border-purple-500 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300">
              <DollarSign className="mr-2 h-5 w-5" />
              Xem bảng giá
            </Button>

            <Button
              onClick={openYouTubeGuide}
              variant="outline"
              className="border-2 border-pink-500 text-pink-400 hover:bg-pink-500/20 hover:text-pink-300 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300">
              <Youtube className="mr-2 h-5 w-5" />
              Hướng dẫn học
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => scrollToSection("contact")}
              variant="ghost"
              className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 px-6 py-6 text-lg rounded-xl transition-all duration-300">
              <Mail className="mr-2 h-5 w-5" />
              Liên hệ
            </Button>

            <Button
              onClick={openGoogleSheet}
              variant="ghost"
              className="text-green-400 hover:text-green-300 hover:bg-green-400/10 px-6 py-6 text-lg rounded-xl transition-all duration-300">
              <FileSpreadsheet className="mr-2 h-5 w-5" />
              Xem List khóa học
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { number: "500+", label: "Khóa học" },
              { number: "10,000+", label: "Sinh viên" },
              { number: "4.9/5", label: "Đánh giá" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-cyan-400/20 backdrop-blur-sm">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
