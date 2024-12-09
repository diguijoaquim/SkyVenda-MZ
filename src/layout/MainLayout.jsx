import React from 'react';
import Header from '../components/Header1';

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
