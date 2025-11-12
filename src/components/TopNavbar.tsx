import type React from 'react';
import { useState, useEffect } from 'react';
import { ChevronDown, LogOut, User, Settings, HelpCircle, Bell } from 'lucide-react';

interface TopNavbarProps {
  usersCount: number;
  onMenuClick: () => void;
  isCollapsed: boolean;
}

export const TopNavbar: React.FC<TopNavbarProps> = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState<string>('');
  const [notificationCount] = useState(1); 

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      const day = String(now.getDate()).padStart(2, '0');
      const month = now.toLocaleString('en-US', { month: 'short' });
      const year = now.getFullYear();
      const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      
      setCurrentDateTime(`${day}-${month}-${year}, ${time}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-[#939393] border-b border-gray-600 flex items-center justify-end px-6 z-50">
      {/* Right - Date/Time, Icons & Profile */}
      <div className="flex items-center gap-4">
        {/* Date & Time */}
        <div className="text-right">
          <p className="text-sm font-medium text-white">{currentDateTime}</p>
        </div>

        {/* Help Icon (Question Mark) */}
        <button className="p-2 hover:bg-gray-700 rounded-lg transition" title="Help">
          <HelpCircle className="w-5 h-5 text-white" />
        </button>

        {/* Notification Bell with Count Badge */}
        <button className="p-2 hover:bg-gray-700 rounded-lg transition relative" title="Notifications">
          <Bell className="w-5 h-5 text-white" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Vertical Divider */}
        <div className="h-8 w-px bg-white"></div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-700 rounded-lg transition"
          >
            <span className="text-sm font-medium text-white">John Lee</span>
            <ChevronDown
              className={`w-4 h-4 text-white transition ${
                dropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition border-b"
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </a>

              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition border-b"
              >
                <Settings className="w-4 h-4" />
                <span>Account Settings</span>
              </a>

              <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
