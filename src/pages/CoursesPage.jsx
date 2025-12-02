/** @format */

import React from "react";
import CourseSection from "@/components/CourseSection.jsx";

const CoursesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 animate-in fade-in duration-500">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tất Cả Khóa Học
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Danh sách các khóa học chất lượng cao giúp bạn nâng cao kiến thức và
            kỹ năng.
          </p>
        </div>
        <CourseSection showDetailsButton={false} />{" "}
        {/* Pass showDetailsButton={false} */}
      </div>
    </div>
  );
};

export default CoursesPage; /** @format */
