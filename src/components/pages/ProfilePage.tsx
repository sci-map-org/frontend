import React from 'react';
import { useCurrentUser } from '../../hooks/users.hooks';

export const profilePagePath = (unique_name = 'unique_name') => `/profile/:${unique_name}`;

export const ProfilePage: React.FC<{}> = () => {
  const { currentUser } = useCurrentUser();
  return (
    <div>
      <h2>Profile</h2>
      <h3>{!!currentUser && currentUser.email}</h3>
    </div>
  );
};
