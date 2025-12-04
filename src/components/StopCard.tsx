import { MapPin, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Arrival {
  route: string;
  destination: string;
  minutes: number;
  status: "live" | "soon" | "delayed";
}

interface StopCardProps {
  name: string;
  distance: string;
  arrivals: Arrival[];
  onClick?: () => void;
}

const StopCard = ({ name, distance, arrivals, onClick }: StopCardProps) => {
  const getStatusBadge = (status: Arrival["status"], minutes: number) => {
    if (status === "live" && minutes <= 2) {
      return <span className="arrival-badge arrival-badge-live">Now</span>;
    }
    if (status === "delayed") {
      return <span className="arrival-badge arrival-badge-delayed">{minutes} min</span>;
    }
    if (minutes <= 5) {
      return <span className="arrival-badge arrival-badge-soon">{minutes} min</span>;
    }
    return <span className="arrival-badge bg-muted text-muted-foreground">{minutes} min</span>;
  };

  return (
    <button
      onClick={onClick}
      className="w-full glass-card rounded-2xl p-4 text-left transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 active:scale-[0.98]"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{name}</h3>
            <p className="text-xs text-muted-foreground">{distance}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>

      <div className="space-y-2">
        {arrivals.slice(0, 3).map((arrival, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 border-t border-border/50 first:border-0 first:pt-0"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-6 bg-primary text-primary-foreground text-xs font-bold rounded flex items-center justify-center">
                {arrival.route}
              </span>
              <span className="text-sm text-foreground truncate max-w-[140px]">
                {arrival.destination}
              </span>
            </div>
            {getStatusBadge(arrival.status, arrival.minutes)}
          </div>
        ))}
      </div>
    </button>
  );
};

export default StopCard;
