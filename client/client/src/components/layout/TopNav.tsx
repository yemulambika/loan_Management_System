import { Bell, Search, Moon, Sun, LogOut, User, Menu } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

interface TopNavProps {
  onToggleSidebar: () => void;
}

const TopNav = ({ onToggleSidebar }: TopNavProps) => {
  const { logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="p-2 hover:bg-hover rounded-lg transition-colors">
          <Menu className="w-5 h-5 text-muted" />
        </button>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 hover:bg-hover rounded-lg transition-colors"
        >
          {darkMode ? <Sun className="w-5 h-5 text-muted" /> : <Moon className="w-5 h-5 text-muted" />}
        </button>

        <button className="p-2 hover:bg-hover rounded-lg transition-colors relative">
          <Bell className="w-5 h-5 text-muted" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-border">
          <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <button
            onClick={logout}
            className="p-2 hover:bg-hover rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-muted" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNav;