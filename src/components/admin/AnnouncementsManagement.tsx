import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Trash2, Eye, EyeOff, Megaphone, Calendar, Tag, Video, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import AnnouncementDialog from "./AnnouncementDialog";

interface Announcement {
  id: string;
  title: string;
  description: string | null;
  type: string;
  product_id: string | null;
  discount_percentage: number | null;
  discount_amount: number | null;
  image_url: string | null;
  video_url: string | null;
  banner_text: string | null;
  is_active: boolean;
  is_banner: boolean | null;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  products?: {
    name: string;
  };
}

interface AnnouncementsManagementProps {
  onStatsUpdate: () => void;
}

const AnnouncementsManagement = ({ onStatsUpdate }: AnnouncementsManagementProps) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('announcements')
        .select(`
          *,
          products:product_id (
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء جلب الإعلانات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف الإعلان بنجاح",
      });

      fetchAnnouncements();
      onStatsUpdate();
    } catch (error) {
      console.error('Error deleting announcement:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف الإعلان",
        variant: "destructive",
      });
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('announcements')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "تم التحديث بنجاح",
        description: `تم ${!currentStatus ? 'تفعيل' : 'إيقاف'} الإعلان بنجاح`,
      });

      fetchAnnouncements();
    } catch (error) {
      console.error('Error toggling announcement status:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث حالة الإعلان",
        variant: "destructive",
      });
    }
  };

  const sendNotificationForAnnouncement = async (announcement: any) => {
    try {
      console.log('Sending notification for announcement:', announcement);
      const { error } = await supabase.functions.invoke('send-push-notification', {
        body: {
          title: 'إعلان جديد!',
          body: announcement.title,
          type: 'announcement',
          related_id: announcement.id
        }
      });

      if (error) {
        console.error('Error sending notification:', error);
      } else {
        console.log('Notification sent successfully');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const handleDialogSuccess = async (newAnnouncement?: any) => {
    fetchAnnouncements();
    onStatsUpdate();
    setDialogOpen(false);
    setEditingAnnouncement(null);

    // إرسال إشعار للإعلان الجديد فقط
    if (newAnnouncement && !editingAnnouncement) {
      await sendNotificationForAnnouncement(newAnnouncement);
    }
  };

  const openEditDialog = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingAnnouncement(null);
    setDialogOpen(true);
  };

  const getTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      general: "إعلان عام",
      discount: "تخفيض",
      promotion: "عرض ترويجي",
      news: "أخبار",
      event: "إعلان مناسبة"
    };
    return types[type] || type;
  };

  const getTypeBadgeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      general: "bg-blue-100 text-blue-800",
      discount: "bg-red-100 text-red-800",
      promotion: "bg-green-100 text-green-800",
      news: "bg-purple-100 text-purple-800",
      event: "bg-orange-100 text-orange-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-arabic text-right">إدارة الإعلانات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="font-arabic text-right flex items-center gap-2">
              <Megaphone className="h-5 w-5" />
              إدارة الإعلانات
            </CardTitle>
            <div className="flex gap-2">
              <Button onClick={openNewDialog} className="font-arabic">
                إضافة إعلان جديد
              </Button>
              <Button 
                onClick={openNewDialog}
                className="font-arabic bg-orange-600 hover:bg-orange-700"
              >
                <Video className="h-4 w-4 ml-2" />
                إضافة إعلان مناسبة
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {announcements.length === 0 ? (
            <div className="text-center py-8">
              <Megaphone className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 font-arabic">لا توجد إعلانات حتى الآن</p>
              <div className="flex gap-2 justify-center mt-4">
                <Button onClick={openNewDialog} className="font-arabic">
                  إضافة أول إعلان
                </Button>
                <Button 
                  onClick={openNewDialog}
                  className="font-arabic bg-orange-600 hover:bg-orange-700"
                >
                  <Video className="h-4 w-4 ml-2" />
                  إضافة إعلان مناسبة
                </Button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right font-arabic">العنوان</TableHead>
                    <TableHead className="text-right font-arabic">النوع</TableHead>
                    <TableHead className="text-right font-arabic">التصنيف</TableHead>
                    <TableHead className="text-right font-arabic">المنتج</TableHead>
                    <TableHead className="text-right font-arabic">التخفيض</TableHead>
                    <TableHead className="text-right font-arabic">الحالة</TableHead>
                    <TableHead className="text-right font-arabic">التاريخ</TableHead>
                    <TableHead className="text-right font-arabic">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {announcements.map((announcement) => (
                    <TableRow key={announcement.id}>
                      <TableCell className="font-arabic text-right">
                        <div>
                          <div className="font-semibold">{announcement.title}</div>
                          {announcement.description && (
                            <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {announcement.description}
                            </div>
                          )}
                          {announcement.banner_text && (
                            <div className="text-xs text-purple-600 mt-1 font-semibold">
                              بانر: {announcement.banner_text}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className={`font-arabic ${getTypeBadgeColor(announcement.type)}`}>
                          {getTypeLabel(announcement.type)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col gap-1">
                          {announcement.is_banner && (
                            <Badge className="bg-purple-100 text-purple-800 font-arabic text-xs">
                              بانر رئيسي
                            </Badge>
                          )}
                          {announcement.video_url && (
                            <Badge className="bg-green-100 text-green-800 font-arabic text-xs flex items-center gap-1">
                              <Video className="h-3 w-3" />
                              {announcement.type === 'event' ? 'فيديو مناسبة' : 'فيديو'}
                            </Badge>
                          )}
                          {announcement.image_url && (
                            <Badge className="bg-blue-100 text-blue-800 font-arabic text-xs flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              صورة
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-arabic text-right">
                        {announcement.products?.name || '-'}
                      </TableCell>
                      <TableCell className="font-arabic text-right">
                        {announcement.discount_percentage ? `${announcement.discount_percentage}%` : 
                         announcement.discount_amount ? `${announcement.discount_amount} ريال` : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={announcement.is_active ? "default" : "secondary"} className="font-arabic">
                          {announcement.is_active ? "نشط" : "غير نشط"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-arabic text-right text-sm">
                        <div>
                          {announcement.start_date && (
                            <div>من: {format(new Date(announcement.start_date), "dd/MM/yyyy", { locale: ar })}</div>
                          )}
                          {announcement.end_date && (
                            <div>إلى: {format(new Date(announcement.end_date), "dd/MM/yyyy", { locale: ar })}</div>
                          )}
                          {!announcement.start_date && !announcement.end_date && (
                            <div>غير محدد</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleActive(announcement.id, announcement.is_active)}
                            className="h-8 w-8 p-0"
                          >
                            {announcement.is_active ? (
                              <EyeOff className="h-4 w-4 text-orange-600" />
                            ) : (
                              <Eye className="h-4 w-4 text-green-600" />
                            )}
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 w-8 p-0"
                            onClick={() => openEditDialog(announcement)}
                          >
                            <Edit className="h-4 w-4 text-blue-600" />
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle className="font-arabic text-right">
                                  تأكيد الحذف
                                </AlertDialogTitle>
                                <AlertDialogDescription className="font-arabic text-right">
                                  هل أنت متأكد من حذف هذا الإعلان؟ لا يمكن التراجع عن هذا الإجراء.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="font-arabic">إلغاء</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(announcement.id)}
                                  className="bg-red-600 hover:bg-red-700 font-arabic"
                                >
                                  حذف
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AnnouncementDialog
        isOpen={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingAnnouncement(null);
        }}
        announcement={editingAnnouncement}
        onSuccess={handleDialogSuccess}
      />
    </>
  );
};

export default AnnouncementsManagement;
