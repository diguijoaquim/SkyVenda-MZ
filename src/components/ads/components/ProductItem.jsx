import React, { memo } from 'react';
import { formatPrice } from '../../../utils/formatters';

const ProductItem = memo(({ image, title, price, discount, extra }) => (
  <div className="bg-white rounded-lg p-2 cursor-pointer hover:shadow-md 
    transition-all duration-300 ease-in-out transform hover:-translate-y-1">
    <div className="relative">
      <img
        src={image}
        alt={title}
        className="w-full h-24 object-cover rounded-lg mb-2"
        loading="lazy"
      />
      {discount && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          -{discount}
        </span>
      )}
    </div>
    <h3 className="text-xs font-medium truncate">{title}</h3>
    <div className="flex items-center space-x-2">
      <span className="text-sm font-bold">US ${price}</span>
    </div>
    {extra && (
      <p className="text-xs text-gray-500 mt-1">{extra}</p>
    )}
  </div>
));

ProductItem.displayName = 'ProductItem';
export default ProductItem;