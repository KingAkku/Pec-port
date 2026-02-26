import { Club, Notice, Event } from './types';

export const CLUBS_LIST: string[] = ["Mulearn", "IEEE", "CSI", "ICFOSS", "IEDC", "YIP"];

export const MOCK_CLUBS: Club[] = [
  {
    id: 'mulearn',
    name: 'Mulearn',
    description: 'A community for peer-to-peer learning and upskilling in technology.',
    fullDescription: 'Mulearn is the campus chapter of the GTech Mulearn initiative. We focus on creating a culture of learning by doing. Our activities include study jams, hackathons, and mentorship programs designed to bridge the gap between industry and academia.',
    category: 'Tech Community',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000',
    memberCount: 154,
    leads: [
      { name: 'Alice Smith', role: 'Campus Lead' },
      { name: 'Bob Jones', role: 'Tech Lead' }
    ]
  },
  {
    id: 'ieee',
    name: 'IEEE',
    description: 'The world\'s largest technical professional organization dedicated to advancing technology.',
    fullDescription: 'The IEEE Student Branch at PEC is committed to providing students with opportunities to grow technically and professionally. We organize conferences, technical talks, and industrial visits.',
    category: 'Professional Body',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1000',
    memberCount: 89,
    leads: [
      { name: 'Sarah Lee', role: 'Chair' }
    ]
  },
  {
    id: 'csi',
    name: 'CSI',
    description: 'Computer Society of India - promoting research and knowledge sharing.',
    fullDescription: 'CSI PEC Student Chapter focuses on research and development in Computer Science. We host coding competitions and research seminars.',
    category: 'Professional Body',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000',
    memberCount: 65,
  },
  {
    id: 'icfoss',
    name: 'ICFOSS',
    description: 'International Centre for Free and Open Source Software.',
    fullDescription: 'Promoting the philosophy of Free and Open Source Software (FOSS). We conduct Linux install fests and contribution workshops.',
    category: 'Open Source',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000',
    memberCount: 42,
  },
  {
    id: 'iedc',
    name: 'IEDC',
    description: 'Innovation and Entrepreneurship Development Centre.',
    fullDescription: 'IEDC works to cultivate an innovation culture. We support startups, provide incubation support, and help students convert ideas into products.',
    category: 'Entrepreneurship',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000',
    memberCount: 112,
  },
  {
    id: 'yip',
    name: 'YIP',
    description: 'Young Innovators Programme - fostering innovation among youth.',
    fullDescription: 'YIP is a government initiative to find and mentor young talent. We provide guidance for the YIP challenge and other state-level innovation contests.',
    category: 'Innovation',
    image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=1000',
    memberCount: 30,
  }
];

export const MOCK_NOTICES: Notice[] = [
  { id: '1', title: 'Semester Exam Registration', date: 'Oct 24, 2023', type: 'urgent', content: 'Final date for registration is Oct 30th.' },
  { id: '2', title: 'Tech Fest "Ignite" Announced', date: 'Oct 22, 2023', type: 'info', content: 'Prepare for the biggest tech fest of the year.' },
  { id: '3', title: 'Library Hours Extended', date: 'Oct 20, 2023', type: 'academic', content: 'Library will remain open until 8 PM during study week.' },
  { id: '4', title: 'Scholarship Applications Open', date: 'Oct 18, 2023', type: 'info', content: 'Merit-based scholarships available for 3rd years.' },
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Hack The Future',
    date: 'Nov 12, 2023',
    time: '09:00 AM',
    location: 'Main Auditorium',
    clubId: 'mulearn',
    clubName: 'Mulearn',
    description: '24-hour hackathon focused on AI and sustainability.',
    tags: ['Hackathon', 'AI', 'Coding'],
    isRegistered: false,
    category: 'Technical'
  },
  {
    id: 'e2',
    title: 'IEEE Global Summit',
    date: 'Nov 15, 2023',
    time: '10:00 AM',
    location: 'Seminar Hall 1',
    clubId: 'ieee',
    clubName: 'IEEE',
    description: 'Networking event with industry leaders.',
    tags: ['Networking', 'Seminar'],
    isRegistered: false,
    category: 'Seminar'
  },
  {
    id: 'e3',
    title: 'Startup Pitch Day',
    date: 'Nov 20, 2023',
    time: '02:00 PM',
    location: 'Incubation Center',
    clubId: 'iedc',
    clubName: 'IEDC',
    description: 'Pitch your startup ideas to investors.',
    tags: ['Startup', 'Pitch'],
    isRegistered: true,
    category: 'Workshop'
  },
  {
    id: 'e4',
    title: 'Cultural Night',
    date: 'Nov 25, 2023',
    time: '05:00 PM',
    location: 'Open Air Theatre',
    clubId: 'gen',
    clubName: 'Arts Club',
    description: 'A night of music, dance, and celebration.',
    tags: ['Music', 'Dance'],
    isRegistered: false,
    category: 'Cultural'
  },
  {
    id: 'e5',
    title: 'Python Bootcamp',
    date: 'Dec 01, 2023',
    time: '10:00 AM',
    location: 'Lab 2',
    clubId: 'mulearn',
    clubName: 'Mulearn',
    description: 'Beginner friendly python workshop.',
    tags: ['Python', 'Coding'],
    isRegistered: false,
    category: 'Workshop'
  }
];
