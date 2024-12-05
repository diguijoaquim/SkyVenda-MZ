import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavigationItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function NavigationItem({ icon: Icon, label, active, onClick }: NavigationItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full h-[45px] rounded-lg flex items-center px-4 gap-3 transition-all duration-300
        ${active 
          ? 'bg-indigo-500 text-white' 
          : 'hover:bg-white/20 text-gray-700'}`}
    >
      <Icon size={20} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}