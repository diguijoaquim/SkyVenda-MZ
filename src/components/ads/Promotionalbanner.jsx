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
          image: "data:image/jpeg;base64,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",
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