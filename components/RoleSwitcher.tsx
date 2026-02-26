import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Settings, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RoleSwitcher: React.FC = () => {
  const { user, switchRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="glass-panel p-4 rounded-xl mb-4 min-w-[220px]"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Demo Roles</span>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X size={16} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {Object.values(UserRole).map((role) => (
                <button
                  key={role}
                  onClick={() => switchRole(role)}
                  className={`px-3 py-2 text-sm text-left rounded-lg transition-colors flex items-center gap-2
                    ${user.role === role ? 'bg-black text-white' : 'hover:bg-gray-100 text-gray-700'}
                  `}
                >
                  <User size={14} />
                  {role}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 w-12 rounded-full bg-black text-white shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
        title="Switch User Role"
      >
        <Settings size={20} className={isOpen ? "animate-spin" : ""} />
      </button>
    </div>
  );
};

export default RoleSwitcher;