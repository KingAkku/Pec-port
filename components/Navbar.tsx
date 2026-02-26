import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Calendar, Users, LayoutDashboard, UserCircle } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: LayoutDashboard },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Clubs', path: '/clubs', icon: Users },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out border-b
        ${scrolled 
          ? 'bg-white/80 backdrop-blur-md border-gray-200/50 py-3 shadow-sm' 
          : 'bg-transparent border-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
           <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white font-display font-bold text-lg group-hover:scale-105 transition-transform">
             P
           </div>
           <span className="font-display text-xl tracking-tight text-gray-900">PEC Portal</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 text-sm font-medium transition-colors relative py-1
                  ${isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'}
                `}
              >
                <Icon size={16} className={isActive ? "text-gray-900" : "text-gray-400 group-hover:text-gray-900"} />
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-black rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* User Profile / Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="hidden md:flex items-center gap-3 pl-6 border-l border-gray-200 hover:opacity-80 transition-opacity">
            <div className="text-right">
              <p className="text-xs font-bold text-gray-900">{user.name}</p>
              <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">{user.role}</p>
            </div>
            {user.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-gray-200 bg-gray-100" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600">
                <UserCircle size={20} />
              </div>
            )}
          </Link>

          <button 
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-xl transition-all duration-300 overflow-hidden
          ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium
                ${pathname === link.path ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <link.icon size={18} />
              {link.name}
            </Link>
          ))}
          <Link 
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3"
          >
             {user.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full border border-gray-200 bg-gray-100" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <UserCircle size={24} />
                </div>
              )}
             <div>
                <p className="text-sm font-bold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
             </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;