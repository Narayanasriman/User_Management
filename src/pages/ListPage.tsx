import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import {
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Search,
  Filter,
  Columns3,
  Plus,
  SquareUserRound,
} from 'lucide-react';
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

export const ListPage: React.FC<ListPageProps> = ({
  users,
  onAddUser,
  onViewUser,
  onEditUser,
  onRefresh,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('users');
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
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) newSet.delete(userId);
      else newSet.add(userId);
      return newSet;
    });
  };

  const getCountryNames = (codes: string[]) =>
    codes.map((code) => countries.find((c) => c.code === code)?.name || code);

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (window.confirm(`Delete user "${userName}"?`)) {
      try {
        await userService.deleteUser(userId);
        toast.success('User deleted successfully');
        onRefresh();
      } catch {
        toast.error('Failed to delete user');
      }
    }
  };

  // ✅ Functional Search + Filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.userCode &&
        user.userCode.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter =
      filterCountry === 'all' || user.countries.includes(filterCountry);

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

      <div
        className={`flex-1 w-full transition-all duration-300 ${
          sidebarCollapsed ? 'md:ml-0' : ''
        } overflow-hidden`}
      >
        <div className="bg-white mt-[46px]">
          {/* Breadcrumb + New Button */}
          <div className="px-6 pt-4 pb-2 border-b border-gray-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <SquareUserRound className="w-5 h-5 text-gray-500" />
                <span className="hover:underline cursor-pointer">
                  Users & Partners
                </span>
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

          {/* Header + Action Icons */}
          <div className="px-6 pt-3 pb-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                Users & Partners
              </h1>
              <div className="flex items-center gap-3">
                {/* 🔍 Search */}
                {searchOpen ? (
                  <div className="relative w-[220px]">
                    <Input
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 pr-8 h-9 text-sm"
                      autoFocus
                      onBlur={() => !searchTerm && setSearchOpen(false)}
                    />
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
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
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                  >
                    <Search className="w-5 h-5 text-gray-700" />
                  </button>
                )}

                {/* 🌍 Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
                      <Filter className="w-5 h-5 text-gray-700" />
                      {filterCountry !== 'all' && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[10px] rounded-full flex items-center justify-center">
                          1
                        </span>
                      )}
                    </button>
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
                        className={
                          filterCountry === country.code ? 'bg-blue-50' : ''
                        }
                      >
                        {country.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* 📊 Columns */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition">
                      <Columns3 className="w-5 h-5 text-gray-700" />
                      <span className="text-sm font-medium text-gray-700">
                        Columns
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-white">
                    {Object.keys(visibleColumns).map((key) => (
                      <DropdownMenuCheckboxItem
                        key={key}
                        checked={visibleColumns[key as keyof typeof visibleColumns]}
                        onCheckedChange={(checked) =>
                          setVisibleColumns((prev) => ({
                            ...prev,
                            [key]: checked,
                          }))
                        }
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="px-6 flex gap-8">
              {['users', 'profile'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium transition relative ${
                    activeTab === tab
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="p-4 sm:p-6">
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {visibleColumns.userName && (
                        <TableHead>User Name</TableHead>
                      )}
                      {visibleColumns.userCode && (
                        <TableHead>User Code</TableHead>
                      )}
                      {visibleColumns.countries && (
                        <TableHead>Countries</TableHead>
                      )}
                      {visibleColumns.actions && (
                        <TableHead className="text-right">Actions</TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="text-center py-8 text-gray-500 text-sm"
                        >
                          No users found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => {
                        const countryNames = getCountryNames(user.countries);
                        const isExpanded = expandedRows.has(user.id);
                        const displayedCountries = isExpanded
                          ? countryNames
                          : countryNames.slice(0, 3);
                        const remainingCount = countryNames.length - 3;

                        return (
                          <TableRow key={user.id}>
                            {visibleColumns.userName && (
                              <TableCell className="font-medium text-sm">
                                {user.userName.charAt(0).toUpperCase() +
                                  user.userName.slice(1)}
                              </TableCell>
                            )}
                            {visibleColumns.userCode && (
                              <TableCell className="text-sm">
                                {user.userCode || '-'}
                              </TableCell>
                            )}
                            {visibleColumns.countries && (
                              <TableCell>
                                <div className="flex flex-wrap gap-1.5">
                                  {displayedCountries.map((country, index) => (
                                    <Button
                                      key={index}
                                      variant="outline"
                                      size="sm"
                                      className="h-6 px-2 text-[10px] font-normal pointer-events-none capitalize"
                                    >
                                      {country}
                                    </Button>
                                  ))}
                                  {remainingCount > 0 && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        toggleRowExpansion(user.id)
                                      }
                                      className="h-6 px-2 text-[10px] font-semibold bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 cursor-pointer"
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
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 w-7 p-0 hover:bg-gray-100"
                                    >
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    className="w-40 bg-white"
                                  >
                                    <DropdownMenuItem
                                      onClick={() => onViewUser(user)}
                                      className="hover:bg-blue-50 text-sm"
                                    >
                                      <Eye className="w-4 h-4 mr-2 text-blue-600" />
                                      View
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => onEditUser(user)}
                                      className="hover:bg-green-50 text-sm"
                                    >
                                      <Edit className="w-4 h-4 mr-2 text-green-600" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleDeleteUser(user.id, user.userName)
                                      }
                                      className="hover:bg-red-50 text-sm"
                                    >
                                      <Trash2 className="w-4 h-4 mr-2 text-red-600" />
                                      <span className="text-red-600">
                                        Delete
                                      </span>
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
  );
};
