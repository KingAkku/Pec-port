import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
             <div className="flex items-center gap-2">
               <div className="w-6 h-6 rounded bg-gray-900 text-white flex items-center justify-center font-display text-xs">P</div>
               <span className="font-display text-lg text-gray-900">PEC Portal</span>
             </div>
             <p className="text-sm text-gray-500 leading-relaxed">
               College of Engineering Pathanapuram.<br />
               Empowering future engineers through innovation and community.
             </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/" className="hover:text-gray-900 transition-colors">Home</Link></li>
              <li><Link to="/events" className="hover:text-gray-900 transition-colors">Events</Link></li>
              <li><Link to="/clubs" className="hover:text-gray-900 transition-colors">Clubs</Link></li>
            </ul>
          </div>

          {/* Contact / Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>info@pec.ac.in</li>
              <li>+91 475 222 5959</li>
              <li className="pt-2">&copy; {new Date().getFullYear()} PEC Portal. All rights reserved.</li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;