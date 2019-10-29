import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/users.hooks';
import { Header } from './Header';

export const Layout: React.FC<{}> = function Layout({ children }) {
  return (
    <Router>
      <Header></Header>
      <div>{children}</div>
    </Router>
  );
};
