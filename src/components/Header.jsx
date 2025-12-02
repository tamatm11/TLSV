/** @format */

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  GraduationCap,
  BookOpen,
  Users,
  Mail,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Trang chủ", icon: Home, path: "/" },
    { name: "Khóa học", icon: BookOpen, path: "/courses" },
    { name: "Giới thiệu", icon: Users, path: "/about" },
    { name: "Liên hệ", icon: Mail, path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-40 font-sans">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Tài Liệu Sinh Viên
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 transition-colors duration-200 font-medium ${
                  isActive(item.path)
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}>
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
            {/* Removed the "Đăng nhập" button for desktop */}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600 transition-colors">
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t pt-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-2 w-full text-left py-3 transition-colors ${
                  isActive(item.path)
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-600"
                }`}>
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
            {/* Removed the "Đăng nhập" button for mobile */}
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;
