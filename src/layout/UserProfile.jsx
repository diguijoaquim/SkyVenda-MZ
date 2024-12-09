import React from 'react';
import { useNavigate } from 'react-router-dom';

export function UserProfile({ user }) {
  const navigate=useNavigate()
  return (
    <div className="w-full p-2" onClick={()=>navigate('/profile')}>
      <div className="w-full h-[60px] rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 flex items-center px-4 gap-3">
        <div className="relative">
          <div className="w-9 h-19 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-white p-[2px]">
              <img 
                src={`https://skyvendamz.up.railway.app/perfil/${user.perfil}`}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-800">{user.name}</span>
          <span className="text-xs text-gray-500">Online</span>
        </div>
      </div>
    </div>
  );
}