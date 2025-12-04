import { cn } from "@/lib/utils";

interface RouteFilterProps {
  routes: string[];
  selectedRoutes: string[];
  onToggle: (route: string) => void;
}

const RouteFilter = ({ routes, selectedRoutes, onToggle }: RouteFilterProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {routes.map((route) => {
        const isSelected = selectedRoutes.includes(route);
        return (
          <button
            key={route}
            onClick={() => onToggle(route)}
            className={cn(
              "flex-shrink-0 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200",
              isSelected
                ? "bg-primary text-primary-foreground shadow-lg glow-primary"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {route}
          </button>
        );
      })}
    </div>
  );
};

export default RouteFilter;
