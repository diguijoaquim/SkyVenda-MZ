import React, { memo } from 'react';
import { motion } from 'framer-motion';

const BannerCard = memo(({ id, title, subtitle, bgColor, image, products }) => (
  <div key={id} className="mb-4">
    <div className="flex flex-col lg:flex-row gap-4">
      <div className={`w-full lg:w-[308px] h-[195px] ${bgColor} rounded-lg p-4 cursor-pointer group relative overflow-hidden`}>
        <div className="relative h-full flex flex-col justify-between z-10">
          <div>
            <h2 className="text-2xl sm:text-[28px] font-bold text-white leading-tight">{title}</h2>
            <p className="text-sm text-white/90 mt-1">{subtitle}</p>
          </div>
          <motion.div 
            className="flex items-center text-white"
            initial={{ x: 0 }}
            whileHover={{ x: 8 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-sm mr-2">Ver mais</span>
            <svg 
              className="w-4 h-4 opacity-60" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
              />
            </svg>
          </motion.div>
        </div>
        {image && (
          <div className="absolute right-0 bottom-0 w-[160px] h-[160px]">
            {image}
          </div>
        )}
      </div>

      <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {products}
      </div>
    </div>
  </div>
));

BannerCard.displayName = 'BannerCard';
export default BannerCard;