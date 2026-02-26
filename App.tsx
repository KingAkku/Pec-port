import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import ClubsPage from './pages/ClubsPage';
import DashboardPage from './pages/DashboardPage';
import ClubDetailsPage from './pages/ClubDetailsPage';
import RoleSwitcher from './components/RoleSwitcher';
import { Toaster } from 'react-hot-toast';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen font-sans text-gray-900 selection:bg-gray-900 selection:text-white">
          <Navbar />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/clubs" element={<ClubsPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/club/:id" element={<ClubDetailsPage />} />
            </Routes>
          </main>
          <Footer />
          <RoleSwitcher />
          <Toaster position="bottom-right" toastOptions={{
            className: 'glass-panel !bg-white/90 !text-gray-900 !shadow-lg !rounded-lg',
            duration: 3000,
          }} />
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;