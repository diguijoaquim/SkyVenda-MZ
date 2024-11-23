import React, { useState } from 'react';
import { FiArrowRight, FiHeart, FiStar, FiClock, FiTag } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function SponsoredProductCard({ product }) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  const handleClick = () => {
    navigate(`/item/${product.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.20, ease: "easeOut" }}
      onClick={handleClick}
      className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg shadow-xl overflow-hidden transform hover:scale-105 hover:translate-y-[-5px] transition-all duration-300 ease-in-out h-full flex flex-col"
    >
      <div className="relative flex-grow">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className={`p-2 rounded-full ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
            } hover:bg-red-600 hover:text-white transition-colors duration-300 shadow-md`}
          >
            <FiHeart className={isLiked ? 'fill-current' : ''} />
          </motion.button>
        </div>
        <div className="absolute top-2 left-2 bg-yellow-400 text-gray-800 px-2 py-1 rounded-full text-xs font-bold flex items-center">
          <FiTag className="mr-1" />
          Patrocinado
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">{product.title}</h3>
          <p className="text-gray-200 text-sm mb-2 line-clamp-2 drop-shadow">{product.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className="fill-current" />
              ))}
              <span className="ml-2 text-white text-sm font-semibold">5.0</span>
            </div>
            <div className="flex items-center text-white text-sm">
              <FiClock className="mr-1" />
              <span>Tempo limitado</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-black" onClick={handleClick}>
        <div className="relative group">
          <div className="absolute -inset-[1px] bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <button className="relative w-full px-6 py-3 bg-black rounded-lg leading-none flex items-center justify-center border border-yellow-400/30 group-hover:border-yellow-400/0 transition-all duration-300 group-hover:bg-yellow-500 group-hover:text-black">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 font-bold text-sm group-hover:text-black group-hover:bg-none">
              ✨ Ver Oferta Exclusiva
            </span>
            <FiArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default SponsoredProductCard;