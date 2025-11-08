import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { Eye, Edit, Trash2, MoreVertical, Search, Filter, Columns3 } from 'lucide-react';
import type { User } from '../types';
import { getCountries, userService } from '../services/api';
import { Sidebar } from '../components/Sidebar';
import { TopNavbar } from '../components/TopNavbar';
import { toast } from 'react-hot-toast';

interface ListPageProps {
  users: User[];
  onAddUser: () => void;
  onViewUser: (user: User) => void;
  onEditUser: (user: User) => void;
  onRefresh: () => void;
}

export const ListPage: React.FC<ListPageProps> = ({ users, onAddUser, onViewUser, onEditUser, onRefresh }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [visibleColumns, setVisibleColumns] = useState({
    userName: true,
    userCode: true,
    countries: true,
    actions: true,
  });
  
  const countries = getCountries();

  const toggleRowExpansion = (userId: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const getCountryNames = (codes: string[]) => {
    return codes.map((code) => countries.find((c) => c.code === code)?.name || code);
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (window.confirm(`Delete user "${userName}"?`)) {
      try {
        await userService.deleteUser(userId);
        toast.success('User deleted successfully');
        onRefresh();
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  // Filter and search logic
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.userCode && user.userCode.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterCountry === 'all' || user.countries.includes(filterCountry);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <TopNavbar 
        usersCount={users.length}
        onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        isCollapsed={sidebarCollapsed}
      />

      <div className={`flex-1 w-full transition-all duration-300 ${sidebarCollapsed ? 'md:ml-0' : ''}`}>
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6 pt-20 sm:pt-24 md:pt-20">
          
          {/* Header with New User Button */}
          <div className="flex justify-end items-center mb-4 sm:mb-6">
            <Button 
              onClick={onAddUser} 
              className="bg-blue-500 hover:bg-blue-700 h-9 sm:h-10 text-sm"
            >
              <span className="hidden sm:inline">+ New User</span>
              <span className="sm:hidden">+ Add</span>
            </Button>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            
            {/* Title and Action Bar */}
            <div className="p-4 sm:p-6 border-b">
              {/* Mobile: Stack vertically */}
              <div className="flex flex-col gap-4 lg:hidden">
                {/* Title */}
                <div>
                  <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Users & Partners</h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">{filteredUsers.length} users found</p>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Search */}
                  {searchOpen ? (
                    <div className="relative flex-1 animate-in slide-in-from-right-5 duration-200">
                      <Input
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-8 h-9 text-sm"
                        autoFocus
                        onBlur={() => {
                          if (!searchTerm) {
                            setSearchOpen(false);
                          }
                        }}
                      />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
                      {searchTerm && (
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            setSearchOpen(false);
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="h-9 w-9 p-0"
                      onClick={() => setSearchOpen(true)}
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  )}

                  {/* Filter */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="h-9 w-9 p-0 relative flex-shrink-0">
                        <Filter className="h-4 w-4" />
                        {filterCountry !== 'all' && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[10px] rounded-full flex items-center justify-center">
                            1
                          </span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-white">
                      <DropdownMenuItem 
                        onClick={() => setFilterCountry('all')}
                        className={filterCountry === 'all' ? 'bg-blue-50' : ''}
                      >
                        All Countries
                      </DropdownMenuItem>
                      {countries.map((country) => (
                        <DropdownMenuItem
                          key={country.code}
                          onClick={() => setFilterCountry(country.code)}
                          className={filterCountry === country.code ? 'bg-blue-50' : ''}
                        >
                          {country.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Columns */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="h-9 px-3 flex-shrink-0">
                        <Columns3 className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">Columns</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-white">
                      <DropdownMenuCheckboxItem
                        checked={visibleColumns.userName}
                        onCheckedChange={(checked) => 
                          setVisibleColumns(prev => ({ ...prev, userName: checked }))
                        }
                      >
                        User Name
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={visibleColumns.userCode}
                        onCheckedChange={(checked) => 
                          setVisibleColumns(prev => ({ ...prev, userCode: checked }))
                        }
                      >
                        User Code
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={visibleColumns.countries}
                        onCheckedChange={(checked) => 
                          setVisibleColumns(prev => ({ ...prev, countries: checked }))
                        }
                      >
                        Countries
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Desktop: Single Line */}
              <div className="hidden lg:flex justify-between items-center gap-4">
                <div className="flex-shrink-0">
                  <h1 className="text-2xl font-semibold text-gray-900">Users & Partners</h1>
                  <p className="text-sm text-gray-500 mt-1">{filteredUsers.length} users found</p>
                </div>

                <div className="flex items-center gap-3">
                  {searchOpen ? (
                    <div className="relative animate-in slide-in-from-right-5 duration-200" style={{ width: '300px' }}>
                      <Input
                        placeholder="Search by name or code..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-8 h-10"
                        autoFocus
                        onBlur={() => {
                          if (!searchTerm) {
                            setSearchOpen(false);
                          }
                        }}
                      />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      {searchTerm && (
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            setSearchOpen(false);
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="h-10 w-10 p-0"
                      onClick={() => setSearchOpen(true)}
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="h-10 w-10 p-0 relative">
                        <Filter className="h-4 w-4" />
                        {filterCountry !== 'all' && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[10px] rounded-full flex items-center justify-center">
                            1
                          </span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-white">
                      <DropdownMenuItem 
                        onClick={() => setFilterCountry('all')}
                        className={filterCountry === 'all' ? 'bg-blue-50' : ''}
                      >
                        All Countries
                      </DropdownMenuItem>
                      {countries.map((country) => (
                        <DropdownMenuItem
                          key={country.code}
                          onClick={() => setFilterCountry(country.code)}
                          className={filterCountry === country.code ? 'bg-blue-50' : ''}
                        >
                          {country.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="h-10">
                        <Columns3 className="h-4 w-4 mr-2" />
                        Columns
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-white">
                      <DropdownMenuCheckboxItem
                        checked={visibleColumns.userName}
                        onCheckedChange={(checked) => 
                          setVisibleColumns(prev => ({ ...prev, userName: checked }))
                        }
                      >
                        User Name
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={visibleColumns.userCode}
                        onCheckedChange={(checked) => 
                          setVisibleColumns(prev => ({ ...prev, userCode: checked }))
                        }
                      >
                        User Code
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={visibleColumns.countries}
                        onCheckedChange={(checked) => 
                          setVisibleColumns(prev => ({ ...prev, countries: checked }))
                        }
                      >
                        Countries
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-4 sm:px-6 pt-3 sm:pt-4">
              <div className="flex gap-2 border-b overflow-x-auto">
                <button className="px-3 sm:px-4 py-2 border-b-2 border-black font-medium text-sm whitespace-nowrap">
                  Users
                </button>
                <button className="px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-900 text-sm whitespace-nowrap">
                  Profile
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="p-4 sm:p-6">
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {visibleColumns.userName && <TableHead className="whitespace-nowrap">User Name</TableHead>}
                        {visibleColumns.userCode && <TableHead className="whitespace-nowrap">User Code</TableHead>}
                        {visibleColumns.countries && <TableHead className="whitespace-nowrap">Countries</TableHead>}
                        {visibleColumns.actions && <TableHead className="text-right whitespace-nowrap">Actions</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8 text-gray-500 text-sm">
                            No users found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredUsers.map((user) => {
                          const countryNames = getCountryNames(user.countries);
                          const isExpanded = expandedRows.has(user.id);
                          const displayedCountries = isExpanded ? countryNames : countryNames.slice(0, 3);
                          const remainingCount = countryNames.length - 3;

                          return (
                            <TableRow key={user.id}>
                              {visibleColumns.userName && (
                                <TableCell className="font-medium text-sm">{user.userName}</TableCell>
                              )}
                              {visibleColumns.userCode && (
                                <TableCell className="text-sm">{user.userCode || '-'}</TableCell>
                              )}
                              {visibleColumns.countries && (
                                <TableCell>
                                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                    {displayedCountries.map((country, index) => (
                                      <Button
                                        key={index}
                                        variant="outline"
                                        size="sm"
                                        className="h-6 sm:h-7 px-2 sm:px-3 text-[10px] sm:text-xs font-normal pointer-events-none"
                                      >
                                        {country}
                                      </Button>
                                    ))}
                                    {remainingCount > 0 && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => toggleRowExpansion(user.id)}
                                        className="h-6 sm:h-7 px-2 sm:px-3 text-[10px] sm:text-xs font-semibold bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 cursor-pointer"
                                      >
                                        {isExpanded ? 'Less' : `+${remainingCount}`}
                                      </Button>
                                    )}
                                  </div>
                                </TableCell>
                              )}
                              {visibleColumns.actions && (
                                <TableCell className="text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm" className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-gray-100">
                                        <MoreVertical className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-40 sm:w-48 bg-white">
                                      <DropdownMenuItem onClick={() => onViewUser(user)} className="cursor-pointer hover:bg-blue-50 text-sm">
                                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-blue-600" />
                                        View
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => onEditUser(user)} className="cursor-pointer hover:bg-green-50 text-sm">
                                        <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-green-600" />
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem 
                                        onClick={() => handleDeleteUser(user.id, user.userName)}
                                        className="cursor-pointer hover:bg-red-50 text-sm"
                                      >
                                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-red-600" />
                                        <span className="text-red-600">Delete</span>
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              )}
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
