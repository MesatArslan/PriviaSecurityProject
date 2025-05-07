import { User } from '../types/user';

// Başlangıç verileri - Türkçe isimlerle
const initialUsers: User[] = [
  {
    id: '1',
    firstName: 'Ahmet',
    lastName: 'Akdoğan',
    email: 'ahmet.akdoğan@example.com',
    phone: '5321234567',
    createdAt: new Date(),
  },
  {
    id: '2',
    firstName: 'Neşe',
    lastName: 'Uslu',
    email: 'neşe.uslu@example.com',
    phone: '5337654321',
    createdAt: new Date(),
  },
  {
    id: '3',
    firstName: 'Yıldırım',
    lastName: 'Korkmaz',
    email: 'yıldırım.korkmaz@example.com',
    phone: '5351234567',
    createdAt: new Date(),
  },
  {
    id: '4',
    firstName: 'Ali',
    lastName: 'Ateş',
    email: 'ali.ateş@example.com',
    phone: '5367654321',
    createdAt: new Date(),
  },
  {
    id: '5',
    firstName: 'Ali',
    lastName: 'Çelik',
    email: 'ali.celik@example.com',
    phone: '5381234567',
    createdAt: new Date(),
  },
  {
    id: '6',
    firstName: 'Zeynep',
    lastName: 'Ateş',
    email: 'zeynep.ateş@example.com',
    phone: '5397654321',
    createdAt: new Date(),
  },
  {
    id: '7',
    firstName: 'Mustafa',
    lastName: 'Arslan',
    email: 'mustafa.arslan@example.com',
    phone: '5301234567',
    createdAt: new Date(),
  },
  {
    id: '8',
    firstName: 'Emine',
    lastName: 'Yıldız',
    email: 'emine.yıldız@example.com',
    phone: '5327654321',
    createdAt: new Date(),
  },
];

// Local storage'dan verileri getir veya başlangıç verilerini kullan
const getInitialUsers = (): User[] => {
  if (typeof window === 'undefined') {
    return initialUsers;
  }
  
  const savedUsers = localStorage.getItem('users');
  if (savedUsers) {
    try {
      // Local storage'dan alınan string verileri parse ederken Date objelerini tekrar oluşturuyoruz
      const parsedUsers = JSON.parse(savedUsers, (key, value) => {
        if (key === 'createdAt') {
          return new Date(value);
        }
        return value;
      });
      return parsedUsers;
    } catch (error) {
      console.error('Failed to parse saved users', error);
      return initialUsers;
    }
  }
  return initialUsers;
};

// Verileri local storage'a kaydet
const saveUsers = (users: User[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('users', JSON.stringify(users));
  }
};

let users: User[] = getInitialUsers();

export const userStore = {
  getUsers: () => users,
  
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => {
    const newUser = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    users = [...users, newUser];
    saveUsers(users);
    return newUser;
  },
  
  updateUser: (user: User) => {
    users = users.map((u) => (u.id === user.id ? user : u));
    saveUsers(users);
    return user;
  },
  
  deleteUser: (id: string) => {
    users = users.filter((user) => user.id !== id);
    saveUsers(users);
  },
}; 