import React, { useContext, useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaStore, FaEdit, FaCheckCircle, FaExclamationCircle, FaCreditCard, FaWallet, FaExclamationTriangle } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/api_fecher';
import { Link, useNavigate } from 'react-router-dom';
import WalletCard from '../../components/profile/CardWallet';
import { Navigate, useLocation } from 'react-router-dom';
// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);
function capitalizeFirstLetter(str) {
  if (!str) return ''; // Verifica se a string não está vazia
  return str.charAt(0).toUpperCase() + str.slice(1);
}


// Profile Background Component
const ProfileBackground = () => (
  <div className="absolute inset-0 w-full h-48 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90" />
  </div>
);

// Profile Settings Component
const ProfileSettings = () => {
  const { user } = useContext(AuthContext);
  const [fileImage, setFileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  

  useEffect(() => {
    if (user?.perfil) {
      setPreviewImage(`https://skyvendamz.up.railway.app/perfil/${user.perfil}`);
    }
    
  }, [user]);

  async function handleImageUpload() {
    if (!fileImage) return;

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    const token = localStorage.getItem('auth_token');

    formData.append('file', fileImage);

    try {
      await api.put(
        '/info_usuario/perfil',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json',
          },
        }
      );
      setMessage('Imagem atualizada com sucesso!');
      setFileImage(null);
    } catch (error) {
      setMessage('Erro ao atualizar a imagem. Tente novamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-start space-x-6 mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {previewImage ? (
              <img 
                src={previewImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUser className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 cursor-pointer">
            <FaEdit className="w-4 h-4" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                setFileImage(e.target.files[0]);
                setPreviewImage(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </label>
        </div>

        <div className="flex-grow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{capitalizeFirstLetter(user.username)}</h2>
              <p className="text-gray-500">{user.name}</p>
              <p className="text-gray-500">{user.email}</p>
            </div>
            {fileImage && (
              <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
              onClick={handleImageUpload}
              disabled={!fileImage || loading}
            >
              {loading ? (
                <span>Carregando...</span>
              ) : (
                <>
                  <FaEdit className="w-4 h-4" />
                  <span>Salvar Foto</span>
                </>
              )}
            </button>
            )}
          </div>

          <div className="flex items-center space-x-2 text-sm">
            {user.revisado === "sim" ? (
              <>
                <FaCheckCircle className="text-green-500" />
                <span className="text-green-500">Conta Verificada</span>
              </>
            ) : (
              <>
                <FaExclamationCircle className="text-yellow-500" />
                <span className="text-yellow-500">
                  {user.revisado === "pendente" ? "Pendente de Revisão" : "Não Revisado"}
                </span>
              </>
            )}
          </div>
          
          {message && (
            <div className={`mt-2 text-sm ${message.includes('sucesso') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 border-t pt-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-gray-400" />
            <span className="text-gray-600">Email</span>
          </div>
          <span className="text-gray-800">{user.email}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <FaStore className="text-gray-400" />
            <span className="text-gray-600">Tipo de Conta</span>
          </div>
          <span className="text-gray-800">{user.tipo}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <FaUser className="text-gray-400" />
            <span className="text-gray-600">Seguidores</span>
          </div>
          <span className="text-gray-800">{user.total_seguidores}</span>
        </div>
      </div>
    </div>
  );
};



// Account Status Component
const AccountStatus = ({ status }) => {
  const navigate=useNavigate()
  
  return (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex items-center space-x-3 mb-4">
      <FaExclamationTriangle className="text-yellow-500 w-5 h-5" />
      <h3 className="text-lg font-semibold text-gray-800">Status da Conta</h3>
    </div>
    
    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
      <p className="text-yellow-700">
        Status: <span className="font-semibold">{status}</span>
      </p>
      <p className="text-sm text-yellow-600 mt-2">
        Envie para revisão. Veja mais detalhes em Revisão.
      </p>
    </div>

    <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={()=>{
      navigate('/profile/review')
    }}>
      Enviar para Revisão
    </button>
  </div>
);}

// Profile Content Component
const ProfileContent = ({ walletData }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2">
      <ProfileSettings />
    </div>
    <div className="space-y-6">
      <WalletCard wallet={walletData} />
      <AccountStatus status={walletData.status} />
    </div>
  </div>
);

// Utility function for wallet data
const getWalletData = (user) => ({
  balance: "25,430.50",
  accountId: "SK-2024-0123",
  expiryDate: "03/27",
  status: user.revisado === "sim" 
    ? "Verificada" 
    : user.revisado === "pendente" 
      ? "Em Revisão" 
      : "Não Revisada"
});

// Main Profile Component
function Profile() {
  const { user, loading,isAuthenticated } = useContext(AuthContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  const walletData = getWalletData(user);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="relative">
        <ProfileBackground />
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative z-10 pt-8">
            <h1 className="text-2xl font-bold text-white mb-6">Configurações da Conta</h1>
            <ProfileContent walletData={walletData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;