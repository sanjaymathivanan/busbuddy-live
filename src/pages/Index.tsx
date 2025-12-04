import { useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import MapView from "@/components/MapView";
import BottomSheet from "@/components/BottomSheet";
import StopCard from "@/components/StopCard";
import RouteFilter from "@/components/RouteFilter";
import { Navigation } from "lucide-react";

const mockStops = [
  {
    name: "Central Station",
    distance: "150m away",
    arrivals: [
      { route: "42", destination: "Airport Terminal", minutes: 2, status: "live" as const },
      { route: "15", destination: "University", minutes: 5, status: "soon" as const },
      { route: "7", destination: "City Center", minutes: 12, status: "delayed" as const },
    ],
  },
  {
    name: "Market Street",
    distance: "320m away",
    arrivals: [
      { route: "23", destination: "North Beach", minutes: 4, status: "live" as const },
      { route: "9", destination: "Downtown", minutes: 8, status: "live" as const },
    ],
  },
  {
    name: "Tech Park",
    distance: "480m away",
    arrivals: [
      { route: "42", destination: "Airport Terminal", minutes: 6, status: "live" as const },
      { route: "15", destination: "University", minutes: 15, status: "live" as const },
    ],
  },
];

const allRoutes = ["42", "15", "7", "23", "9"];

const Index = () => {
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);

  const handleRouteToggle = (route: string) => {
    setSelectedRoutes((prev) =>
      prev.includes(route)
        ? prev.filter((r) => r !== route)
        : [...prev, route]
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-4 relative z-10">
        <Header />
        <SearchBar className="mt-2" />
      </div>

      {/* Map View */}
      <div className="flex-1 relative mt-4">
        <MapView />

        {/* Center on location button */}
        <button className="absolute right-4 bottom-[45%] w-12 h-12 rounded-2xl glass-card flex items-center justify-center transition-all hover:scale-105 active:scale-95 glow-primary">
          <Navigation className="w-5 h-5 text-primary" />
        </button>
      </div>

      {/* Bottom Sheet */}
      <BottomSheet>
        <div className="space-y-4">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Nearby Stops</h2>
            <span className="text-sm text-muted-foreground">{mockStops.length} stops</span>
          </div>

          {/* Route Filters */}
          <RouteFilter
            routes={allRoutes}
            selectedRoutes={selectedRoutes}
            onToggle={handleRouteToggle}
          />

          {/* Stop Cards */}
          <div className="space-y-3">
            {mockStops.map((stop, index) => (
              <StopCard
                key={index}
                name={stop.name}
                distance={stop.distance}
                arrivals={stop.arrivals}
                onClick={() => console.log(`Selected: ${stop.name}`)}
              />
            ))}
          </div>
        </div>
      </BottomSheet>
    </div>
  );
};

export default Index;
