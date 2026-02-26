import React, { useState } from 'react';
import { MOCK_CLUBS } from '../constants';
import { Club, UserRole } from '../types';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import ClubCard from '../components/ClubCard';
import { useNavigate } from 'react-router-dom';

const ClubsPage: React.FC = () => {
  const { user, joinClub, myClubs } = useAuth();
  const [clubs, setClubs] = useState<Club[]>(MOCK_CLUBS);
  const navigate = useNavigate();

  const handleJoin = (clubId: string, clubName: string) => {
    if (user.role === UserRole.GUEST) {
      toast.error("Please login to join a club.");
      return;
    }
    if (myClubs.includes(clubId)) {
        toast.success(`You are already a member of ${clubName}`);
        return;
    }
    joinClub(clubId);
    toast.success(`Request to join ${clubName} sent!`);
  };

  const isClubAdmin = (clubId: string) => {
    return user.role === UserRole.ADMIN || (user.role === UserRole.CLUB_LEAD && user.clubId === clubId);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">Student Communities</h1>
        <p className="text-gray-500 text-lg font-light">
          Find your tribe. Join a club to learn, build, and grow with peers who share your passion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
        {clubs.map((club, index) => (
          <div key={club.id} onClick={() => navigate(`/club/${club.id}`)} className="cursor-pointer">
             <ClubCard
                club={club}
                index={index}
                onJoin={(name) => {
                    // Prevent navigation when clicking join button
                    event?.stopPropagation(); 
                    handleJoin(club.id, name);
                }}
                isAdmin={isClubAdmin(club.id)}
                onManage={() => {
                    event?.stopPropagation();
                    toast('Club management dashboard would open here.', { icon: '⚙️' });
                }}
             />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubsPage;