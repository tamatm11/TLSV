/** @format */

import React from "react";
import { Helmet } from "react-helmet-async";
// import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import HeroSection from "@/components/home/HeroSection";
import PricingSection from "@/components/home/PricingSection";
import ContactSection from "@/components/home/ContactSection";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Trạm Sinh Viên - Nguồn học liệu chất lượng cho sinh viên</title>
        <meta
          name="description"
          content="Tài Liệu Sinh Viên cung cấp các khóa học và tài liệu học tập chất lượng cao cho sinh viên. Khám phá ngay hôm nay!"
        />
      </Helmet>
      <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
        <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsIDI1NSwgMjU1LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />

        <HeroSection />
        <PricingSection />
        <ContactSection />
      </div>
    </>
  );
};

export default HomePage;
