import React, { useState, useEffect } from 'react';
import AdCard from './components/AdCard';
import ProductItem from './components/ProductItem';
import { PromotionalCardsSkeleton } from '../skeleton/SkeletonComponents';

const PromotionalCards = () => {
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
            image: "https://conceitoshoes.com/cdn/shop/files/tenis-esportivo-sport-premium-tenis-esportivo-sport-premium-grupo-10-vinnci-store-cinza-laranja-37-908974_800x.jpg?v=1705602594",
            title: "Tênis Esportivo",
            price: "2.45",
            discount: "85%"
          },
          {
            image: "https://www.maisvendas.co.mz/images/listings/2024-03/20240308_182209jpg-1710190019-206-e.jpg",
            title: "Lexus",
            price: "4.57",
            discount: "80%"
          },
          {
            image: "https://www.maisvendas.co.mz/images/listings/2024-11/medThmb/972fd7b0_2185_4cac_839e_a327906ebadajpeg-1732709411-593-e.jpeg",
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
            image: "data:image/jpeg;base64,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",
            title: "Camiseta Esportiva",
            price: "9.99",
            extra: "2+ unidades, extra 2% off"
          },
          {
            image: "https://www.dcutec.com/4420-large_default/fones-de-ouvido-bluetooth-ows-open-ear-pretos.jpg",
            title: "Fones Bluetooth",
            price: "8.40",
            extra: "5+ unidades, extra 5% off"
          },
          {
            image: "https://5.imimg.com/data5/ANDROID/Default/2022/1/JD/WE/ET/13816807/product-jpeg-1000x1000.jpg",
            title: "Jeans Premium",
            price: "0.99",
          discount: "45%"
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
    return <PromotionalCardsSkeleton />;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {promotions.map((promo, index) => (
          <AdCard
            key={index}
            title={promo.title}
            subtitle={promo.subtitle}
            bgColor={promo.bgColor}
            items={promo.items.map((item, idx) => (
              <ProductItem key={idx} {...item} />
            ))}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(PromotionalCards);