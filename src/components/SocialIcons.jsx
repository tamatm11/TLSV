/** @format */

import React from "react";
import { Facebook, Youtube } from "lucide-react";

const SocialIcons = () => {
  const iconClass =
    "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer border-2 border-white";

  // Custom SVGs for icons not in Lucide or where brand colors are specific
  const ZaloIcon = () => (
    <svg viewBox="0 0 48 48" width="24" height="24" className="fill-white">
      <path d="M24 4C12.95 4 4 12.95 4 24c0 11.05 8.95 20 20 20 11.05 0 20-8.95 20-20C44 12.95 35.05 4 24 4zm2 31h-4v-2h4v2zm0-5h-4c0-2.5 1.5-3.5 2.5-4.5C25.5 24.5 26 24 26 22c0-1.1-.9-2-2-2s-2 .9-2 2h-4c0-3.31 2.69-6 6-6s6 2.69 6 6c0 2.21-1.79 3.31-3.31 4.81-1.09 1.09-1.69 1.69-1.69 3.19z" />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="24"
        fill="white"
        fontWeight="bold">
        Z
      </text>
    </svg>
  );

  // Using simplified brand colors and icons
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {/* Facebook */}
      <a
        href="https://www.facebook.com/admintlsv/"
        className={`${iconClass} bg-[#1877F2]`}>
        <Facebook className="w-6 h-6 text-white" />
      </a>

      {/* Zalo - Custom Blue */}
      <a
        href="https://zalo.me/0356026163"
        className={`${iconClass} bg-[#0068FF]`}>
        <span className="text-white font-bold text-xs">Zalo</span>
      </a>

      {/* YouTube */}
      <a
        href="https://www.youtube.com/@tlsv-tailieusinhvien"
        className={`${iconClass} bg-[#FF0000]`}>
        <Youtube className="w-6 h-6 text-white" />
      </a>

      {/* TikTok */}
      <a href="#" className={`${iconClass} bg-black`}>
        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 1 0-1 13.6 6.84 6.84 0 0 0 6.25-5.48V8.21a8.47 8.47 0 0 0 3.98 1.9v-3.42z" />
        </svg>
      </a>

      {/* Telegram */}
      <a href="#" className={`${iconClass} bg-[#24A1DE]`}>
        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
          <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.75-.33 1.42.2 1.17 1.43L18.27 17.9c-.12.64-.96.78-1.52.43l-4.13-3.05-1.99 1.92c-.22.23-.4.42-.82.42z" />
        </svg>
      </a>
    </div>
  );
};

export default SocialIcons;
