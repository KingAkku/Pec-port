import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User;
  setUser: (user: User) => void;
  switchRole: (role: UserRole) => void;
  myEvents: string[]; // List of Event IDs
  myClubs: string[]; // List of Club IDs
  toggleEventRegistration: (eventId: string) => void;
  joinClub: (clubId: string) => void;
}

const defaultUser: User = {
  id: 'guest_123',
  name: 'Visitor',
  role: UserRole.GUEST,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Visitor',
  email: 'visitor@pec.ac.in'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [myEvents, setMyEvents] = useState<string[]>([]);
  const [myClubs, setMyClubs] = useState<string[]>([]);

  const switchRole = (role: UserRole) => {
    let newUser: User = { ...user, role };
    const seed = Math.random().toString(36).substring(7);
    
    switch (role) {
      case UserRole.ADMIN:
        newUser.name = "Admin User";
        newUser.email = "admin@pec.ac.in";
        newUser.avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
        break;
      case UserRole.FACULTY:
        newUser.name = "Prof. Johnson";
        newUser.email = "johnson@pec.ac.in";
        newUser.avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=Prof`;
        break;
      case UserRole.CLUB_LEAD:
        newUser.name = "Alice (Mulearn Lead)";
        newUser.clubId = 'mulearn';
        newUser.email = "alice@mulearn.org";
        newUser.avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=Alice`;
        break;
      case UserRole.STUDENT:
        newUser.name = "John Doe";
        newUser.email = "john.doe@student.pec.ac.in";
        newUser.avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=John`;
        break;
      default:
        newUser.name = "Visitor";
        newUser.email = "visitor@pec.ac.in";
        newUser.avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=Visitor`;
    }
    setUser(newUser);
  };

  const toggleEventRegistration = (eventId: string) => {
    setMyEvents(prev => 
      prev.includes(eventId) ? prev.filter(id => id !== eventId) : [...prev, eventId]
    );
  };

  const joinClub = (clubId: string) => {
    if (!myClubs.includes(clubId)) {
      setMyClubs(prev => [...prev, clubId]);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, switchRole, myEvents, myClubs, toggleEventRegistration, joinClub }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};