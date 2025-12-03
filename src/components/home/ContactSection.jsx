/** @format */

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Youtube,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Đang phát triển",
      description:
        "Chức năng gửi tin nhắn sẽ sớm được triển khai! Hiện tại vui lòng liên hệ qua email hoặc số điện thoại bên dưới.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "cryptoguy2410@gmail.com",
      color: "cyan",
    },
    {
      icon: Phone,
      label: "Số điện thoại",
      value: "+84 356 026 163",
      color: "purple",
    },
    {
      icon: MapPin,
      label: "Địa chỉ",
      value: "Phường Đông Hòa, Thành phố Dĩ An",
      color: "pink",
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      label: "Facebook",
      color: "text-blue-400",
      href: "https://www.facebook.com/tailieusinhvien/",
    },
    {
      icon: Youtube,
      label: "YouTube",
      color: "text-red-400",
      href: "https://www.youtube.com/@tlsv-tailieusinhvien",
    },
    {
      icon: MessageCircle,
      label: "Zalo",
      color: "text-cyan-400",
      href: "https://zalo.me/0862370152",
    },
  ];

  return (
    <section id="contact" className="relative z-10 py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Liên Hệ
          </h2>
          <p className="text-xl text-gray-400">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                const colorClasses = {
                  cyan: "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-400/30",
                  purple:
                    "from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-400/30",
                  pink: "from-pink-500/20 to-red-500/20 text-pink-400 border-pink-400/30",
                };
                const colorClass = colorClasses[info.color];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-start gap-4 p-6 bg-gradient-to-br ${colorClass} rounded-xl border backdrop-blur-sm hover:shadow-lg transition-all duration-300`}>
                    <div
                      className={`p-3 bg-gradient-to-br ${colorClass} rounded-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">{info.label}</p>
                      <p className="text-white font-semibold">{info.value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl p-6 border border-cyan-400/20 backdrop-blur-sm">
              <p className="text-white font-semibold mb-4">
                Kết nối với chúng tôi
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      className={`${social.color} hover:bg-white/10 p-3 rounded-xl transition-all duration-300 hover:scale-110`}
                      onClick={() => {
                        // Kiểm tra nếu có link thì mở trong tab mới
                        if (social.href) {
                          window.open(
                            social.href,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }
                      }}>
                      <Icon className="w-6 h-6" />
                    </Button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl p-8 border border-purple-400/20 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-white font-semibold mb-2">
                  Họ và tên
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-400 transition-colors duration-300"
                  placeholder="Nhập họ và tên của bạn"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-white font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-400 transition-colors duration-300"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-white font-semibold mb-2">
                  Tin nhắn
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-400 transition-colors duration-300 resize-none"
                  placeholder="Nhập tin nhắn của bạn..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 text-lg font-semibold rounded-xl border-0 transition-all duration-300">
                <Send className="mr-2 h-5 w-5" />
                Gửi tin nhắn
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
