/** @format */

import React from "react";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Youtube,
  Instagram,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-700 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                Tài Liệu Sinh Viên
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Nền tảng giáo dục trực tuyến tin cậy của bạn. Học từ những giảng
              viên giỏi nhất và đạt được mục tiêu học tập của bạn.
            </p>
          </div>

          <div>
            <span className="text-lg font-bold text-gray-900 mb-4 block">
              Liên Kết Nhanh
            </span>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-blue-600 transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="text-gray-600 hover:text-blue-600 transition-colors">
                  Tất cả khóa học
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-blue-600 transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-lg font-bold text-gray-900 mb-4 block">
              Hỗ Trợ
            </span>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors">
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors">
                  Điều khoản dịch vụ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors">
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-lg font-bold text-gray-900 mb-4 block">
              Liên Hệ
            </span>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600">
                <Mail className="w-5 h-5 text-blue-600" />
                <span>cryptoguy2410@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <Phone className="w-5 h-5 text-blue-600" />
                <span>+84 356 026 163</span>
              </li>
              <li className="flex items-start gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                <span>Quảng Trường Sáng Tạo, Phường Đông Hòa, TP. Dĩ An</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2025 Tài Liệu Sinh Viên. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
