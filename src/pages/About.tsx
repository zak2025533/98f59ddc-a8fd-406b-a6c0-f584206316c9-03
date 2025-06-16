
import MobileLayout from "@/components/mobile/MobileLayout";
import MobileHeader from "@/components/mobile/MobileHeader";
import SimpleNavbar from "@/components/SimpleNavbar";
import SimpleFooter from "@/components/SimpleFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Award, Heart, Clock, MapPin, Phone, Mail } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const About = () => {
  const isMobile = useIsMobile();

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

  const contactInfo = [
    { 
      icon: Phone, 
      text: "770006120", 
      color: "text-green-400",
      href: "tel:+967770006120",
      bgColor: "hover:bg-green-500/10"
    },
    { 
      icon: Mail, 
      text: "motahr4742@gmail.com", 
      color: "text-red-400",
      href: "mailto:motahr4742@gmail.com",
      bgColor: "hover:bg-red-500/10"
    },
    { 
      icon: MapPin, 
      text: "اليمن - محافظة إب", 
      color: "text-yellow-400",
      href: "https://maps.google.com/?q=اليمن محافظة إب",
      bgColor: "hover:bg-yellow-500/10"
    },
    { 
      icon: Clock, 
      text: "السبت - الخميس: 8 ص - 12 م", 
      color: "text-purple-400",
      href: "#",
      bgColor: "hover:bg-purple-500/10"
    }
  ];

  if (isMobile) {
    return (
      <MobileLayout>
        <MobileHeader title="من نحن" showSearch={false} />
        <div className="space-y-6 p-4">
          {/* Hero Section */}
          <div className="text-center bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl p-6 mobile-card">
            <Badge variant="secondary" className="mb-4 font-arabic bg-white/20 text-white">
              من نحن
            </Badge>
            <h1 className="text-2xl font-bold mb-4 font-arabic">
              بلا حدود للحلويات
            </h1>
            <p className="text-white/90 font-arabic leading-relaxed">
              متجر متخصص ببيع أفضل الحلويات والمشروبات الطازجة بجودة عالية وطعم استثنائي.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="space-y-4">
            <Card className="border-2 border-blue-200 bg-white mobile-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-blue-800 font-arabic text-right">
                  <Target className="h-5 w-5" />
                  رؤيتنا
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 font-arabic text-right leading-relaxed text-sm">
                  أن نكون الخيار الأول لمحبي الحلويات، ونساهم في نشر 
                  ثقافة الحلويات العربية الأصيلة مع لمسة عصرية مبتكرة.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 bg-white mobile-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-blue-800 font-arabic text-right">
                  <Award className="h-5 w-5" />
                  مهمتنا
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 font-arabic text-right leading-relaxed text-sm">
                  تقديم حلويات ومشروبات عالية الجودة باستخدام أفضل المكونات الطبيعية، مع الحفاظ على 
                  التراث العربي وإضافة الابتكار والإبداع لتلبية احتياجات عملائنا.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-xl font-bold text-blue-800 mb-4 font-arabic text-center">
              لماذا تختارنا؟
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 bg-white mobile-card">
                    <CardContent className="p-4 text-center">
                      <div className="mb-3 mx-auto w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-sm font-semibold text-blue-800 mb-2 font-arabic">
                        {feature.title}
                      </h3>
                      <p className="text-gray-700 font-arabic text-xs leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-6 mobile-card">
            <h2 className="text-xl font-bold mb-4 font-arabic text-center">
              تواصل معنا
            </h2>
            <p className="text-white/90 mb-6 font-arabic text-center text-sm">
              نحن هنا لخدمتكم والإجابة على جميع استفساراتكم
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3 text-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <span className="font-arabic font-semibold">اليمن</span>
              </div>
            </div>
          </div>
        </div>
        <SimpleFooter />
      </MobileLayout>
    );
  }

  // Desktop version with unified colors
  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleNavbar />
      
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 font-arabic bg-white/20 text-white">
            من نحن
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-arabic">
            بلا حدود للحلويات
          </h1>
          <p className="text-xl text-white/90 mb-8 font-arabic leading-relaxed max-w-3xl mx-auto">
            متجر متخصص ببيع أفضل الحلويات والمشروبات الطازجة بجودة عالية وطعم استثنائي.
            نسعى لتقديم تجربة مميزة لعملائنا الكرام.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-white">
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

            <Card className="border-2 border-blue-200 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-blue-800 font-arabic text-right">
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
      <section className="py-16 px-4 bg-gray-50">
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
                <Card key={index} className="border-2 border-blue-200 hover:border-blue-300 transition-all duration-300 group bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
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
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 font-arabic">
            تواصل معنا
          </h2>
          <p className="text-lg mb-8 font-arabic opacity-90">
            نحن هنا لخدمتكم والإجابة على جميع استفساراتكم
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 shadow-md">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <span className="font-arabic font-semibold">اليمن</span>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 shadow-md">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <span className="font-arabic font-semibold">خدمة العملاء</span>
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 shadow-md">
                <Users className="h-8 w-8 text-white" />
              </div>
              <span className="font-arabic font-semibold">فريق محترف ومتخصص</span>
            </div>
          </div>
        </div>
      </section>

      <SimpleFooter />
    </div>
  );
};

export default About;
