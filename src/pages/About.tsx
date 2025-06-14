
import SimpleNavbar from "@/components/SimpleNavbar";
import SimpleFooter from "@/components/SimpleFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Award, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleNavbar />
      
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-arabic text-gray-800 mb-4">
              من نحن
            </h1>
            <p className="text-lg font-arabic text-gray-600">
              تعرف على قصتنا ورؤيتنا في تقديم أفضل الحلويات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white border-2 border-gray-200 text-center">
              <CardContent className="p-8">
                <Heart className="h-12 w-12 mx-auto mb-4 text-red-500" />
                <h3 className="text-xl font-bold font-arabic text-gray-800 mb-3">الحب والشغف</h3>
                <p className="font-arabic text-gray-600">
                  نصنع حلوياتنا بحب وشغف لنقدم لكم أفضل المذاقات
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-gray-200 text-center">
              <CardContent className="p-8">
                <Award className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-xl font-bold font-arabic text-gray-800 mb-3">الجودة العالية</h3>
                <p className="font-arabic text-gray-600">
                  نستخدم أجود المواد الخام لضمان جودة وطعم استثنائي
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-gray-200 text-center">
              <CardContent className="p-8">
                <Users className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-xl font-bold font-arabic text-gray-800 mb-3">رضا العملاء</h3>
                <p className="font-arabic text-gray-600">
                  نسعى دائماً لإرضاء عملائنا وتقديم خدمة متميزة
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white border-2 border-gray-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold font-arabic text-gray-800 mb-6 text-center">
                قصتنا
              </h2>
              <div className="space-y-4 font-arabic text-gray-700 leading-relaxed">
                <p>
                  بدأت رحلتنا في عالم الحلويات من حلم بسيط، وهو تقديم أفضل الحلويات الطازجة والمشروبات اللذيذة لعملائنا الكرام. 
                  منذ تأسيسنا، ونحن نسعى جاهدين لتحقيق التميز في كل ما نقدمه.
                </p>
                <p>
                  نؤمن بأن الحلويات ليست مجرد طعام، بل هي لحظات سعادة نشاركها مع أحبائنا. لذلك نحرص على استخدام أجود المواد الخام 
                  وأحدث الطرق في التحضير لضمان الحصول على منتجات عالية الجودة.
                </p>
                <p>
                  فريق عملنا المتخصص يعمل بشغف وإتقان لابتكار وصفات جديدة ومميزة، مع الحفاظ على الطعم الأصيل والتقليدي 
                  الذي يحبه عملاؤنا.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <SimpleFooter />
    </div>
  );
};

export default About;
