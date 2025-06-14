import SimpleNavbar from "@/components/SimpleNavbar";
import SimpleFooter from "@/components/SimpleFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Award, Heart, Clock, MapPin } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Heart,
      title: "جودة عالية",
      description: "نستخدم أفضل المكونات لضمان طعم لا يُنسى"
    },
    {
      icon: Clock,
      title: "طازج دائماً",
      description: "منتجاتنا محضرة يومياً بأيدي خبراء"
    },
    {
      icon: Award,
      title: "خبرة طويلة",
      description: "خبرة واسعة في صناعة وبيع الحلويات"
    },
    {
      icon: Users,
      title: "خدمة عملاء ممتازة",
      description: "فريق محترف لخدمتكم"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <SimpleNavbar />
      
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 font-arabic bg-blue-100 text-blue-800">
            من نحن
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-6 font-arabic">
            بلا حدود للحلويات
          </h1>
          <p className="text-xl text-gray-700 mb-8 font-arabic max-w-3xl mx-auto">
            متجر متخصص ببيع أفضل الحلويات والمشروبات الطازجة بجودة عالية وطعم استثنائي.
            نسعى لتقديم تجربة مميزة لعملائنا الكرام.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-white/70">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-2 border-blue-200 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-blue-800 font-arabic text-right">
                  <Target className="h-6 w-6" />
                  رؤيتنا
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 font-arabic text-right leading-relaxed">
                  أن نكون الخيار الأول لمحبي الحلويات، ونساهم في نشر 
                  ثقافة الحلويات العربية الأصيلة مع لمسة عصرية مبتكرة.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-purple-800 font-arabic text-right">
                  <Award className="h-6 w-6" />
                  مهمتنا
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 font-arabic text-right leading-relaxed">
                  تقديم حلويات ومشروبات عالية الجودة باستخدام أفضل المكونات الطبيعية، مع الحفاظ على 
                  التراث العربي وإضافة الابتكار والإبداع لتلبية احتياجات عملائنا.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-4 font-arabic">
              لماذا تختارنا؟
            </h2>
            <p className="text-gray-700 font-arabic">
              نتميز بالعديد من المزايا التي تجعلنا الخيار الأمثل لك
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 border-blue-200 hover:border-purple-300 transition-all duration-300 group bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-800 mb-2 font-arabic">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 font-arabic text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 font-arabic">
            تواصل معنا
          </h2>
          <p className="text-lg mb-8 font-arabic opacity-90">
            نحن هنا لخدمتكم والإجابة على جميع استفساراتكم
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center gap-3 justify-center">
              <MapPin className="h-5 w-5" />
              <span className="font-arabic">اليمن</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Clock className="h-5 w-5" />
              <span className="font-arabic">خدمة العملاء</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Users className="h-5 w-5" />
              <span className="font-arabic">فريق محترف ومتخصص</span>
            </div>
          </div>
        </div>
      </section>

      <SimpleFooter />
    </div>
  );
};

export default About;
