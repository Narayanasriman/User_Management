import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ChevronDown } from 'lucide-react';
import type { User, UserFormData, ValidationErrors } from '../types';
import { getCountries } from '../services/api';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: UserFormData) => Promise<void>;
  user: User | null;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, onSave, user }) => {
  const [formData, setFormData] = useState<UserFormData>({
    userName: '',
    userCode: '',
    countries: [],
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        userName: user.userName,
        userCode: user.userCode || '',
        countries: user.countries,
      });
    }
  }, [user, isOpen]);

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!formData.userName.trim()) {
      newErrors.userName = 'User name is required';
    }
    
    if (formData.countries.length === 0) {
      newErrors.countries = 'At least one country must be selected';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Failed to update user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeCountry = (code: string) => {
    setFormData({
      ...formData,
      countries: formData.countries.filter((c) => c !== code),
    });
  };

  const addCountry = (code: string) => {
    if (!formData.countries.includes(code)) {
      setFormData({
        ...formData,
        countries: [...formData.countries, code],
      });
      setSearchTerm('');
      setIsDropdownOpen(false);
    }
  };

  const filteredCountries = getCountries().filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[650px] w-full bg-white border border-gray-200 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          <div>
            <label className="text-sm font-medium mb-1.5 block text-gray-700">User Name</label>
            <Input
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              placeholder="Enter a User Name"
              className={`h-10 ${errors.userName ? 'border-red-500' : ''}`}
            />
            {errors.userName && <p className="text-xs text-red-500 mt-1">{errors.userName}</p>}
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1.5 block text-gray-700">
              Set Code <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <Input
              value={formData.userCode}
              onChange={(e) => setFormData({ ...formData, userCode: e.target.value })}
              placeholder="Short code for reference (e.g., NA, EU)"
              className="h-10"
            />
          </div>
          
          <div className="relative">
            <label className="text-sm font-medium mb-1.5 block text-gray-700">Select Countries</label>
            <div className="relative">
              <Input
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder="Type to search or click dropdown..."
                className={`h-10 pr-12 ${errors.countries ? 'border-red-500' : ''}`}
              />
              <div className="absolute right-0 top-0 h-full flex items-center">
                <div className="h-6 w-px bg-gray-300"></div>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="px-3 py-1 hover:bg-gray-100 rounded transition h-full flex items-center"
                >
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-[250px] overflow-y-auto">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => addCountry(country.code)}
                      className={`w-full text-left px-3 py-2 hover:bg-gray-100 transition ${
                        formData.countries.includes(country.code) ? 'bg-blue-50 text-blue-600' : ''
                      }`}
                    >
                      {country.name}
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500">No countries found</div>
                )}
              </div>
            )}
            
            {formData.countries.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2.5">
                {formData.countries.map((code) => {
                  const country = getCountries().find((c) => c.code === code);
                  return (
                    <Badge key={code} variant="secondary" className="flex items-center gap-1 px-3.5 py-2 bg-gray-300 hover:bg-gray-400 transition">
                      {country?.name}
                      <button
                        type="button"
                        onClick={() => removeCountry(code)}
                        className="ml-1 hover:bg-gray-300 rounded-full p-0.5 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            )}
            {errors.countries && <p className="text-xs text-red-500 mt-1">{errors.countries}</p>}
          </div>
          
          <DialogFooter className="gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="min-w-[100px] h-10"
            >
              Cancel
            </Button>
            <Button 
  type="submit" 
  disabled={isSubmitting}
  className="min-w-[100px] h-10 bg-blue-500 hover:bg-blue-700 text-white"
>
  {isSubmitting ? 'Updating...' : 'Update'}
</Button>

          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
