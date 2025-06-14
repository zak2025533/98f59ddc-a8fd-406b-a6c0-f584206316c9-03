import SimpleNavbar from "@/components/SimpleNavbar";
import SimpleFooter from "@/components/SimpleFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send,
  Facebook,
  Instagram,
  Twitter
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // تحقق من البيانات
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    // محاكاة إرسال الرسالة
    toast({
      title: "تم الإرسال بنجاح",
      description: "شكراً لتواصلكم معنا. سنقوم بالرد عليكم في أقرب وقت ممكن.",
    });

    // إعادة تعيين النموذج
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "رقم الهاتف",
      details: ["770006120"],
      color: "text-green-600 bg-green-50"
    },
    {
      icon: Mail,
      title: "البريد الإلكتروني",
      details: ["motahr4742@gmail.com"],
      color: "text-blue-600 bg-blue-50"
    },
    {
      icon: MapPin,
      title: "العنوان",
      details: ["اليمن - محافظة إب"],
      color: "text-purple-600 bg-purple-50"
    },
    {
      icon: Clock,
      title: "ساعات العمل",
      details: ["السبت - الخميس: 8:00 ص - 12:00 م", "الجمعة: 2:00 م - 12:00 م"],
      color: "text-orange-600 bg-orange-50"
    }
  ];

  const socialLinks = [
    { icon: Facebook, name: "فيسبوك", color: "text-blue-600 hover:bg-blue-50" },
    { icon: Instagram, name: "انستقرام", color: "text-pink-600 hover:bg-pink-50" },
    { icon: Twitter, name: "تويتر", color: "text-blue-400 hover:bg-blue-50" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <SimpleNavbar />
      
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 font-arabic">
            تواصل معنا
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-6 font-arabic">
            نحن هنا لخدمتكم
          </h1>
          <p className="text-xl text-gray-600 mb-8 font-arabic max-w-3xl mx-auto">
            لأي استفسار أو طلب خاص، فريقنا المتخصص جاهز للإجابة على جميع أسئلتكم وتقديم أفضل الخدمات
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="border-gray-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-full ${info.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-3 font-arabic">
                      {info.title}
                    </h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 font-arabic text-sm mb-1">
                        {detail}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form and Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-blue-800 font-arabic text-right">
                  <MessageSquare className="h-6 w-6" />
                  أرسل رسالة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      placeholder="الاسم الكامل *"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="font-arabic text-right"
                      required
                    />
                  </div>
                  
                  <div>
                    <Input
                      type="email"
                      placeholder="البريد الإلكتروني *"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="font-arabic text-right"
                      required
                    />
                  </div>
                  
                  <div>
                    <Input
                      type="tel"
                      placeholder="رقم الهاتف"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="font-arabic text-right"
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      placeholder="اكتب رسالتك هنا... *"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="font-arabic text-right min-h-[120px]"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full font-arabic bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Send className="h-4 w-4 ml-2" />
                    إرسال الرسالة
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map and Social Media */}
            <div className="space-y-6">
              {/* Map Placeholder */}
              <Card className="shadow-lg border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-purple-800 font-arabic text-right">
                    <MapPin className="h-6 w-6" />
                    موقعنا
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 font-arabic">خريطة الموقع</p>
                      <p className="text-sm text-gray-500 font-arabic">اليمن - محافظة إب</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="shadow-lg border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-green-800 font-arabic text-right">
                    <MessageSquare className="h-6 w-6" />
                    تابعونا على وسائل التواصل
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <Button
                          key={index}
                          variant="outline"
                          className={`p-4 h-auto flex-col gap-2 ${social.color} border-gray-200`}
                        >
                          <Icon className="h-6 w-6" />
                          <span className="text-xs font-arabic">{social.name}</span>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <SimpleFooter />
    </div>
  );
};

export default Contact;
