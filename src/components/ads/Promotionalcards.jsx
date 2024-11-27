import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const SkeletonCard = () => (
  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 shadow-sm animate-pulse">
    <div className="flex justify-between items-center mb-4">
      <div>
        <div className="h-6 w-32 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-48 bg-gray-200 rounded"></div>
      </div>
      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
    </div>

    <div className="grid grid-cols-3 gap-2">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-white rounded-lg p-2">
          <div className="w-full h-24 bg-gray-200 rounded-lg mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

const ProductCard = ({ image, title, price, discount, extra }) => (
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
);

const PromoCard = ({ title, subtitle, bgColor, items }) => (
  <div className={`bg-gradient-to-r ${bgColor} rounded-xl p-4 shadow-sm 
    transition-all duration-300 ease-in-out hover:shadow-lg`}>
    <div className="flex justify-between items-center mb-4">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
      <button className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors">
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>

    <div className="grid grid-cols-3 gap-2">
      {items.map((item, idx) => (
        <ProductCard key={idx} {...item} />
      ))}
    </div>
  </div>
);

const PromotionalCards = () => {
  console.log("PromotionalCards")
  const [loading, setLoading] = useState(true);
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const data = [
      {
        title: "SuperOfertas",
        subtitle: "80% de desconto por tempo limitado",
        bgColor: "from-pink-50 to-red-50",
        items: [
          {
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
            title: "Tênis Esportivo",
            price: "2.45",
            discount: "85%"
          },
          {
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
            title: "Roupas Esportivas",
            price: "4.57",
            discount: "80%"
          },
          {
            image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7",
            title: "Conjunto Infantil",
            price: "0.99",
            discount: "45%"
          }
        ]
      },
      {
        title: "Compre em atacado",
        subtitle: "Itens com valor de atacado",
        bgColor: "from-blue-50 to-purple-50",
        items: [
          {
            image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
            title: "Camiseta Esportiva",
            price: "9.99",
            extra: "2+ unidades, extra 2% off"
          },
          {
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
            title: "Fones Bluetooth",
            price: "8.40",
            extra: "5+ unidades, extra 5% off"
          },
          {
            image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
            title: "Jeans Premium",
            price: "7.11",
            extra: "51% off"
          }
        ]
      }
    ];

    setTimeout(() => {
      setPromotions(data);
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="max-w-screen-lg mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {promotions.map((promo, index) => (
          <PromoCard key={index} {...promo} />
        ))}
      </div>
    </div>
  );
};

export default PromotionalCards;