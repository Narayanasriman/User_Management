import type React from 'react';
import { useState } from 'react';
import { Settings, Menu, MonitorCog, X, ChevronDown, SquareMenu, House, Tv, CreditCard, UserRound, SquareUserRound } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onToggle: () => void;
  onCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const [activeMenu, setActiveMenu] = useState('users');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <>
      {/* Menu Button - Top Left (Mobile) */}
      <button
        onClick={onToggle}
        className="fixed top-16 left-4 z-40 p-2 hover:bg-gray-100 rounded-lg transition md:hidden"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar - Narrow with icons only */}
      <div
        className={`fixed md:relative w-16 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 z-40 top-14 h-[calc(100vh-3.5rem)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Profile Circle at Top with Dropdown */}
        <div className="p-2 pb-[14px] border-b border-gray-200">
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center justify-start gap-0.5 p-0.5 hover:bg-gray-100 rounded-lg transition"
            >
              <div className="w-7 h-7 rounded-full bg-gray-500 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-white">JL</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-700 transition flex-shrink-0 ${
                  profileDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute left-full top-0 ml-2 w-52 bg-white border-2 border-gray-300 rounded-lg shadow-2xl z-50">
                <div className="px-4 py-3 bg-gray-50 border-b-2 border-gray-200 rounded-t-lg">
                  <p className="text-sm font-bold text-gray-900">John Lee</p>
                  <p className="text-xs text-gray-600">john@example.com</p>
                </div>
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-800 hover:bg-blue-50 transition border-b border-gray-200"
                >
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>My Profile</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-800 hover:bg-blue-50 transition border-b border-gray-200"
                >
                  <Settings className="w-5 h-5 text-blue-600" />
                  <span>Settings</span>
                </a>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition rounded-b-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {/* Menu */}
          <button
            onClick={() => setActiveMenu('menu')}
            className={`w-full flex items-center justify-center p-2.5 rounded-lg transition relative ${
              activeMenu === 'menu'
                ? 'text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            title="Menu"
          >
            {activeMenu === 'menu' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-black"></div>
            )}
            <div className="flex flex-col items-center">
              <SquareMenu className="w-6 h-6" />
              <span className="text-[9px] mt-0.5">Menu</span>
            </div>
          </button>

          {/* Properties */}
          <button
            onClick={() => setActiveMenu('properties')}
            className={`w-full flex items-center justify-center p-2.5 rounded-lg transition relative ${
              activeMenu === 'properties'
                ? 'text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            title="Properties"
          >
            {activeMenu === 'properties' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-black"></div>
            )}
            <div className="flex flex-col items-center">
              <House className="w-6 h-6" />
              <span className="text-[9px] mt-0.5">Properties</span>
            </div>
          </button>

          {/* TV */}
          <button
            onClick={() => setActiveMenu('tv')}
            className={`w-full flex items-center justify-center p-2.5 rounded-lg transition relative ${
              activeMenu === 'tv'
                ? 'text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            title="TV"
          >
            {activeMenu === 'tv' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-black"></div>
            )}
            <div className="flex flex-col items-center">
              <Tv className="w-6 h-6" />
              <span className="text-[9px] mt-0.5">TV</span>
            </div>
          </button>

          {/* Settings */}
          <button
            onClick={() => setActiveMenu('settings')}
            className={`w-full flex items-center justify-center p-2.5 rounded-lg transition relative ${
              activeMenu === 'settings'
                ? 'text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            title="Settings"
          >
            {activeMenu === 'settings' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-black"></div>
            )}
            <div className="flex flex-col items-center">
              <MonitorCog className="w-6 h-6" />
              <span className="text-[9px] mt-0.5">Settings</span>
            </div>
          </button>

          {/* Cards */}
          <button
            onClick={() => setActiveMenu('cards')}
            className={`w-full flex items-center justify-center p-2.5 rounded-lg transition relative ${
              activeMenu === 'cards'
                ? 'text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            title="Cards"
          >
            {activeMenu === 'cards' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-black"></div>
            )}
            <div className="flex flex-col items-center">
              <CreditCard className="w-6 h-6" />
              <span className="text-[9px] mt-0.5">Cards</span>
            </div>
          </button>

          {/* Profile */}
          <button
            onClick={() => setActiveMenu('profile')}
            className={`w-full flex items-center justify-center p-2.5 rounded-lg transition relative ${
              activeMenu === 'profile'
                ? 'text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            title="Profile"
          >
            {activeMenu === 'profile' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-black"></div>
            )}
            <div className="flex flex-col items-center">
              <UserRound className="w-6 h-6" />
              <span className="text-[9px] mt-0.5">Profile</span>
            </div>
          </button>

          {/* Users - Active */}
          <button
            onClick={() => setActiveMenu('users')}
            className={`w-full flex items-center justify-center p-2.5 rounded-lg transition relative ${
              activeMenu === 'users'
                ? 'text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            title="Users"
          >
            {activeMenu === 'users' && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-black"></div>
            )}
            <div className="flex flex-col items-center">
              <SquareUserRound className="w-6 h-6" />
              <span className="text-[9px] mt-0.5">Users</span>
            </div>
          </button>
        </nav>
      </div>
    </>
  );
};
