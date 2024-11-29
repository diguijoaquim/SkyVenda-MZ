import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiLock } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import ProgressRing from '../../components/ProgressRing';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';

function BotaoGoogle({ className = '', ...props }) {
    return (
      <button
        className={`w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-medium transition-all duration-300 ${className}`}
        type="button"
        {...props}
      >
        <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
        Entrar com Google
      </button>
    );
  }

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { getToken, loading, isAuthenticated } = useContext(AuthContext) // Removida a chamada duplicada
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await getToken(username, password);
      toast.success('Login successful!');
    } catch (error) {
      console.log("erro ao entrar")
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            SkyVenda MZ
          </h2>
          <p className="mt-2 text-gray-600">Bem-vindo de volta!</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Username"
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Password"
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
              'Entrar'
            )}
          </button>
          
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou continue com</span>
              </div>
              <BotaoGoogle/>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/forgot-password" className="text-blue-600 hover:text-blue-500">
                Esqueceu a senha?
              </Link>
            </div>
            <div className="text-sm">
              <Link to="/signup" className="text-blue-600 hover:text-blue-500">
                Criar conta 
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}


