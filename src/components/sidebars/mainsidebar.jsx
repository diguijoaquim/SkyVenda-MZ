import React from 'react';
import { Store, Home, Package, Users, Settings, LogOut, BarChart2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { AuthContext } from '../../context/AuthContext';
import { useAuth } from '../../context/AuthContext';
import { useContext } from 'react';

const mainNavItems = [
  {
    icon: Home,
    label: "Pagina Inicial",
    route: "/"
  },
  {
    icon: Store,
    label: "Nhongistas e Lojas",
    route: "/nhonguistas"
  },
  {
    icon: Package,
    label: "Meus Produtos",
    route: "/produtos"
  },
  {
    icon: Package,
    label: "Pedidos",
    route: "/pedidos",
    badge: 3
  },
  {
    icon: BarChart2,
    label: "Estatísticas",
    route: "/estatisticas"
  },
  {
    icon: Users,
    label: "Vendedores",
    route: "/vendedores"
  }
];

const footerNavItems = [
  {
    icon: Settings,
    label: "Configurações",
    route: "/settings"
  },
  {
    icon: LogOut,
    label: "Sair",
    onClick: () => console.log('logout'),
    variant: 'destructive'
  }
];

function NavigationItem({ 
  icon: Icon, 
  label, 
  route,
  variant = 'default',
  onClick,
  badge 
}) {
  const location = useLocation();
  const isActive = location.pathname === route;
  const Component = route ? Link : 'button';
  
  return (
    <Component
      to={route}
      onClick={onClick}
      className={cn(
        "w-full h-11 rounded-lg flex items-center px-3 gap-3",
        "transition-all duration-200 relative group/item",
        "hover:bg-[#f2f2f2]",
        isActive && "bg-[#e6f2fe] text-[#0866ff]",
        variant === 'destructive' && "hover:bg-red-50 text-gray-700 hover:text-red-600"
      )}
    >
      <div className="relative flex items-center justify-center w-8 h-8">
        <Icon className={cn(
          "h-[22px] w-[22px]",
          isActive ? "text-[#0866ff]" : "text-[#050505]",
          variant === 'destructive' && "group-hover/item:text-red-600"
        )} />
        
        {badge && (
          <span className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs px-1">
            {badge}
          </span>
        )}
      </div>
      
      <span className={cn(
        "text-[15px] font-medium whitespace-nowrap opacity-0",
        "group-hover/sidebar:opacity-100 transition-opacity duration-300",
        isActive ? "text-[#0866ff]" : "text-[#050505]",
        variant === 'destructive' && "group-hover/item:text-red-600"
      )}>
        {label}
      </span>
      
      <div className={cn(
        "absolute left-16 px-3 py-2 bg-[#1c1e21] text-white text-sm rounded-lg",
        "whitespace-nowrap opacity-0 scale-95 pointer-events-none",
        "transition-all duration-200",
        "group-hover/item:opacity-100 group-hover/item:scale-100",
        "group-hover/sidebar:opacity-0"
      )}>
        {label}
      </div>
    </Component>
  );
}

export function Sidebar() {
  const {user}=useAuth()
  const {isAuthenticated, logout} = useContext(AuthContext);
  return (
    <aside className={cn(
      "w-[70px] hover:w-[280px] h-screen bg-[#ffffff] border-r border-[#e4e6eb]",
      "transition-all duration-300 group/sidebar overflow-hidden",
    )}>
      <div className="flex flex-col h-full">
        {/* Enhanced User Profile */}
        {isAuthenticated && user ? (
          <div className="p-2 mb-2">
          <div className="relative flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="relative">
              <Avatar className="h-10 w-10 ring-2 ring-white">
                <AvatarImage 
                  src={`https://skyvendamz.up.railway.app/perfil/${user.perfil}` || "https://github.com/shadcn.png"} 
                  alt={user?.nome || "User"} 
                />
                <AvatarFallback>
                  {user?.nome?.split(" ").map(n => n[0]).join("").toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <span className={cn(
                "absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white z-10",
                user?.isOnline ? "bg-green-500" : "bg-green-500"
              )} />
            </div>
            
            <div className="flex flex-col min-w-0 opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.name || "SkyVenda MZ"}
                </p>
              </div>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || "user@skyvenda.mz"}
              </p>
            </div>
          </div>
        </div>
        ):(
          <p>Fazer Login</p>
        )}

        {/* Main Navigation */}
        <nav className="flex-1 px-2 space-y-0.5">
          {mainNavItems.map((item) => (
            <NavigationItem 
              key={item.label}
              {...item}
            />
          ))}
        </nav>

        {/* Footer Navigation */}
        <div className="mt-auto px-2 pb-4 space-y-0.5">
          {footerNavItems.map((item) => (
            <NavigationItem 
              key={item.label}
              {...item}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}