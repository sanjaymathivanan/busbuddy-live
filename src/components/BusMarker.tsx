import { Bus } from "lucide-react";
import { cn } from "@/lib/utils";

interface BusMarkerProps {
  routeNumber: string;
  status: "active" | "delayed" | "offline";
  heading?: number;
  className?: string;
}

const BusMarker = ({ routeNumber, status, heading = 0, className }: BusMarkerProps) => {
  const statusColors = {
    active: "bg-bus-active text-primary-foreground",
    delayed: "bg-bus-delayed text-warning-foreground",
    offline: "bg-bus-offline text-destructive-foreground",
  };

  return (
    <div className={cn("bus-marker", className)}>
      {/* Pulse ring */}
      <div
        className={cn(
          "absolute inset-0 rounded-full animate-ping opacity-30",
          status === "active" && "bg-bus-active",
          status === "delayed" && "bg-bus-delayed",
          status === "offline" && "bg-bus-offline"
        )}
      />
      
      {/* Main marker */}
      <div
        className={cn(
          "relative flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-transform duration-300",
          statusColors[status]
        )}
        style={{ transform: `rotate(${heading}deg)` }}
      >
        <Bus className="w-5 h-5" />
      </div>
      
      {/* Route badge */}
      <div className="absolute -bottom-1 -right-1 bg-card text-foreground text-xs font-bold px-1.5 py-0.5 rounded-md border border-border shadow-md">
        {routeNumber}
      </div>
    </div>
  );
};

export default BusMarker;
