import React, { useState, useEffect } from 'react';
import BannerCard from './components/BannerCard';
import ProductItem from './components/ProductItem';
import { motion } from 'framer-motion';

function PromotionalBanners() {
  const [loading, setLoading] = useState(true);
  const banners = [
    {
      id: 'big-save',
      title: 'Big Save',
      subtitle: 'Grandes marcas, grandes descontos',
      bgColor: 'bg-gradient-to-r from-[#ff4d4d] to-[#ff6b4d]',
      image: (
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
      ),
      products: [
        {
          image: "https://www.maisvendas.co.mz/images/listings/2024-11/medThmb/972fd7b0_2185_4cac_839e_a327906ebadajpeg-1732709411-593-e.jpeg",
          title: "Chinelos Confortáveis",
          price: "0.99",
          originalPrice: "16.42",
          discount: "94%"
        },
        {
          image: "https://www.maisvendas.co.mz/images/listings/2024-11/medThmb/972fd7b0_2185_4cac_839e_a327906ebadajpeg-1732709411-593-e.jpeg",
          title: "Smartwatch Pro",
          price: "4.39",
          originalPrice: "34.27",
          discount: "87%"
        },
        {
          image: "https://www.maisvendas.co.mz/images/listings/2024-11/medThmb/972fd7b0_2185_4cac_839e_a327906ebadajpeg-1732709411-593-e.jpeg",
          title: "Tênis Esportivo",
          price: "6.36",
          originalPrice: "34.08",
          discount: "81%"
        },
        {
          image: "https://www.maisvendas.co.mz/images/listings/2024-11/medThmb/972fd7b0_2185_4cac_839e_a327906ebadajpeg-1732709411-593-e.jpeg",
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
      products: [
        {
          image: "https://www.maisvendas.co.mz/images/listings/2024-11/medThmb/972fd7b0_2185_4cac_839e_a327906ebadajpeg-1732709411-593-e.jpeg",
          title: "Vestido Elegante",
          price: "0.99",
          originalPrice: "22.03",
          discount: "95%"
        },
        {
          image: "https://www.maisvendas.co.mz/images/listings/2024-11/medThmb/972fd7b0_2185_4cac_839e_a327906ebadajpeg-1732709411-593-e.jpeg",
          title: "Calça Cargo",
          price: "2.86",
          originalPrice: "26.24",
          discount: "89%"
        },
        {
          image: "https://www.maisvendas.co.mz/images/listings/2024-11/medThmb/972fd7b0_2185_4cac_839e_a327906ebadajpeg-1732709411-593-e.jpeg",
          title: "Jaqueta Fashion",
          price: "13.03",
          originalPrice: "51.18",
          discount: "75%"
        },
        {
          image: "https://www.maisvendas.co.mz/images/listings/2024-11/medThmb/972fd7b0_2185_4cac_839e_a327906ebadajpeg-1732709411-593-e.jpeg",
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
    return (
      <div className="space-y-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {[1, 2].map((item) => (
          <div key={item} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 shadow-sm animate-pulse">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="w-full lg:w-[308px]">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="h-6 w-32 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                  </div>
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                </div>
              </div>
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

  return (
    <div className="space-y-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {banners.map((banner) => (
        <BannerCard
          key={banner.id}
          {...banner}
          products={banner.products.map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <ProductItem {...product} />
            </motion.div>
          ))}
        />
      ))}
    </div>
  );
}

export default React.memo(PromotionalBanners);