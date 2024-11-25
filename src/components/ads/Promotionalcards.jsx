import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

function PromotionalCards() {
  const promotions = [
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

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {promotions.map((promo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`bg-gradient-to-r ${promo.bgColor} rounded-xl p-4 shadow-sm`}
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-bold">{promo.title}</h2>
                <p className="text-sm text-gray-600">{promo.subtitle}</p>
              </div>
              <button className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors">
                <FiArrowRight />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {promo.items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg p-2 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-24 object-cover rounded-lg mb-2"
                  />
                  <h3 className="text-xs font-medium truncate">{item.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold">US ${item.price}</span>
                    {item.discount && (
                      <span className="text-xs text-red-500">-{item.discount}</span>
                    )}
                  </div>
                  {item.extra && (
                    <p className="text-xs text-gray-500">{item.extra}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default PromotionalCards;
