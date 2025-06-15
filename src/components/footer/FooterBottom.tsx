
import { Heart, MessageCircle } from "lucide-react";
import React from "react";

const FooterBottom = () => {
  return (
    <div className="border-t border-white/10 bg-blue-900/20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Heart className="h-4 w-4 text-red-400" />
            <span className="text-blue-200 text-sm font-arabic">
              بلا حدود للحلويات
            </span>
          </div>
          
          <div className="text-blue-200 text-sm font-arabic text-center">
            <div className="mb-2">
              تصميم وتطوير المهندس: زكريا نبيل الحاج
            </div>
            <div className="flex items-center justify-center gap-2">
              <a 
                href="https://wa.me/967780652001"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                <MessageCircle className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-xs">780652001</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
