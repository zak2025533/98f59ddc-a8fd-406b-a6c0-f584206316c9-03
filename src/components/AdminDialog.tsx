
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Admin from "@/pages/Admin";

const AdminDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-white hover:bg-white/20 relative"
        >
          <User className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>لوحة التحكم</DialogTitle>
        </DialogHeader>
        <div className="w-full h-full">
          <Admin />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminDialog;
