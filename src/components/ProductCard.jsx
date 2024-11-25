import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart, FiEye, FiMapPin } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api_fecher';

function formatPrice(price) {
  return new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' })
    .format(price)
    .replace('MTn', 'MZN');
}

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(product.liked);
  const [likes, setLike] = useState(product.likes);
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

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
    if (isAuthenticated) {
      setIsLiked(!isLiked);
      if (isLiked) {
        const like = likes;
        setLike(like - 1);
      } else {
        const like = likes;
        setLike(like + 1);
      }
      api.post(`/produtos/${product.slug}/like`);
    } else {
      navigate('/login');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-square">
        <img
          src={`https://skyvendamz.up.railway.app/produto/${product.capa}`}
          alt={product.nome}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors duration-300 ${
                isLiked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700'
              }`}
            >
              <FiHeart className={isLiked ? 'fill-current' : ''} />
              <span className="text-xs">{likes}</span>
            </motion.button>
            
            <div className="flex space-x-2">
              <div className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm">
                <FiEye className="text-gray-700" />
                <span className="text-xs text-gray-700">{product.view}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Location Badge */}
        <div className="absolute top-4 left-4 flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <FiMapPin className="text-blue-500" />
          <span className="text-xs font-medium text-gray-700">{product.provincia || 'Maputo'}</span>
        </div>

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            -{product.discount}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">
          {product.nome}
        </h3>

        <div className="flex items-center justify-between mb-3">
          <div className="flex text-yellow-400 space-x-0.5">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={i < Math.floor(product.rating) ? 'fill-current' : ''}
                size={14}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
          </div>
          <span className="text-xs text-gray-500">{product.tempo}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-blue-600">{formatPrice(product.preco)}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 rounded-full hover:from-blue-100 hover:to-purple-100 transition-all duration-300"
          >
            <FiShoppingCart size={14} />
            <span className="text-xs font-medium">Comprar</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;