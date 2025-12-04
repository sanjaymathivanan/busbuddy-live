import { useEffect, useState } from "react";
import BusMarker from "./BusMarker";
import { cn } from "@/lib/utils";

interface Bus {
  id: string;
  route: string;
  lat: number;
  lng: number;
  heading: number;
  status: "active" | "delayed" | "offline";
}

const mockBuses: Bus[] = [
  { id: "1", route: "42", lat: 35, lng: 25, heading: 45, status: "active" },
  { id: "2", route: "15", lat: 55, lng: 65, heading: 120, status: "active" },
  { id: "3", route: "7", lat: 25, lng: 70, heading: 270, status: "delayed" },
  { id: "4", route: "23", lat: 70, lng: 40, heading: 180, status: "active" },
  { id: "5", route: "9", lat: 45, lng: 85, heading: 90, status: "active" },
];

const MapView = () => {
  const [buses, setBuses] = useState(mockBuses);

  // Simulate real-time bus movement
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prev) =>
        prev.map((bus) => ({
          ...bus,
          lat: Math.max(10, Math.min(90, bus.lat + (Math.random() - 0.5) * 3)),
          lng: Math.max(10, Math.min(90, bus.lng + (Math.random() - 0.5) * 3)),
          heading: bus.heading + (Math.random() - 0.5) * 20,
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full map-container overflow-hidden">
      {/* Grid overlay for map effect */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-primary"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Fake streets */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <line x1="0" y1="30%" x2="100%" y2="30%" stroke="hsl(var(--muted-foreground))" strokeWidth="8" />
        <line x1="0" y1="60%" x2="100%" y2="60%" stroke="hsl(var(--muted-foreground))" strokeWidth="6" />
        <line x1="25%" y1="0" x2="25%" y2="100%" stroke="hsl(var(--muted-foreground))" strokeWidth="6" />
        <line x1="70%" y1="0" x2="70%" y2="100%" stroke="hsl(var(--muted-foreground))" strokeWidth="8" />
        <line x1="45%" y1="20%" x2="85%" y2="80%" stroke="hsl(var(--muted-foreground))" strokeWidth="4" />
      </svg>

      {/* Center location indicator */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping" />
          <div className="w-4 h-4 bg-primary rounded-full shadow-lg glow-primary" />
        </div>
      </div>

      {/* Bus markers */}
      {buses.map((bus) => (
        <div
          key={bus.id}
          className="absolute transition-all duration-1000 ease-out cursor-pointer"
          style={{
            left: `${bus.lng}%`,
            top: `${bus.lat}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <BusMarker
            routeNumber={bus.route}
            status={bus.status}
            heading={bus.heading}
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
};

export default MapView;
