import React, { useState } from 'react';
import { MOCK_EVENTS } from '../constants';
import { Event, UserRole } from '../types';
import { useAuth } from '../context/AuthContext';
import { Plus, Calendar, MapPin, Clock, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const EventsPage: React.FC = () => {
  const { user, myEvents, toggleEventRegistration } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Event Form State
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    location: '',
    date: '',
    time: '',
    description: '',
    category: 'Technical'
  });

  const categories = ['All', 'Technical', 'Cultural', 'Workshop', 'Seminar'];

  const canCreateEvent = [UserRole.ADMIN, UserRole.FACULTY, UserRole.CLUB_LEAD].includes(user.role);

  const filteredEvents = MOCK_EVENTS.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.clubName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRegister = (id: string, title: string) => {
    if (user.role === UserRole.GUEST) {
      toast.error("Please login (switch role) to register.");
      return;
    }
    const isRegistered = myEvents.includes(id);
    toggleEventRegistration(id);
    
    if (!isRegistered) toast.success(`Registered for ${title}`);
    else toast('Registration cancelled', { icon: 'ℹ️' });
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;
    toast.success("Event created successfully! (Mock)");
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">Upcoming Events</h1>
          <p className="text-gray-500">Discover and participate in workshops, seminars, and fests.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative group w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-900 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search events..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-shadow"
            />
          </div>
          
          {canCreateEvent && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-black transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-gray-900/20"
            >
              <Plus size={18} /> <span className="inline">Create Event</span>
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
              ${selectedCategory === cat 
                ? 'bg-gray-900 text-white shadow-md' 
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => {
          const isRegistered = myEvents.includes(event.id);
          return (
            <motion.div 
              key={event.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-3xl overflow-hidden flex flex-col group"
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2">
                    <span className="text-xs font-bold tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase">
                      {event.clubName}
                    </span>
                    <span className="text-xs font-bold tracking-wider text-gray-600 bg-gray-100 px-3 py-1 rounded-full uppercase">
                      {event.category}
                    </span>
                  </div>
                  {isRegistered && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md flex items-center gap-1">
                      Registered
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                  {event.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar size={16} className="text-gray-400" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock size={16} className="text-gray-400" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin size={16} className="text-gray-400" />
                    {event.location}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 mt-auto">
                <button 
                  onClick={() => handleRegister(event.id, event.title)}
                  className={`w-full py-3 rounded-xl font-medium transition-all duration-200
                    ${isRegistered 
                      ? 'bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500' 
                      : 'bg-gray-900 text-white hover:bg-black shadow-lg shadow-gray-900/10'}
                  `}
                >
                  {isRegistered ? 'Cancel Registration' : 'Register Now'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
         <div className="text-center py-20 text-gray-400">
           <p>No events found matching your search.</p>
         </div>
      )}

      {/* Create Event Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 z-10"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-900"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Event</h2>
              
              <form onSubmit={handleCreateEvent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:outline-none"
                    value={newEvent.title}
                    onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input 
                      type="date" 
                      required
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:outline-none"
                      value={newEvent.date}
                      onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input 
                      type="time" 
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:outline-none"
                      value={newEvent.time}
                      onChange={e => setNewEvent({...newEvent, time: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                   <select 
                     className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:outline-none bg-white"
                     value={newEvent.category}
                     onChange={e => setNewEvent({...newEvent, category: e.target.value as any})}
                   >
                     {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                   </select>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gray-900 text-white font-medium py-3 rounded-xl hover:bg-black transition-colors mt-4"
                >
                  Publish Event
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsPage;