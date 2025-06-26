
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string;
}

const AllCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, slug, image_url')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      setCategories(data || []);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 font-arabic">جميع الفئات</h2>
          <p className="mt-4 text-lg text-gray-500 font-arabic">اختر فئة لتصفح منتجاتها</p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.id} to={`/category/${category.slug}`} className="group block text-center">
              <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                <img
                  src={category.image_url}
                  alt={category.name}
                  className="w-full h-full object-center object-cover"
                />
                 <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900 font-arabic">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCategories;
