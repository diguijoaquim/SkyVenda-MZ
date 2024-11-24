import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart, FiEye, FiCpu, FiZap, FiMessageCircle, FiMapPin,FiHome,FiBell,FiMenu } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api_fecher';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LayzImage from './img/layzimg';
function formatPrice(price) {
  return new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' })
    .format(price)
    .replace('MTn', 'MZN'); // Substitui MTn por MZN, se necessário
}


function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(product.liked);
  const [likes,setLike]=useState(product.likes)
  const navigate = useNavigate();
  const {isAuthenticated}=useContext(AuthContext)

  const handleAddToCart = (e) => {
    e.stopPropagation();
    toast.success(`${product.nome} adicionado ao carrinho!`);
  };

  const handleClick = () => {
    navigate(`/${product.slug}`);
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(isAuthenticated){
      setIsLiked(!isLiked);
      if(isLiked){
        const like=likes
        setLike(like-1)
      }else{
        const like=likes
        setLike(like+1)
      }
      api.post(`/produtos/${product.slug}/like`)
    }else{
      navigate('/login')
    }
    
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      className="group relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-2xl overflow-hidden cursor-pointer h-[400px]"
    >
      {/* Glowing Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* AI Circuit Pattern */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOHYxMmgxMlYxOEgzNnptMTIgMTJ2MTJoMTJWMzBoLTEyem0wLTI0djEyaDEyVjZoLTEyem0tMjQgMHYxMmgxMlY2SDI0em0wIDI0djEyaDEyVjMwSDI0em0wLTEydjEyaDEyVjE4SDI0eiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] bg-repeat opacity-20" />
      </div>

      {/* Product Image */}
      <div className="relative h-[200px] overflow-hidden">
        <img
            src={`https://skyvendamz.onrender.com/produto/${product.capa}`} 
            alt={product.name}
            className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
          />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
        
        {/* Location Badge */}
        <div className="absolute top-4 left-4 flex items-center space-x-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <FiMapPin className="text-blue-400" />
          <span className="text-xs font-medium text-white">{product.provincia || 'Maputo'}</span>
        </div>

        {/* Engagement Metrics */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`flex items-center  space-x-1 px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors duration-300 z-10 ${
                isLiked ? 'bg-red-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'
              }`}
            >
              <FiHeart className={isLiked ? 'fill-current' : ''} />
              <span className="text-xs">{likes}</span>
            </motion.button>
            <div className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white">
              <FiMessageCircle />
              <span className="text-xs">{product.comentario}</span>
            </div>
            <div className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white">
              <FiEye />
              <span className="text-xs">{product.view}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
              {product.nome}
            </h3>
            <div className="flex items-center mt-1 space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className={i < Math.floor(product.rating) ? 'fill-current' : ''} />
                ))}
              </div>
              <span className="text-sm text-gray-400">({product.rating})</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <FiZap className="text-blue-400" />
            <span className="text-sm font-medium text-blue-400">{product.usuario.nome}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-md font-bold text-white">{formatPrice(product.preco)}</p>
            <p className="text-sm text-gray-400">{product.tempo}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-full transition-all duration-300"
          >
            <FiShoppingCart />
            <span>Comprar</span>
          </motion.button>
        </div>

        
      </div>

      {/* Hover Effect Overlay */}
      <motion.div
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-transparent pointer-events-none"
      />
    </motion.div>
  );
}

export default ProductCard;