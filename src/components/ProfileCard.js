import React from 'react';

const ProfileCard = ({ user }) => {
  return (
    <div className="profile-card">
      <div className="user-header">
        <div className="avatar">{user.name.charAt(0)}</div>
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>
      
      <div className="user-details">
        <div className="detail-item">
          <span className="label">User ID:</span>
          <span className="value">{user.id}</span>
        </div>
        <div className="detail-item">
          <span className="label">Name:</span>
          <span className="value">{user.name}</span>
        </div>
        <div className="detail-item">
          <span className="label">Email ID:</span>
          <span className="value">{user.email}</span>
        </div>
        <div className="detail-item">
          <span className="label">Phone:</span>
          <span className="value">{user.phone}</span>
        </div>
        <div className="detail-item">
          <span className="label">Address:</span>
          <span className="value">
            {user.address?.street}, {user.address?.city}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;