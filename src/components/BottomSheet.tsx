import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";

interface BottomSheetProps {
  children: React.ReactNode;
  className?: string;
}

const BottomSheet = ({ children, className }: BottomSheetProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.y < -50) {
      setIsExpanded(true);
    } else if (info.offset.y > 50) {
      setIsExpanded(false);
    }
  };

  return (
    <motion.div
      className={cn("bottom-sheet z-50", className)}
      initial={{ y: "60%" }}
      animate={{ y: isExpanded ? "0%" : "60%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
    >
      {/* Handle */}
      <div className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
        <div className="w-12 h-1.5 rounded-full bg-muted-foreground/30" />
      </div>

      {/* Content */}
      <div className="px-4 pb-8 max-h-[80vh] overflow-y-auto">
        {children}
      </div>
    </motion.div>
  );
};

export default BottomSheet;
