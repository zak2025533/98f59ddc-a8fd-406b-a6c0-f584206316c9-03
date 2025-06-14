
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, Video } from "lucide-react";
import { useAnnouncements, Announcement } from "@/hooks/useAnnouncements";
import { useInternalNotifications } from "@/hooks/useInternalNotifications";
import AnnouncementDialog from "./AnnouncementDialog";
import AnnouncementsTable from "./AnnouncementsTable";

interface AnnouncementsManagementProps {
  onStatsUpdate: () => void;
}

const AnnouncementsManagement = ({ onStatsUpdate }: AnnouncementsManagementProps) => {
  const {
    announcements,
    loading,
    fetchAnnouncements,
    deleteAnnouncement,
    toggleAnnouncementStatus,
  } = useAnnouncements();

  const { sendNotificationForAnnouncement } = useInternalNotifications();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  const handleDelete = async (id: string) => {
    const success = await deleteAnnouncement(id);
    if (success) {
      onStatsUpdate();
    }
  };

  const handleDialogSuccess = async (newAnnouncement?: any) => {
    fetchAnnouncements();
    onStatsUpdate();
    setDialogOpen(false);
    setEditingAnnouncement(null);

    // إرسال إشعار داخلي للإعلان الجديد فقط
    if (newAnnouncement && !editingAnnouncement) {
      sendNotificationForAnnouncement(newAnnouncement);
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
            <AnnouncementsTable
              announcements={announcements}
              onEdit={openEditDialog}
              onDelete={handleDelete}
              onToggleStatus={toggleAnnouncementStatus}
            />
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
