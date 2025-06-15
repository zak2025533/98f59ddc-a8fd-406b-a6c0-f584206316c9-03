
import React from "react";

interface ContactInfo {
  icon: React.ElementType;
  text: string;
  color: string;
  href: string;
  bgColor: string;
}

interface FooterContactProps {
  contactInfo: ContactInfo[];
}

const FooterContact = ({ contactInfo }: FooterContactProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {contactInfo.map((info, index) => {
        const Icon = info.icon;
        return (
          <a 
            key={index} 
            href={info.href}
            target={info.href.startsWith('http') || info.href.startsWith('tel') || info.href.startsWith('mailto') ? '_blank' : '_self'}
            rel={info.href.startsWith('http') ? 'noopener noreferrer' : ''}
            className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 ${info.bgColor} transition-all duration-300 hover:scale-105 hover:shadow-lg group cursor-pointer`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-300`}>
                <Icon className={`h-5 w-5 ${info.color} group-hover:scale-110 transition-transform duration-300`} />
              </div>
              <span className="text-blue-100 font-arabic text-sm flex-1 group-hover:text-white transition-colors">
                {info.text}
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default FooterContact;
