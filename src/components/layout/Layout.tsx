import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Header } from './Header';
import { useCurrentUser } from '../../hooks/users.hooks';

export const Layout: React.FC<{}> = function Layout({ children }) {
  const { currentUser, loading, error } = useCurrentUser();
  return (
    <Router>
      <Header></Header>
      <div>{children}</div>
    </Router>
  );
};
