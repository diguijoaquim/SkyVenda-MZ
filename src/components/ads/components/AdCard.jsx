import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const AdCard = memo(({ title, subtitle, bgColor, items, onClick }) => (
  <div className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100
    transition-all duration-300 ease-in-out hover:shadow-lg`}>
    <div className="flex justify-between items-center mb-4">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
      <button 
        onClick={onClick}
        className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors"
      >
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>

    <div className="grid grid-cols-3 gap-2">
      {items}
    </div>
  </div>
));

AdCard.displayName = 'AdCard';
export default AdCard;