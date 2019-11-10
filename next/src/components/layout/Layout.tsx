import React from 'react';

import { Header } from './Header';

export const Layout: React.FC<{}> = function Layout({ children }) {
  return (
    <div>
      <Header></Header>
      {children}
    </div>
  );
};
