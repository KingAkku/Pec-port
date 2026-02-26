import React from 'react';
import Hero from '../components/Hero';
import { MOCK_NOTICES } from '../constants';
import { Bell, Calendar, Users, ArrowRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      <Hero />

      {/* Digital Noticeboard Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
             <div className="p-2 rounded-full bg-red-50 text-red-600">
               <Activity size={24} />
             </div>
             <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Digital Noticeboard</h2>
          </div>
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_NOTICES.map((notice, index) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between h-full min-h-[200px] border-t-4 border-t-blue-500/50 hover:border-t-blue-500 transition-colors"
            >
               <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md
                      ${notice.type === 'urgent' ? 'bg-red-100 text-red-700' : 
                        notice.type === 'info' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}
                    `}>
                      {notice.type}
                    </span>
                    <span className="text-xs text-gray-400">{notice.date}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 leading-tight">{notice.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-3">{notice.content}</p>
               </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-24 bg-white/50 border-t border-gray-100 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Everything you need, all in one place.</h2>
            <p className="text-gray-500">Access campus resources, join communities, and stay updated with the latest happenings at PEC.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
               whileHover={{ y: -5 }}
               className="p-8 rounded-3xl bg-white shadow-sm border border-gray-100 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <Bell size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Live Notices</h3>
                <p className="text-gray-500 mb-4 text-sm">Real-time updates from administration and departments. Never miss a deadline again.</p>
              </div>
            </motion.div>

            {/* Feature 2 */}
             <motion.div 
               whileHover={{ y: -5 }}
               className="p-8 rounded-3xl bg-white shadow-sm border border-gray-100 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <Calendar size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Event Registration</h3>
                <p className="text-gray-500 mb-4 text-sm">Discover workshops, hackathons, and seminars. One-click registration for students.</p>
                <Link to="/events" className="inline-flex items-center text-sm font-semibold text-purple-600 hover:gap-2 transition-all gap-1">
                  View Events <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            {/* Feature 3 */}
             <motion.div 
               whileHover={{ y: -5 }}
               className="p-8 rounded-3xl bg-white shadow-sm border border-gray-100 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Club Communities</h3>
                <p className="text-gray-500 mb-4 text-sm">Join active technical and cultural clubs. Manage memberships and showcase projects.</p>
                <Link to="/clubs" className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:gap-2 transition-all gap-1">
                   Find a Club <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;