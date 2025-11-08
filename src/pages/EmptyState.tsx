import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { TopNavbar } from '../components/TopNavbar';

interface EmptyStateProps {
  onAddUser: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onAddUser }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
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


      {/* Main Content */}
      <div className={`flex-1 w-full transition-all duration-300 ${sidebarCollapsed ? 'md:ml-0' : ''}`}>
        <div className="flex items-center justify-center p-4 pt-20 min-h-screen">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a new user</h1>
            <p className="text-gray-600 mb-8">
              Add user details, set permissions, and assign countries to manage access within your system.
            </p>
            <Button onClick={onAddUser} size="lg">
              + New User
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
