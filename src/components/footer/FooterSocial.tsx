
import React from "react";

interface SocialLink {
  icon: React.ElementType;
  href: string;
  name: string;
  color: string;
}

interface FooterSocialProps {
  socialLinks: SocialLink[];
}

const FooterSocial = ({ socialLinks }: FooterSocialProps) => {
  return (
    <div className="text-center">
      <h4 className="text-lg font-semibold font-arabic mb-4 text-yellow-400">
        تابعونا على
      </h4>
      <div className="flex justify-center space-x-4">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <a
              key={index}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : '_self'}
              rel={social.href.startsWith('http') ? 'noopener noreferrer' : ''}
              className={`bg-white/10 ${social.color} p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm border border-white/10 group`}
              aria-label={social.name}
            >
              <Icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default FooterSocial;
