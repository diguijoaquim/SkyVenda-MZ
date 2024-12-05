import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiLock,FiMail } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import ProgressRing from '../../components/ProgressRing';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';

export default function RecoveryPasseword() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { getToken, loading, isAuthenticated } = useContext(AuthContext) 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error('Failed to create account');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            SkyVenda MZ
          </h2>
          <p className="mt-2 text-gray-600">Recuperar senha do Skyvenda</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Digite o seu email"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
          >
            {loading ? (
              <div className="w-6 h-6">
                <ProgressRing />
              </div>
            ) : (
              'Recuperar a senha'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}


