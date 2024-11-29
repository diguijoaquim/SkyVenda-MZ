import React from 'react';
import Header from '../components/Header1';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
