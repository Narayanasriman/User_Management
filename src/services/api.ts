// import type {User}  from "../types";

// const API_URL = 'http://localhost:3001';

// export const userService = {
//   async getAllUsers(): Promise<User[]> {
//     const response = await fetch(`${API_URL}/users`);
//     if (!response.ok) throw new Error('Failed to fetch users');
//     return response.json();
//   },

//   async getUserById(id: string): Promise<User> {
//     const response = await fetch(`${API_URL}/users/${id}`);
//     if (!response.ok) throw new Error('Failed to fetch user');
//     return response.json();
//   },

//   async createUser(user: Omit<User, 'id'>): Promise<User> {
//     const response = await fetch(`${API_URL}/users`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(user),
//     });
//     if (!response.ok) throw new Error('Failed to create user');
//     return response.json();
//   },

//   async updateUser(id: string, user: Partial<User>): Promise<User> {
//     const response = await fetch(`${API_URL}/users/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(user),
//     });
//     if (!response.ok) throw new Error('Failed to update user');
//     return response.json();
//   },

//   async deleteUser(id: string): Promise<void> {
//     const response = await fetch(`${API_URL}/users/${id}`, {
//       method: 'DELETE',
//     });
//     if (!response.ok) throw new Error('Failed to delete user');
//   },
// };

// export const getCountries = (): { code: string; name: string }[] => [
//   { code: 'AR', name: 'Argentina' },
//   { code: 'BE', name: 'Belgium' },
//   { code: 'DK', name: 'Denmark' },
//   { code: 'EG', name: 'Egypt' },
//   { code: 'FI', name: 'Finland' },
//   { code: 'DE', name: 'Germany' },
//   { code: 'IS', name: 'Iceland' },
//   { code: 'JP', name: 'Japan' },
//   { code: 'NO', name: 'Norway' },
//   { code: 'SE', name: 'Sweden' },
// ];
import type { User } from "../types";

// Auto-detect: Use JSON Server if available, fallback to localStorage
const API_URL = 'http://localhost:3001';

// localStorage implementation
const STORAGE_KEY = 'users_management_data';

const initializeData = () => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    const initialUsers: User[] = [
      {
        id: '1',
        userName: 'John Doe',
        userCode: 'JD001',
        countries: ['AR', 'BE', 'DK']
      },
      {
        id: '2',
        userName: 'Jane Smith',
        userCode: 'JS002',
        countries: ['EG', 'FI', 'DE']
      },
      {
        id: '3',
        userName: 'Bob Wilson',
        userCode: 'BW003',
        countries: ['IS', 'JP', 'NO']
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialUsers));
  }
};

const getUsers = (): User[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

const saveUsers = (users: User[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Check if JSON Server is available
let useJsonServer = false;

const checkJsonServer = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/users`, { 
      method: 'GET',
      signal: AbortSignal.timeout(2000) // 2 second timeout
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Initialize on first load
(async () => {
  useJsonServer = await checkJsonServer();
  if (useJsonServer) {
    console.log('✅ Using JSON Server');
  } else {
    console.log('ℹ️ Using localStorage (JSON Server not available)');
    initializeData();
  }
})();

// Unified service
export const userService = {
  async getAllUsers(): Promise<User[]> {
    // Try JSON Server first
    if (useJsonServer) {
      try {
        const response = await fetch(`${API_URL}/users`);
        if (response.ok) {
          return response.json();
        }
      } catch (error) {
        console.log('JSON Server unavailable, switching to localStorage');
        useJsonServer = false;
      }
    }

    // Fallback to localStorage
    initializeData();
    await delay(300);
    return getUsers();
  },

  async getUserById(id: string): Promise<User> {
    if (useJsonServer) {
      try {
        const response = await fetch(`${API_URL}/users/${id}`);
        if (response.ok) {
          return response.json();
        }
      } catch (error) {
        useJsonServer = false;
      }
    }

    // Fallback to localStorage
    await delay(200);
    const users = getUsers();
    const user = users.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    return user;
  },

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    if (useJsonServer) {
      try {
        const response = await fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
        if (response.ok) {
          return response.json();
        }
      } catch (error) {
        useJsonServer = false;
      }
    }

    // Fallback to localStorage
    await delay(400);
    const users = getUsers();
    const newUser: User = {
      id: Date.now().toString(),
      ...user
    };
    users.push(newUser);
    saveUsers(users);
    return newUser;
  },

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    if (useJsonServer) {
      try {
        const response = await fetch(`${API_URL}/users/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
        if (response.ok) {
          return response.json();
        }
      } catch (error) {
        useJsonServer = false;
      }
    }

    // Fallback to localStorage
    await delay(400);
    const users = getUsers();
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) {
      throw new Error('User not found');
    }
    
    const updatedUser: User = {
      ...users[index],
      ...userData,
      id
    };
    
    users[index] = updatedUser;
    saveUsers(users);
    return updatedUser;
  },

  async deleteUser(id: string): Promise<void> {
    if (useJsonServer) {
      try {
        const response = await fetch(`${API_URL}/users/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          return;
        }
      } catch (error) {
        useJsonServer = false;
      }
    }

    // Fallback to localStorage
    await delay(300);
    const users = getUsers();
    const filteredUsers = users.filter(u => u.id !== id);
    
    if (users.length === filteredUsers.length) {
      throw new Error('User not found');
    }
    
    saveUsers(filteredUsers);
  },
};

export const getCountries = (): { code: string; name: string }[] => [
  { code: 'AR', name: 'Argentina' },
  { code: 'BE', name: 'Belgium' },
  { code: 'DK', name: 'Denmark' },
  { code: 'EG', name: 'Egypt' },
  { code: 'FI', name: 'Finland' },
  { code: 'DE', name: 'Germany' },
  { code: 'IS', name: 'Iceland' },
  { code: 'JP', name: 'Japan' },
  { code: 'NO', name: 'Norway' },
  { code: 'SE', name: 'Sweden' },
];
