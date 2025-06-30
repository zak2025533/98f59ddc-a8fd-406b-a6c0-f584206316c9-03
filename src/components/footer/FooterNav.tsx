import { Link } from "react-router-dom";
import React from "react";

interface QuickLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface FooterNavProps {
  quickLinks: QuickLink[];
}

const FooterNav = ({ quickLinks }: FooterNavProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 px-4">
      {quickLinks.map((link, index) => {
        const Icon = link.icon;
        return (
          <Link
            key={index}
            to={link.href}
            className="group bg-blue-800/30 hover:bg-blue-800/50 rounded-2xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm border border-white/10"
          >
            <div className="text-center">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-xl mx-auto w-fit mb-2 group-hover:scale-110 transition-transform">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-arabic text-white group-hover:text-yellow-100 transition-colors">
                {link.name}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default FooterNav;
