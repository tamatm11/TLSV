/** @format */

import React, { useState } from "react";
import { motion } from "framer-motion";
import CourseCard from "@/components/CourseCard";
import CourseDetailDialog from "@/components/CourseDetailDialog";
import { coursesData } from "@/data/coursesData";

const CourseSection = ({ showDetailsButton }) => {
  // Added showDetailsButton prop
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <section className="py-16 container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {coursesData.map((course, index) => (
          <CourseCard
            key={course.id}
            course={course}
            index={index}
            onViewDetails={() => setSelectedCourse(course)}
            showDetailsButton={showDetailsButton} // Pass the prop to CourseCard
          />
        ))}
      </div>

      <CourseDetailDialog
        course={selectedCourse}
        open={!!selectedCourse}
        onOpenChange={(open) => !open && setSelectedCourse(null)}
      />
    </section>
  );
};

export default CourseSection;
