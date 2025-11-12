import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sidebar } from '../components/Sidebar';
import { TopNavbar } from '../components/TopNavbar';
import { SquareUserRound, Plus, Filter, Search, Columns3 } from 'lucide-react';

interface EmptyStateProps {
  onAddUser: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onAddUser }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar 
        isOpen={sidebarOpen} 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <TopNavbar 
        usersCount={0}
        onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        isCollapsed={sidebarCollapsed}
      />

      <div className={`flex-1 w-full transition-all duration-300 ${sidebarCollapsed ? 'md:ml-0' : ''} overflow-hidden`}>
        {/* Header Component */}
        <div className="bg-white mt-[46px]">
          {/* Breadcrumb with +New Button */}
          <div className="px-6 pt-4 pb-2 border-b border-gray-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <SquareUserRound className="w-5 h-5 text-gray-500" />
                <span className="hover:underline cursor-pointer">Users & Partners</span>
                <span className="text-gray-400">›</span>
                <span className="text-gray-700">Users</span>
              </div>
              <button
                onClick={onAddUser}
                className="flex items-center gap-2 text-sm font-medium text-gray-900 transition hover:opacity-80"
                style={{ 
                  background: '#00438A0F',
                  width: '100px',
                  height: '40px',
                  borderRadius: '9999px',
                  paddingLeft: '16px',
                  paddingRight: '16px',
                }}
              >
                <Plus className="w-4 h-4" />
                New
              </button>
            </div>
          </div>

          {/* Title with Action Icons */}
          <div className="px-6 pt-3 pb-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Users & Partners</h1>
              
              {/* Action Icons */}
              <div className="flex items-center gap-3">
                <button 
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  title="Filter"
                >
                  <Filter className="w-5 h-5 text-gray-700" />
                </button>
                <button 
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                  title="Search"
                >
                  <Search className="w-5 h-5 text-gray-700" />
                </button>
                <button 
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition"
                  title="Columns"
                >
                  <Columns3 className="w-5 h-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">Columns</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tabs - Full Width Border */}
          <div className="border-b border-gray-200">
            <div className="px-6 flex gap-8">
              <button
                onClick={() => setActiveTab('users')}
                className={`pb-3 text-sm font-medium transition relative ${
                  activeTab === 'users'
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Users
                {activeTab === 'users' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                )}
              </button>
              
              <button
                onClick={() => setActiveTab('profile')}
                className={`pb-3 text-sm font-medium transition relative ${
                  activeTab === 'profile'
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Profile
                {activeTab === 'profile' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Empty State Content */}
        <div className="flex items-center justify-center p-4 h-[calc(100vh-250px)]">
          <div className="text-center max-w-xl">
            {/* Smaller Circle with Less Spacing */}
            <div className="relative w-[150px] h-[150px] mx-auto mb-3">
              <div 
                className="w-[150px] h-[150px] rounded-full"
                style={{
                  background: 'linear-gradient(359.82deg, #FFFFFF 26.66%, #BBC5CD 99.85%)',
                  opacity: 1
                }}
              ></div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Create a new user
            </h1>
            
            <p className="text-gray-600 text-sm mb-8 max-w-md mx-auto leading-relaxed">
              Add user details, set permissions, and assign roles to manage access<br />
              within your system.
            </p>
            
            <Button 
              onClick={onAddUser} 
              className="bg-black hover:bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-medium"
            >
              + New User
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
