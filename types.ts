export enum UserRole {
  GUEST = 'Guest',
  STUDENT = 'Student',
  FACULTY = 'Faculty',
  CLUB_LEAD = 'Club Lead',
  ADMIN = 'Website Admin'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  clubId?: string; // If club lead
  email?: string;
  avatar?: string;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  memberCount: number;
  fullDescription?: string; // For detail page
  leads?: { name: string; role: string; image?: string }[];
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  clubId: string; // "General" if college-wide
  clubName: string;
  description: string;
  isRegistered?: boolean;
  tags: string[];
  category: 'Technical' | 'Cultural' | 'Workshop' | 'Seminar' | 'Other';
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  type: 'urgent' | 'info' | 'academic';
  content: string;
}
