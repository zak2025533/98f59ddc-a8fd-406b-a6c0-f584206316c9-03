
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Announcement } from "@/hooks/useAnnouncements";
import AnnouncementTableRow from "./AnnouncementTableRow";

interface AnnouncementsTableProps {
  announcements: Announcement[];
  onEdit: (announcement: Announcement) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
}

const AnnouncementsTable = ({
  announcements,
  onEdit,
  onDelete,
  onToggleStatus,
}: AnnouncementsTableProps) => {
  return (
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
            <AnnouncementTableRow
              key={announcement.id}
              announcement={announcement}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AnnouncementsTable;
