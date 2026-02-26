import React from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_CLUBS, MOCK_EVENTS } from '../constants';
import { motion } from 'framer-motion';
import { Calendar, Users, Award, Settings, User, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user, myEvents, myClubs } = useAuth();

  const registeredEvents = MOCK_EVENTS.filter(e => myEvents.includes(e.id));
  const joinedClubs = MOCK_CLUBS.filter(c => myClubs.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar - Profile Card */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-3xl p-8 flex flex-col items-center text-center sticky top-28">
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-blue-500 to-purple-600 mb-6">
               <img src={user.avatar} alt="Profile" className="w-full h-full rounded-full bg-white object-cover" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
              {user.role}
            </span>

            <div className="w-full space-y-4 text-left">
              <div className="flex items-center gap-3 text-sm text-gray-600 p-3 rounded-xl bg-white/50">
                 <Mail size={16} />
                 <span className="truncate">{user.email || 'No email provided'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 p-3 rounded-xl bg-white/50">
                 <User size={16} />
                 <span>ID: 2023PECC042</span>
              </div>
            </div>

            <button className="mt-8 w-full py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
              <Settings size={16} /> Edit Profile
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Calendar size={24} /></div>
                <div>
                   <p className="text-2xl font-bold text-gray-900">{registeredEvents.length}</p>
                   <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Events Registered</p>
                </div>
             </div>
             <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Users size={24} /></div>
                <div>
                   <p className="text-2xl font-bold text-gray-900">{joinedClubs.length}</p>
                   <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Clubs Joined</p>
                </div>
             </div>
             <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Award size={24} /></div>
                <div>
                   <p className="text-2xl font-bold text-gray-900">120</p>
                   <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Activity Points</p>
                </div>
             </div>
          </div>

          {/* Schedule Section */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
               <Calendar size={20} className="text-gray-400" /> My Schedule
            </h3>
            {registeredEvents.length > 0 ? (
              <div className="space-y-4">
                {registeredEvents.map((event) => (
                  <div key={event.id} className="glass-card p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                     <div className="flex gap-4">
                        <div className="flex flex-col items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-xl shrink-0">
                           <span className="text-xs font-medium uppercase">{event.date.split(' ')[0]}</span>
                           <span className="text-xl font-bold">{event.date.split(' ')[1].replace(',', '')}</span>
                        </div>
                        <div>
                           <h4 className="font-bold text-lg text-gray-900">{event.title}</h4>
                           <p className="text-sm text-gray-500">{event.time} • {event.location}</p>
                           <span className="inline-block mt-2 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                             {event.category}
                           </span>
                        </div>
                     </div>
                     <button className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium hover:bg-gray-50">
                        View Ticket
                     </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/50 rounded-2xl border border-dashed border-gray-300">
                 <p className="text-gray-500 mb-4">You haven't registered for any events yet.</p>
                 <Link to="/events" className="text-blue-600 font-medium hover:underline">Browse Events</Link>
              </div>
            )}
          </section>

          {/* Clubs Section */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
               <Users size={20} className="text-gray-400" /> My Communities
            </h3>
            {joinedClubs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {joinedClubs.map((club) => (
                   <Link to={`/club/${club.id}`} key={club.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                      <img src={club.image} alt={club.name} className="w-16 h-16 rounded-xl object-cover" />
                      <div>
                         <h4 className="font-bold text-gray-900">{club.name}</h4>
                         <p className="text-xs text-gray-500">{club.category}</p>
                      </div>
                   </Link>
                ))}
              </div>
            ) : (
               <div className="text-center py-12 bg-white/50 rounded-2xl border border-dashed border-gray-300">
                 <p className="text-gray-500 mb-4">You aren't part of any clubs yet.</p>
                 <Link to="/clubs" className="text-blue-600 font-medium hover:underline">Explore Clubs</Link>
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;