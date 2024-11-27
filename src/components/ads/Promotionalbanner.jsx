import React, { useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

function PromotionalBannersSkeleton() {
  return (
    <div className="space-y-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {[1, 2].map((item) => (
        <div key={item} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 shadow-sm animate-pulse mb-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Banner Skeleton */}
            <div className="w-full lg:w-[308px]">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="h-6 w-32 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-48 bg-gray-200 rounded"></div>
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>

            {/* Products Grid Skeleton */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((product) => (
                <div key={product} className="bg-white rounded-lg p-2">
                  <div className="w-full h-24 bg-gray-200 rounded-lg mb-2"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PromotionalBanners() {
  const [loading, setLoading] = useState(true);
  console.log("PromotionalBanners")
  const banners = [
    {
      id: 'big-save',
      title: 'Big Save',
      subtitle: 'Grandes marcas, grandes descontos',
      bgColor: 'bg-gradient-to-r from-[#ff4d4d] to-[#ff6b4d]',
      image: '/laptop-watch.png',
      products: [
        {
          image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
          title: "Chinelos Confortáveis",
          price: "0.99",
          originalPrice: "16.42",
          discount: "94%"
        },
        {
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
          title: "Smartwatch Pro",
          price: "4.39",
          originalPrice: "34.27",
          discount: "87%"
        },
        {
          image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
          title: "Tênis Esportivo",
          price: "6.36",
          originalPrice: "34.08",
          discount: "81%"
        },
        {
          image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
          title: "Pelúcia",
          price: "2.60",
          originalPrice: "26.01",
          discount: "90%"
        }
      ]
    },
    {
      id: 'viva',
      title: 'Viva',
      subtitle: 'Ofertas em moda',
      bgColor: 'bg-gradient-to-r from-[#00b3cc] to-[#0099ff]',
      image: '/fashion-banner.jpg',
      products: [
        {
          image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956",
          title: "Vestido Elegante",
          price: "0.99",
          originalPrice: "22.03",
          discount: "95%"
        },
        {
          image: "https://images.unsplash.com/photo-1596703263926-eb0762ee17e4",
          title: "Calça Cargo",
          price: "2.86",
          originalPrice: "26.24",
          discount: "89%"
        },
        {
          image: "https://images.unsplash.com/photo-1548126032-079a0fb0099d",
          title: "Jaqueta Fashion",
          price: "13.03",
          originalPrice: "51.18",
          discount: "75%"
        },
        {
          image: "https://images.unsplash.com/photo-1548126032-079a0fb0099d",
          title: "Blusa Básica",
          price: "0.99",
          originalPrice: "13.97",
          discount: "93%"
        }
      ]
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PromotionalBannersSkeleton />;
  }

  return (
    <div className="space-y-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {banners.map((banner) => (
        <div key={banner.id} className="mb-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className={`w-full lg:w-[308px] h-[195px] ${banner.bgColor} rounded-lg p-4 cursor-pointer group relative overflow-hidden`}>
              <div className="relative h-full flex flex-col justify-between z-10">
                <div>
                  <h2 className="text-2xl sm:text-[28px] font-bold text-white leading-tight">{banner.title}</h2>
                  <p className="text-sm text-white/90 mt-1">{banner.subtitle}</p>
                </div>
                <div className="flex items-center text-white group-hover:translate-x-2 transition-transform">
                  <span className="text-sm mr-2">Ver mais</span>
                  <FiArrowRight className="opacity-60" size={16} />
                </div>
              </div>
              <div className="absolute right-0 bottom-0 w-[160px] h-[160px]">
                {banner.id === 'big-save' && (
                  <div className="relative w-full h-full">
                    <img 
                      src="/laptop.png" 
                      alt="Laptop"
                      className="absolute bottom-[-20px] right-[-20px] w-[120px] transform rotate-[-15deg]"
                    />
                    <img 
                      src="/watch.png" 
                      alt="Watch"
                      className="absolute top-[20px] right-[20px] w-[80px]"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {banner.products.map((product, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-lg cursor-pointer hover:shadow-md transition-all duration-300"
                >
                  <div className="relative">
                    <div className="aspect-square">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    </div>
                    <div className="absolute top-2 right-2 bg-[#ff4d4d] text-white text-[11px] px-1.5 py-0.5 rounded-sm">
                      -{product.discount}
                    </div>
                  </div>
                  <div className="p-2">
                    <h3 className="text-xs text-gray-800 line-clamp-2 mb-1">{product.title}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-[#ff4d4d]">US ${product.price}</span>
                      <span className="text-[11px] text-gray-400 line-through">US ${product.originalPrice}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PromotionalBanners;