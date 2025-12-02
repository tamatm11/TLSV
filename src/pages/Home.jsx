/** @format */

import React from "react";
import Hero from "@/components/Hero";
import CourseSection from "@/components/CourseSection";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <Hero />
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 mb-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Các Khóa Học Nổi Bật
            </h2>
            <p className="text-gray-600 text-lg">
              Khám phá các khóa học được yêu thích nhất và bắt đầu hành trình
              chinh phục kiến thức.
            </p>
          </div>
        </div>
        <CourseSection showDetailsButton={false} />{" "}
        {/* Changed to false to remove "Xem chi tiết" button */}
      </div>
    </div>
  );
};

export default Home;
