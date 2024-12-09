import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Store, Home, Package, Users, Settings, LogOut } from 'lucide-react';
import { NavigationItem } from './NavigationItem';
import { UserProfile } from './UserProfile';
import { OfflineIndicator } from './OfflineIndicator';
import { useAuth } from '../context/AuthContext';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { useNavigate } from 'react-router-dom';

export function Sidebar() {
  const { user, isAuthenticated, logout } = useAuth();
  const isOffline = useOnlineStatus();
  const location = useLocation(); // Hook para obter a rota atual

  const [activeItem, setActiveItem] = useState('Início');
  const navigate=useNavigate()

  // Função para atualizar o item ativo
  const handleItemClick = (label) => {
    setActiveItem(label);
  };

  // Desativa tudo se a rota for /profile
  const isProfileRoute = location.pathname === '/profile';

  return (
    <aside className="w-[280px] h-[calc(100vh-66px)] bg-white/30 backdrop-blur-md border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* User Profile */}
        {isAuthenticated && user && <UserProfile user={user} />}

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          <NavigationItem
            icon={Home}
            label="Início"
            active={!isProfileRoute && activeItem === 'Início'}
            onClick={() => navigate('/')}
          />
          <NavigationItem
            icon={Store}
            label="Nhongistas e Lojas"
            active={!isProfileRoute && activeItem === 'Nhongistas e Lojas'}
            onClick={() => navigate('/nhonguistas')}
          />
          <NavigationItem
            icon={Package}
            label="Meus Pedidos"
            active={!isProfileRoute && activeItem === 'Meus Pedidos'}
            onClick={() => navigate('/meuspedidos')}
          />
          <NavigationItem
            icon={Users}
            label="Vendedores"
            active={!isProfileRoute && activeItem === 'Vendedores'}
            onClick={() => navigate('/')}
          />
          <NavigationItem
            icon={Settings}
            label="Configurações"
            active={!isProfileRoute && activeItem === 'Configurações'}
            onClick={() => navigate('/')}
          />
        </nav>

        {/* Logout */}
        {isAuthenticated && (
          <div className="p-2">
            <NavigationItem 
              icon={LogOut} 
              label="Sair" 
              onClick={logout} 
            />
          </div>
        )}

        {/* Offline Status */}
        {isOffline && <OfflineIndicator />}
      </div>
    </aside>
  );
}
