import type React from 'react';
import { useState, useEffect } from 'react';
import { ChevronDown, LogOut, User, Settings, Menu, HelpCircle, Bell } from 'lucide-react';

interface TopNavbarProps {
  usersCount: number;
  onMenuClick: () => void;
  isCollapsed: boolean;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({  onMenuClick, isCollapsed }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      // Format: DD-MMM-YYYY, HH:MM AM/PM
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
    <div
      className={`fixed top-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-20 transition-all duration-300 ${
        isCollapsed ? 'md:left-20' : 'md:left-48'
      } left-0`}
    >
      {/* Left - Menu Icon & Stats */}
      <div className="flex items-center gap-6">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg transition hidden md:block"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>

        <div className="flex flex-col">
         <p className="text-lg font-semibold text-gray-900 uppercase tracking-wide">Users & Partners</p>

          
        </div>
      </div>

      {/* Right - Date/Time, Icons & Profile */}
      <div className="flex items-center gap-6 ml-auto">
        
        {/* Date & Time */}
        <div className="hidden lg:block text-right">
          <p className="text-sm font-semibold text-gray-700">{currentDateTime}</p>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition" title="Help">
            <HelpCircle className="w-5 h-5 text-gray-600" />
          </button>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition relative" title="Notifications">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-blue-700">S</span>
            </div>
            <div className="hidden sm:flex flex-col items-start">
              <p className="text-sm font-semibold text-gray-900">Srimanarayana</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-600 transition ${
                dropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition border-b"
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </a>

              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition border-b"
              >
                <Settings className="w-4 h-4" />
                <span>Account Settings</span>
              </a>

              <button className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition">
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
