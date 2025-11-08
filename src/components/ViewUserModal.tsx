import type React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { User } from '../types';
import { Pencil } from 'lucide-react';
import { getCountries } from '../services/api';

interface ViewDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onAddUser: () => void;
  user: User | null;
}

export const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({ 
  isOpen, 
  onClose, 
  onEdit, 
  onAddUser,
  user 
}) => {
  if (!user) return null;

  const countries = getCountries();
  const getCountryNames = (codes: string[]) => {
    return codes.map((code) => countries.find((c) => c.code === code)?.name || code);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px] w-full min-h-[450px] bg-white border border-gray-200 shadow-xl flex flex-col">
        
        {/* Header */}
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">View Details</DialogTitle>
        </DialogHeader>

        {/* Content - flex-1 to push footer to bottom */}
        <div className="flex-1 py-6">
          <div className="grid grid-cols-2 gap-6">
            {/* User Name */}
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">User Name</label>
              <p className="text-sm font-medium text-gray-900">{user.userName}</p>
            </div>

            {/* User Code */}
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">User Code</label>
              <p className="text-sm font-medium text-gray-900">{user.userCode || '-'}</p>
            </div>
          </div>

          {/* Countries */}
          <div className="mt-6">
            <label className="text-xs text-gray-500 mb-2 block">Countries</label>
            <div className="flex flex-wrap gap-2">
              {getCountryNames(user.countries).map((country, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="h-8 px-3 text-xs font-normal pointer-events-none"
                >
                  {country}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer - at bottom with space-between */}
       {/* Footer - at bottom with space-between */}
{/* Footer - at bottom with space-between */}
<div className="pt-4 border-t flex flex-row justify-between items-center -mx-6 px-6 mt-auto">
  {/* Left side - Add New User */}
  <Button 
    type="button" 
    variant="outline" 
    onClick={onAddUser}
    className="h-10 bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
  >
    + New User
  </Button>
  
  {/* Right side - Cancel & Edit */}
  <div className="flex gap-3">
    <Button 
      type="button" 
      variant="outline" 
      onClick={onClose}
      className="min-w-[100px] h-10 bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300"
    >
      Cancel
    </Button>
    <Button 
      type="button" 
      onClick={onEdit}
      className="min-w-[100px] h-10 bg-green-500 hover:bg-green-700 text-white gap-2"
    >
      <Pencil className="w-4 h-4" />
      Edit
    </Button>
  </div>
</div>


      </DialogContent>
    </Dialog>
  );
};
