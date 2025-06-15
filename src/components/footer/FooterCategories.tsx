
import { Link } from "react-router-dom";
import React from "react";

interface Category {
  name: string;
  href: string;
}

interface FooterCategoriesProps {
  categories: Category[];
}

const FooterCategories = ({ categories }: FooterCategoriesProps) => {
  return (
    <div className="mb-8">
      <h4 className="text-lg font-semibold font-arabic text-center mb-4 text-yellow-400">
        أقسام المنتجات
      </h4>
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={category.href}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-red-600 px-4 py-2 rounded-full text-sm font-arabic transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterCategories;
