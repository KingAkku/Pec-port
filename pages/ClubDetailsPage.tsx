import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_CLUBS, MOCK_EVENTS } from '../constants';
import { useAuth } from '../context/AuthContext';
import { Users, Calendar, ArrowLeft, Mail, ExternalLink, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ClubDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, myClubs, joinClub } = useAuth();
  
  const club = MOCK_CLUBS.find(c => c.id === id);
  const clubEvents = MOCK_EVENTS.filter(e => e.clubId === id);
  const isMember = id && myClubs.includes(id);

  if (!club) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900">Club not found</h2>
        <Link to="/clubs" className="text-blue-600 mt-4 hover:underline">Back to Clubs</Link>
      </div>
    );
  }

  const handleJoin = () => {
    if (user.role === 'Guest') {
        toast.error("Please login to join.");
        return;
    }
    if (id) {
        joinClub(id);
        toast.success(`Welcome to ${club.name}!`);
    }
  };

  return (
    <div className="pb-20">
       {/* Hero Section */}
       <div className="relative h-[50vh] w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img src={club.image} alt={club.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 px-6 max-w-7xl mx-auto">
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
             >
               <Link to="/clubs" className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm gap-2 transition-colors">
                 <ArrowLeft size={16} /> Back to Directory
               </Link>
               <span className="block text-white/90 font-bold tracking-widest uppercase text-sm mb-2">{club.category}</span>
               <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">{club.name}</h1>
               <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={handleJoin}
                    className={`px-8 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2
                      ${isMember 
                        ? 'bg-emerald-500 text-white cursor-default' 
                        : 'bg-white text-gray-900 hover:bg-gray-100'}
                    `}
                  >
                    {isMember ? <><Check size={18} /> Member</> : 'Join Community'}
                  </button>
                  <button className="px-8 py-3 rounded-full border border-white/30 text-white font-bold text-sm hover:bg-white/10 backdrop-blur-md transition-all">
                    Visit Website
                  </button>
               </div>
             </motion.div>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
             <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About Us</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {club.fullDescription || club.description}
                </p>
             </section>

             <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                   <Calendar size={24} className="text-gray-400" /> Upcoming Events
                </h2>
                {clubEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {clubEvents.map(event => (
                      <div key={event.id} className="bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                         <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded mb-3 inline-block">{event.category}</span>
                         <h3 className="font-bold text-gray-900 mb-1">{event.title}</h3>
                         <p className="text-sm text-gray-500 mb-4">{event.date}</p>
                         <Link to="/events" className="text-sm font-medium text-gray-900 hover:text-blue-600 underline decoration-gray-300 underline-offset-4">
                           View Details
                         </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                   <p className="text-gray-500 italic">No upcoming events scheduled at the moment.</p>
                )}
             </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
             <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-6">Club Leadership</h3>
                <div className="space-y-4">
                   {club.leads ? club.leads.map((lead, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                            {lead.image ? <img src={lead.image} className="w-full h-full rounded-full" /> : <UserCircleIcon size={20} />}
                         </div>
                         <div>
                            <p className="font-bold text-sm text-gray-900">{lead.name}</p>
                            <p className="text-xs text-gray-500">{lead.role}</p>
                         </div>
                      </div>
                   )) : (
                     <p className="text-sm text-gray-500">Leadership info not available.</p>
                   )}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                   <h4 className="font-bold text-sm text-gray-900 mb-2">Contact</h4>
                   <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
                      <Mail size={14} /> contact@{club.id}.pec.edu
                   </a>
                </div>
             </div>

             <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-3xl text-white">
                <h3 className="font-bold text-xl mb-2">Join the Community</h3>
                <p className="text-gray-300 text-sm mb-6">Connect with {club.memberCount} other students passionate about {club.category}.</p>
                <div className="flex items-center gap-2 text-sm">
                   <Users size={16} /> <span>{club.memberCount} Members</span>
                </div>
             </div>
          </div>

       </div>
    </div>
  );
};

// Helper icon for missing lead images
const UserCircleIcon = ({size}: {size: number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="10" r="3"></circle>
    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
  </svg>
);

export default ClubDetailsPage;