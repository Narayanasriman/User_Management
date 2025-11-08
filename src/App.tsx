// import { useState, useEffect } from 'react';
// import { Toaster, toast } from 'react-hot-toast';
// import { EmptyState } from './pages/EmptyState';
// import { ListPage } from './pages/ListPage';
// import { AddUserModal } from './components/AddUserModal';
// import { EditUserModal } from './components/EditUserModal';
// import { ViewUserModal } from './components/ViewUserModal';
// import type { User, UserFormData } from './types';
// import { userService } from './services/api';
// import { ViewDetailsModal } from './components/ViewUserModal';

// function App() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [viewUser, setViewUser] = useState<User | null>(null);

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   const loadUsers = async () => {
//     try {
//       const data = await userService.getAllUsers();
//       setUsers(data);
//     } catch (error) {
//       toast.error('Failed to load users');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddUser = async (data: UserFormData) => {
//     try {
//       await userService.createUser({
//         userName: data.userName,
//         userCode: data.userCode,
//         countries: data.countries,
//       });
//       toast.success('User created successfully');
//       await loadUsers();
//     } catch (error) {
//       toast.error('Failed to create user');
//       throw error;
//     }
//   };

//   const handleEditUser = async (data: UserFormData) => {
//     if (!selectedUser) return;
//     try {
//       await userService.updateUser(selectedUser.id, {
//         userName: data.userName,
//         userCode: data.userCode,
//         countries: data.countries,
//       });
//       toast.success('User updated successfully');
//       await loadUsers();
//     } catch (error) {
//       toast.error('Failed to update user');
//       throw error;
//     }
//   };

//   const handleViewUser = (user: User) => {
//     setSelectedUser(user);
//     setIsViewModalOpen(true);
//   };

//   const handleEditFromView = () => {
//     setIsViewModalOpen(false);
//     setIsEditModalOpen(true);
//   };

//   const handleOpenEdit = (user: User) => {
//     setSelectedUser(user);
//     setIsEditModalOpen(true);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-lg font-semibold">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Toaster position="top-right" />
      
//       {users.length === 0 ? (
//         <EmptyState onAddUser={() => setIsAddModalOpen(true)} />
//       ) : (
//        <ListPage
//   users={users}
//   onAddUser={() => setIsAddModalOpen(true)}
//   onViewUser={handleViewUser}
//   onEditUser={handleOpenEdit}
//   onRefresh={loadUsers}  // Add this
// />

//       )}

//       <AddUserModal
//         isOpen={isAddModalOpen}
//         onClose={() => setIsAddModalOpen(false)}
//         onSave={handleAddUser}
//       />

//       <EditUserModal
//         isOpen={isEditModalOpen}
//         onClose={() => {
//           setIsEditModalOpen(false);
//           setSelectedUser(null);
//         }}
//         onSave={handleEditUser}
//         user={selectedUser}
//       />

//       <ViewUserModal
//         isOpen={isViewModalOpen}
//         onClose={() => {
//           setIsViewModalOpen(false);
//           setSelectedUser(null);
//         }}
//         onEdit={handleEditFromView}
//         user={selectedUser}
//       />
//       <ViewDetailsModal
//   isOpen={!!viewUser}
//   onClose={() => setViewUser(null)}
//   onEdit={() => {
//     setEditUser(viewUser);
//     setViewUser(null);
//   }}
//   onAddUser={() => {
//     setViewUser(null);
//     setShowAddModal(true);
//   }}
//   user={viewUser}
// />
//     </>
//   );
// }

// export default App;
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { EmptyState } from './pages/EmptyState';
import { ListPage } from './pages/ListPage';
import { AddUserModal } from './components/AddUserModal';
import { EditUserModal } from './components/EditUserModal';
import { ViewDetailsModal } from './components/ViewUserModal';
import type { User, UserFormData } from './types';
import { userService } from './services/api';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (data: UserFormData) => {
    try {
      await userService.createUser({
        userName: data.userName,
        userCode: data.userCode,
        countries: data.countries,
      });
      toast.success('User created successfully');
      await loadUsers();
    } catch (error) {
      toast.error('Failed to create user');
      throw error;
    }
  };

  const handleEditUser = async (data: UserFormData) => {
    if (!selectedUser) return;
    try {
      await userService.updateUser(selectedUser.id, {
        userName: data.userName,
        userCode: data.userCode,
        countries: data.countries,
      });
      toast.success('User updated successfully');
      await loadUsers();
    } catch (error) {
      toast.error('Failed to update user');
      throw error;
    }
  };

  const handleViewUser = (user: User) => {
    setViewUser(user);
  };

  const handleOpenEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      
      {users.length === 0 ? (
        <EmptyState onAddUser={() => setIsAddModalOpen(true)} />
      ) : (
        <ListPage
          users={users}
          onAddUser={() => setIsAddModalOpen(true)}
          onViewUser={handleViewUser}
          onEditUser={handleOpenEdit}
          onRefresh={loadUsers}
        />
      )}

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddUser}
      />

      {/* Edit User Modal */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        onSave={handleEditUser}
        user={selectedUser}
      />

      {/* View Details Modal */}
      <ViewDetailsModal
        isOpen={!!viewUser}
        onClose={() => setViewUser(null)}
        onEdit={() => {
          setSelectedUser(viewUser);
          setViewUser(null);
          setIsEditModalOpen(true);
        }}
        onAddUser={() => {
          setViewUser(null);
          setIsAddModalOpen(true);
        }}
        user={viewUser}
      />
    </>
  );
}

export default App;
