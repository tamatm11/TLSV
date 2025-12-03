/** @format */

import React from "react";
import { motion } from "framer-motion";
import { Target, Snowflake, Sparkles, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const PricingSection = () => {
  const { toast } = useToast();

  const pricingOptions = [
    {
      id: 1,
      title: "FULL COMBO I LỚP NGOẠI NGỮ",
      price: "299K",
      highlight: true, // Gói nổi bật
    },
    {
      id: 2,
      title: "FULL COMBO MASTER COURSES",
      price: "200K",
      highlight: false,
    },
    {
      id: 3,
      title: "FULL COMBO ĐẠI CƯƠNG",
      price: "199K",
      highlight: false,
      hasSnowflake: true,
    },
    {
      id: 4,
      title: "FULL COMBO SINH VIÊN PRO",
      price: "499K",
      highlight: false,
      hasSnowflake: true,
    },
    {
      id: 5,
      title: "FULL COMBO SINH VIÊN SUPPER PRO",
      price: "589K",
      highlight: false,
      hasSnowflake: true,
    },
    {
      id: 6,
      title: "COMBO KHÓA TỰ CHỌN",
      price: "từ 99K",
      highlight: false,
    },
  ];

  const handleSelectPlan = (planName) => {
    toast({
      title: "🚀 Đã tiếp nhận!",
      description: `Bạn đang quan tâm gói "${planName}".`,
    });
  };

  return (
    <section
      id="pricing"
      className="relative z-10 py-20 px-4 bg-[#09090b] overflow-hidden">
      {/* HIỆU ỨNG NỀN (GLOW): Tạo điểm nhấn màu tím/xanh nhưng không làm chói mắt */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Các hạt trang trí nhỏ */}
      <div className="absolute top-20 left-10 text-blue-500/20 animate-pulse">
        <Sparkles size={32} />
      </div>

      <div className="container mx-auto max-w-6xl relative z-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target className="text-pink-500 w-8 h-8 animate-spin-slow" />
            {/* Gradient Text cho tiêu đề nổi bật trên nền đen */}
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wide bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Bảng Giá Ưu Đãi
            </h2>
          </div>
          <p className="text-gray-400 text-lg">
            Đầu tư cho tương lai với chi phí hợp lý nhất
          </p>
        </motion.div>

        {/* Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => handleSelectPlan(option.title)}
              // CARD STYLE: Dark theme, border mỏng, shadow màu
              className={`
                group relative p-6 rounded-2xl cursor-pointer transition-all duration-300
                border border-gray-800 bg-[#121217] hover:border-purple-500/50
                ${
                  option.highlight
                    ? "shadow-[0_0_30px_rgba(168,85,247,0.15)] ring-1 ring-purple-500/30"
                    : "hover:shadow-xl"
                }
              `}>
              {/* Trang trí góc thẻ */}
              <div className="absolute top-0 right-0 p-3 opacity-50 group-hover:opacity-100 transition-opacity">
                {option.hasSnowflake ? (
                  <Snowflake
                    size={20}
                    className="text-cyan-400 animate-pulse"
                  />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-gray-700 group-hover:bg-purple-500 transition-colors" />
                )}
              </div>

              <div className="flex flex-col h-full gap-4">
                {/* Tên gói */}
                <h3
                  className={`text-lg font-bold transition-colors ${
                    option.highlight
                      ? "text-white"
                      : "text-gray-300 group-hover:text-white"
                  }`}>
                  {option.title}
                </h3>

                <div className="my-2 h-[1px] w-full bg-gray-800 group-hover:bg-gray-700 transition-colors" />

                {/* Giá tiền */}
                <div className="mt-auto flex items-baseline gap-2">
                  <span className="text-sm text-gray-500">Chỉ</span>
                  {/* Màu giá tiền: Xanh neon để nổi bật trên nền tối */}
                  <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                    {option.price}
                  </span>
                </div>

                {/* Nút Action giả lập */}
                <div className="mt-2 flex items-center text-sm font-medium text-gray-500 group-hover:text-purple-400 transition-colors gap-2">
                  <span>Đăng ký ngay</span>
                  <CheckCircle2 size={16} />
                </div>
              </div>

              {/* Hiệu ứng hover nền nhẹ */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 border border-gray-800 text-gray-400 text-sm">
            <span>💡</span>
            <span>Hỗ trợ thanh toán đa nền tảng</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection; /** @format */
