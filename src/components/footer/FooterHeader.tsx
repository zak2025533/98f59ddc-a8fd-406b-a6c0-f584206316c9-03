import React from 'react';

const FooterHeader = () => {
  return (
    <footer className="text-center pb-safe-area-inset-bottom px-4 pt-6">
      <div className="flex flex-col items-center gap-4 mb-6">
        {/* Logo and Text */}
        <img
          src="/lovable-uploads/2d3014b7-1117-47ac-8b34-9b089e9c499f.png"
          alt="بلا حدود للحلويات"
          className="h-20 w-20 rounded-full shadow-xl border-4 border-white/30 object-cover"
        />

        <div>
          <h3 className="text-2xl font-bold font-arabic bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            بلا حدود للحلويات
          </h3>
          <p className="text-blue-200 text-sm">Unlimited Sweets</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-blue-100 font-arabic leading-relaxed max-w-md mx-auto text-sm sm:text-base px-2">
        متجر متخصص ببيع أفضل الحلويات والمشروبات الطازجة بجودة عالية وطعم استثنائي.
      </p>
    </footer>
  );
};

export default FooterHeader;
