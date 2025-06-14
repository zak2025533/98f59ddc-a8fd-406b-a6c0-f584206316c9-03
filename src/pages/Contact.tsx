
import SimpleNavbar from "@/components/SimpleNavbar";
import SimpleFooter from "@/components/SimpleFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleNavbar />
      
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-arabic text-gray-800 mb-4">
              اتصل بنا
            </h1>
            <p className="text-lg font-arabic text-gray-600">
              نحن هنا للإجابة على جميع استفساراتكم
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* معلومات التواصل */}
            <div className="space-y-6">
              <Card className="bg-white border-2 border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Phone className="h-8 w-8 text-blue-500 ml-4" />
                    <div>
                      <h3 className="text-lg font-bold font-arabic text-gray-800">الهاتف</h3>
                      <p className="font-arabic text-gray-600">+966 123 456 789</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Mail className="h-8 w-8 text-green-500 ml-4" />
                    <div>
                      <h3 className="text-lg font-bold font-arabic text-gray-800">البريد الإلكتروني</h3>
                      <p className="font-arabic text-gray-600">info@sweets.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <MapPin className="h-8 w-8 text-red-500 ml-4" />
                    <div>
                      <h3 className="text-lg font-bold font-arabic text-gray-800">العنوان</h3>
                      <p className="font-arabic text-gray-600">الرياض، المملكة العربية السعودية</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-purple-500 ml-4" />
                    <div>
                      <h3 className="text-lg font-bold font-arabic text-gray-800">ساعات العمل</h3>
                      <p className="font-arabic text-gray-600">السبت - الخميس: 8:00 ص - 10:00 م</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* نموذج التواصل */}
            <Card className="bg-white border-2 border-gray-200">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold font-arabic text-gray-800 mb-6 text-center">
                  أرسل لنا رسالة
                </h2>
                <form className="space-y-6">
                  <div>
                    <label className="block font-arabic text-gray-700 mb-2">الاسم</label>
                    <Input 
                      type="text" 
                      placeholder="اكتب اسمك هنا"
                      className="w-full border-2 border-gray-300 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-arabic text-gray-700 mb-2">البريد الإلكتروني</label>
                    <Input 
                      type="email" 
                      placeholder="اكتب بريدك الإلكتروني"
                      className="w-full border-2 border-gray-300 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-arabic text-gray-700 mb-2">الموضوع</label>
                    <Input 
                      type="text" 
                      placeholder="موضوع الرسالة"
                      className="w-full border-2 border-gray-300 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-arabic text-gray-700 mb-2">الرسالة</label>
                    <Textarea 
                      placeholder="اكتب رسالتك هنا..."
                      rows={5}
                      className="w-full border-2 border-gray-300 focus:border-blue-500"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-arabic text-lg py-3"
                  >
                    إرسال الرسالة
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <SimpleFooter />
    </div>
  );
};

export default Contact;
