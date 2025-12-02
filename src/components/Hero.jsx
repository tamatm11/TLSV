/** @format */

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Award, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const stats = [
    { icon: BookOpen, value: "50+", label: "Khóa học" },
    { icon: Users, value: "10,000+", label: "Sinh viên" },
    { icon: Award, value: "95%", label: "Tỷ lệ đậu" },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Nâng Tầm <span className="text-blue-600">Kiến Thức</span> Của Bạn
              Ngay Hôm Nay
            </h1>
            <p className="text-xl mb-8 text-gray-600">
              Truy cập các khóa học chất lượng cao môn Toán, Lý, Hóa và nhiều
              môn học khác từ các giảng viên chuyên gia.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/courses">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                  Xem Khóa Học <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Tìm Hiểu Thêm
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-gray-200">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl md:text-3xl font-bold text-blue-600">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative">
            <div className="absolute -inset-4 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <img
              alt="Sinh viên học tập vui vẻ"
              className="relative rounded-2xl shadow-2xl w-full transform hover:scale-105 transition-transform duration-500"
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
