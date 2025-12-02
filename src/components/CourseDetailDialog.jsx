/** @format */

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  Clock,
  BookOpen,
  Star,
  Award,
  CheckCircle,
  Users,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentDialog from "@/components/PaymentDialog";

const CourseDetailDialog = ({ course, open, onOpenChange }) => {
  const [showPayment, setShowPayment] = useState(false);

  if (!course) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {course.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                <Clock className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="text-sm text-gray-600">Thời lượng</div>
                <div className="font-semibold text-gray-900">
                  {course.duration}
                </div>
              </div>
              <div className="text-center p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <BookOpen className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
                <div className="text-sm text-gray-600">Bài học</div>
                <div className="font-semibold text-gray-900">
                  {course.lessons}
                </div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <Star className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                <div className="text-sm text-gray-600">Đánh giá</div>
                <div className="font-semibold text-gray-900">
                  {course.rating}
                </div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
                <Users className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <div className="text-sm text-gray-600">Học viên</div>
                <div className="font-semibold text-gray-900">
                  {course.students}
                </div>
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="curriculum">Chương trình học</TabsTrigger>
                <TabsTrigger value="instructor">Giảng viên</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">
                    Giới thiệu khóa học
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {course.description}
                  </p>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    {course.longDescription}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-3 text-gray-900">
                    Bạn sẽ học được gì
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.learningOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-3 mt-4">
                <h3 className="text-lg font-bold mb-3 text-gray-900">
                  Nội dung chi tiết
                </h3>
                {course.curriculum.map((module, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="font-bold text-gray-900 mb-2">
                      {module.title}
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      {module.topics.map((topic, topicIndex) => (
                        <div
                          key={topicIndex}
                          className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          {topic}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="instructor" className="space-y-4 mt-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                    {course.instructor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {course.instructor.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-2">
                      {course.instructor.title}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>{course.instructor.courses} khóa học</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.instructor.students} học viên</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {course.instructor.bio}
                </p>
              </TabsContent>
            </Tabs>

            <div className="border-t pt-6 flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold text-blue-600">
                  {course.price.toLocaleString("vi-VN")}đ
                </span>
                {course.originalPrice && (
                  <span className="text-gray-400 line-through ml-2 text-lg">
                    {course.originalPrice.toLocaleString("vi-VN")}đ
                  </span>
                )}
              </div>
              <Button
                onClick={() => setShowPayment(true)}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                Đăng Ký Ngay
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PaymentDialog
        course={course}
        open={showPayment}
        onOpenChange={setShowPayment}
      />
    </>
  );
};

export default CourseDetailDialog;
