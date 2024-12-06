import React from 'react';
import { Store, Home, Package, Users, Settings, LogOut } from 'lucide-react';
import { NavigationItem } from './NavigationItem';
import { UserProfile } from './UserProfile';
import { OfflineIndicator } from './OfflineIndicator';
import { useAuth } from '../context/AuthContext';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export function Sidebar() {
  const { user, isAuthenticated, logout } = useAuth();
  const isOffline = useOnlineStatus();

  return (
    <aside className="w-[280px] h-[calc(100vh-66px)] bg-white/30 backdrop-blur-md border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* User Profile */}
        {isAuthenticated && user && <UserProfile user={user} />}

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          <NavigationItem icon={Home} label="Início" active />
          <NavigationItem icon={Store} label="Nhongistas e Lojas" />
          <NavigationItem icon={Package} label="Meus Pedidos" />
          <NavigationItem icon={Users} label="Vendedores" />
          <NavigationItem icon={Settings} label="Configurações" />
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