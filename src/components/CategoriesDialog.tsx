
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Grid3X3 } from "lucide-react";
import SimpleCategorySection from "./SimpleCategorySection";

const CategoriesDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-white hover:bg-white/20 relative"
        >
          <Grid3X3 className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center font-arabic">
            أقسامنا المميزة
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <SimpleCategorySection />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoriesDialog;
