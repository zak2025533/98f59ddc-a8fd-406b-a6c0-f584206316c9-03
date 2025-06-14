
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Trash2, Eye, EyeOff, Video, FileText } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Announcement } from "@/hooks/useAnnouncements";
import { AnnouncementTypeBadge } from "./AnnouncementTypeUtils";

interface AnnouncementTableRowProps {
  announcement: Announcement;
  onEdit: (announcement: Announcement) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
}

const AnnouncementTableRow = ({
  announcement,
  onEdit,
  onDelete,
  onToggleStatus,
}: AnnouncementTableRowProps) => {
  return (
    <TableRow>
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
        <AnnouncementTypeBadge type={announcement.type} />
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
            onClick={() => onToggleStatus(announcement.id, announcement.is_active)}
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
            onClick={() => onEdit(announcement)}
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
                  onClick={() => onDelete(announcement.id)}
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
  );
};

export default AnnouncementTableRow;
