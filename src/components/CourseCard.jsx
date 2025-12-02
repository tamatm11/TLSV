/** @format */

import React from "react";
import { motion } from "framer-motion";
import { Clock, BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const CourseCard = ({
  course,
  index,
  onViewDetails,
  showDetailsButton = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden shrink-0">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
          {course.level}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
          {course.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm flex-grow">
          {course.description}
        </p>

        <div className="flex items-center gap-4 mb-4 text-xs text-gray-500 border-t border-b border-gray-50 py-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{course.lessons} bài</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span>{course.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <div>
            <span className="text-xl font-bold text-blue-600">
              {course.price.toLocaleString("vi-VN")}đ
            </span>
            {course.originalPrice && (
              <span className="text-gray-400 line-through ml-2 text-xs">
                {course.originalPrice.toLocaleString("vi-VN")}đ
              </span>
            )}
          </div>
        </div>

        {showDetailsButton && (
          <Button
            onClick={onViewDetails}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium">
            Xem Chi Tiết
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default CourseCard; /** @format */
