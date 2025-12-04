import { Bell, User } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Track<span className="text-gradient">Bus</span>
        </h1>
        <p className="text-sm text-muted-foreground">Real-time transit tracking</p>
      </div>

      <div className="flex items-center gap-2">
        <button className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center transition-colors hover:bg-secondary/80 relative">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background" />
        </button>
        <button className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center transition-colors hover:bg-primary/90">
          <User className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>
    </header>
  );
};

export default Header;
