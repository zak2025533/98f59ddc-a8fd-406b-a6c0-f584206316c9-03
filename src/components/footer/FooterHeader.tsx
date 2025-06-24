import React from 'react';

const FooterHeader = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mb-8">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center">
        <img
          src="/lovable-uploads/2d3014b7-1117-47ac-8b34-9b089e9c499f.png"
          alt="بلا حدود للحلويات"
          className="h-16 w-16 rounded-full shadow-xl border-4 border-white/20"
        />
        <div>
          <h3 className="text-2xl font-bold font-arabic bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            بلا حدود للحلويات
          </h3>
          <p className="text-blue-200 text-sm">Unlimited Sweets</p>
        </div>
      </div>

      <p className="text-blue-100 font-arabic leading-relaxed max-w-3xl mx-auto mt-4 px-4 sm:px-0">
        متجر متخصص ببيع أفضل الحلويات والمشروبات الطازجة بجودة عالية وطعم استثنائي
      </p>
    </div>
  );
};

export default FooterHeader;
