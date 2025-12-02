/** @format */

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Users, Award, Shield } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Users,
      title: "Giảng viên chuyên gia",
      desc: "Đội ngũ giảng viên giàu kinh nghiệm từ các trường đại học hàng đầu.",
    },
    {
      icon: Award,
      title: "Chất lượng đảm bảo",
      desc: "Nội dung được biên soạn kỹ lưỡng, cập nhật theo chương trình mới nhất.",
    },
    {
      icon: Shield,
      title: "Hỗ trợ tận tình",
      desc: "Đội ngũ hỗ trợ 24/7, giải đáp mọi thắc mắc của học viên.",
    },
  ];

  return (
    <div className="min-h-screen bg-white animate-in fade-in duration-500">
      {/* Hero Section for About */}
      <div className="bg-blue-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Về Chúng Tôi
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tài Liệu Sinh Viên là nền tảng giáo dục trực tuyến hàng đầu, cam kết
            mang lại giá trị học tập đích thực cho sinh viên Việt Nam.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <img
              alt="Về chúng tôi"
              className="rounded-2xl shadow-xl w-full"
              src="https://images.unsplash.com/photo-1679316481049-4f6549df499f"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Sứ Mệnh Của Chúng Tôi
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Chúng tôi tin rằng giáo dục chất lượng cao nên dễ dàng tiếp cận
              với mọi sinh viên. Sứ mệnh của chúng tôi là xóa bỏ rào cản trong
              việc học các môn khoa học cơ bản và nâng cao, giúp sinh viên tự
              tin vượt qua các kỳ thi và áp dụng kiến thức vào thực tiễn.
            </p>
            <div className="space-y-4">
              {[
                "Cung cấp tài liệu học tập chuẩn xác",
                "Phương pháp giảng dạy trực quan, dễ hiểu",
                "Cộng đồng học tập tích cực, hỗ trợ lẫn nhau",
                "Chi phí hợp lý cho sinh viên",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="p-8 bg-gray-50 rounded-xl text-center hover:shadow-lg transition-shadow">
              <f.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {f.title}
              </h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
