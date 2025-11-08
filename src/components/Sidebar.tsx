import type React from 'react';
import { useState } from 'react';
import { Users, BarChart3, FileText, Settings, HelpCircle, Menu, X, } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onToggle: () => void;
  onCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, isCollapsed, onToggle, }) => {
  const [activeMenu, setActiveMenu] = useState('users');

  return (
    <>
      {/* Menu Button - Top Left (Mobile) */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 p-2 hover:bg-gray-100 rounded-lg transition md:hidden"
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

      {/* Sidebar */}
      <div
       className={`fixed md:relative w-48 bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300 z-40 ${
  isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
} ${isCollapsed ? 'md:w-20' : 'md:w-48'}`}


      >
        {/* Top Section */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className={`flex items-center gap-2 ${isCollapsed ? 'hidden' : ''}`}>
            {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            // </div> */}
            {/* <span className="font-semibold text-gray-900">Menu</span> */}
          </div>

          {/* {!isCollapsed && (
            <button
              onClick={onCollapse}
              className="hidden md:block p-1 hover:bg-gray-100 rounded transition"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
          )} */}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 py-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Main</p>
              </div>
            )}

            {/* Users - Active */}
            <button
              onClick={() => setActiveMenu('users')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                activeMenu === 'users'
                  ? 'bg-blue-100 text-blue-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title="Users"
            >
              <Users className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>Users</span>}
            </button>

            {/* Analytics */}
            <button
              onClick={() => setActiveMenu('analytics')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                activeMenu === 'analytics'
                  ? 'bg-blue-100 text-blue-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title="Analytics"
            >
              <BarChart3 className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>Analytics</span>}
            </button>

            {/* Reports */}
            <button
              onClick={() => setActiveMenu('reports')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                activeMenu === 'reports'
                  ? 'bg-blue-100 text-blue-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title="Reports"
            >
              <FileText className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>Reports</span>}
            </button>

            {/* Settings */}
            <button
              onClick={() => setActiveMenu('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                activeMenu === 'settings'
                  ? 'bg-blue-100 text-blue-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title="Settings"
            >
              <Settings className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>Settings</span>}
            </button>
          </div>

          {/* Secondary Menu */}
          <div className={`space-y-1 ${!isCollapsed ? 'pt-4 border-t border-gray-200' : 'pt-2'}`}>
            {!isCollapsed && (
              <div className="px-3 py-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Other</p>
              </div>
            )}

            {/* Documents */}
            <button
              onClick={() => setActiveMenu('documents')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                activeMenu === 'documents'
                  ? 'bg-blue-100 text-blue-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title="Documents"
            >
              <FileText className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>Documents</span>}
            </button>

            {/* Help */}
            <button
              onClick={() => setActiveMenu('help')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                activeMenu === 'help'
                  ? 'bg-blue-100 text-blue-600 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title="Help"
            >
              <HelpCircle className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>Help</span>}
            </button>
          </div>
        </nav>

        {/* Bottom Section - Profile */}
        {/* {!isCollapsed && (
          <div className="p-4 border-t border-gray-200 space-y-3">
            <div className="flex items-center gap-3 p-2">
              <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-blue-700">S</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">Srimanarayana</p>
                <p className="text-xs text-gray-500 truncate">user@example.com</p>
              </div>
            </div>

            <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition text-sm">
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        )} */}
      </div>
    </>
  );
};
