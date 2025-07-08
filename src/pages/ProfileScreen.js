import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../services/api';
import ProfileCard from '../components/ProfileCard';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const users = await getUsers();
        if (users.length > 0) {
          setUser(users[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading user:', error);
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);

  if (loading) return <div className="loading">Loading profile...</div>;
  if (!user) return <div className="no-user">No user data available</div>;

  return (
    <div className="profile-screen">
      <header>
        <h1>WiFi</h1>
        <h2>Welcome, {user.name}</h2>
      </header>
      
      <ProfileCard user={user} />
      
      <button 
        className="back-btn"
        onClick={() => navigate('/')}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ProfileScreen;