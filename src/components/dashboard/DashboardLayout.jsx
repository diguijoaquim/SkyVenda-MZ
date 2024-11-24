import React, { useEffect, useState } from 'react';
import { FiHome, FiPackage, FiUsers, FiSettings, FiBarChart2, FiMessageSquare, FiBell, FiMenu, FiX, FiPlus } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import PublishProductCard from './PublishProduct';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const location = useLocation();
  const {user}=useContext(AuthContext)

  const menuItems = [
    { icon: FiHome, label: 'Dashboard', path: '/dash' },
    { icon: FiPackage, label: 'Produtos', path: '/dash/products' },
    { icon: FiUsers, label: 'Clientes', path: '/dash/customers' },
    { icon: FiBarChart2, label: 'Análises', path: '/dash/analytics' },
    { icon: FiMessageSquare, label: 'Mensagens', path: '/dash/messages' },
    { icon: FiSettings, label: 'Configurações', path: '/dash/settings' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 animate-pulse-slow mix-blend-overlay opacity-70 bg-gradient-to-tr from-transparent via-purple-100/50 to-transparent" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300 fixed h-full z-30`}
      >
        <div className="p-4 flex justify-between items-center">
          {isSidebarOpen && (
            <span className="text-xl font-bold text-gray-800">SkyVenda</span>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100/80 transition-colors duration-300"
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center py-3 px-4 space-x-4 transition-all duration-300 transform hover:scale-105 hover:translate-x-2 ${
                isActive(item.path)
                  ? 'bg-blue-50/80 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50/80'
              }`}
            >
              <item.icon size={24} className="transition-transform duration-300 group-hover:scale-110" />
              {isSidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm h-16 fixed right-0 left-0 z-20" style={{ left: isSidebarOpen ? '16rem' : '5rem' }}>
          <div className="h-full px-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:bg-gray-100/80 rounded-full transition-all duration-300 hover:scale-110">
                <FiBell size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100/80 rounded-full transition-all duration-300 hover:scale-110">
                <FiMessageSquare size={20} />
              </button>
              <div className="h-8 w-8 bg-blue-500 rounded-full transform transition-transform duration-300 hover:scale-110 cursor-pointer"></div>
            </div>
          </div>
        </header>
        {user && (
          <h1>{user.revisado}</h1>
        )}

        {/* Main Content Area */}
        <main className="pt-16 px-4 min-h-screen">
          {children}
        </main>

        {/* FAB */}
        <button 
          onClick={() => setIsPublishOpen(true)}
          className="fixed right-8 bottom-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110 hover:rotate-180 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <FiPlus size={24} />
        </button>

        {/* Publish Product Card */}
        <PublishProductCard 
          isOpen={isPublishOpen}
          onClose={() => setIsPublishOpen(false)}
        />
      </div>
    </div>
  );
}

export default DashboardLayout;