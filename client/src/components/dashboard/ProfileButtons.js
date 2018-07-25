import React from 'react';
import { Link } from 'react-router-dom';

const ProfileButtons = ({}) => (
  <div className="profile-events">
    <Link to="/edit-profile" className="dash-buttons">
      <p>Edit Profile</p>
    </Link>
    <Link to="/add-media" className="dash-buttons">
      <p>Add Story</p>
    </Link>
  </div>
);

export default ProfileButtons;
