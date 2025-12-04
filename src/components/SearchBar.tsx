import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar = ({ onSearch, className }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "flex items-center gap-3 glass-card rounded-2xl px-4 py-3 transition-all duration-300",
          isFocused && "border-primary/50 glow-primary"
        )}
      >
        <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search routes or stops..."
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
        />
        <button className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center transition-colors hover:bg-secondary/80">
          <SlidersHorizontal className="w-4 h-4 text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
