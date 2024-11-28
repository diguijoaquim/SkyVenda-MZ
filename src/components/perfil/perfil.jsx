import React, { useContext, useState } from 'react';
import { User, Edit, Eye, Mail, Building2, Users } from 'lucide-react';
import ProfileSkeleton from '../skeleton/ProfileSkeleton';
import VerificationBadge from '../skeleton/VerificationBadge';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function GlassCard({ children, className = '' }) {
  return (
    <div className={`backdrop-blur-md bg-white/20 border border-white/30 shadow-lg ${className}`}>
      {children}
    </div>
  );
}

function ProfileAvatar({ imageUrl, name }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-48 h-48 rounded-2xl backdrop-blur-lg bg-white/40 p-2 shadow-lg transform transition-transform duration-300 group-hover:scale-105">
        <div className="w-full h-full rounded-xl overflow-hidden relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center">
              <User className="w-16 h-16 text-white/70" />
            </div>
          )}
          <div className={`absolute inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center gap-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
              <Edit className="w-6 h-6 text-white" />
            </button>
            <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
              <Eye className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileStats({ followers, following }) {
  return (
    <div className="flex space-x-8 mb-6">
      <GlassCard className="text-center px-8 py-4 rounded-xl hover:bg-white/40 transition-all duration-300">
        <div className="font-bold text-3xl text-gray-900">{followers}</div>
        <div className="text-sm font-medium text-gray-700">Seguidores</div>
      </GlassCard>
      <GlassCard className="text-center px-8 py-4 rounded-xl hover:bg-white/40 transition-all duration-300">
        <div className="font-bold text-3xl text-gray-900">{following}</div>
        <div className="text-sm font-medium text-gray-700">Seguindo</div>
      </GlassCard>
    </div>
  );
}

function ProfileDetails({ email, type, isPro }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <GlassCard className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/40 transition-all duration-300">
        <Mail className="w-5 h-5 text-blue-600" />
        <span className="text-gray-700 font-medium">{email}</span>
      </GlassCard>
      <GlassCard className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/40 transition-all duration-300">
        <Building2 className="w-5 h-5 text-blue-600" />
        <span className="text-gray-700 font-medium">{type}</span>
      </GlassCard>
      <GlassCard className="flex items-center space-x-4 p-4 rounded-xl hover:bg-white/40 transition-all duration-300">
        <Users className="w-5 h-5 text-blue-600" />
        <span className="text-gray-700 font-medium">
          {isPro ? 'Conta Profissional' : 'Conta Padrão'}
        </span>
      </GlassCard>
    </div>
  );
}

export default function Profile() {
  const { user,isAuthenticated } = useContext(AuthContext);
  const navigate=useNavigate()
  if (!user) {
    return <ProfileSkeleton />;
  }
  

  const handleVerificationRequest = () => {
    console.log('Requesting verification...');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <GlassCard className="rounded-2xl overflow-hidden">
          <div className="h-80 bg-gradient-to-r from-white/10 to-white/5 relative">
            <div className="absolute inset-0 backdrop-blur-sm"></div>
          </div>

          <div className="relative px-6 sm:px-8 lg:px-10 pb-8">
            <div className="absolute -top-24 left-6 sm:left-10">
              <ProfileAvatar imageUrl={user.perfil} name={user.name} />
            </div>

            <div className="ml-0 sm:ml-52 pt-24 sm:pt-6">
              <div className="flex items-center space-x-4 mb-3">
                <h1 className="text-4xl font-bold text-gray-900">{user.name}</h1>
                <VerificationBadge status={user.revisado} />
              </div>
              <p className="text-gray-600 text-lg mb-8">@{user.username}</p>

              <ProfileStats
                followers={user.total_seguidores}
                following={user.seguidores.length}
              />

              {!user.revisado && (
                <button
                  onClick={handleVerificationRequest}
                  className="px-6 py-3 bg-white/20 backdrop-blur-md text-gray-800 rounded-lg hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2 font-medium"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Solicitar Verificação
                </button>
              )}
            </div>
          </div>

          <div className="px-6 sm:px-8 lg:px-10 py-8 border-t border-white/10">
            <ProfileDetails
              email={user.email}
              type={user.tipo}
              isPro={user.conta_pro}
            />
          </div>
        </GlassCard>
      </div>
    </div>
  );
}