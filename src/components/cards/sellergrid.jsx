import { SellerCard } from './sellercard';

const sellers = [
    {
      id: '1',
      name: 'Ana Silva',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      type: 'vip',
      followers: 1520,
      likes: 3200,
      products: 45,
      rating: 4.8
    },
    {
      id: '2',
      name: 'João Santos',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      type: 'simple',
      followers: 890,
      likes: 1500,
      products: 28,
      rating: 4.5
    },
    {
      id: '3',
      name: 'Maria Costa',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      type: 'vip',
      followers: 2100,
      likes: 4500,
      products: 67,
      rating: 4.9
    },
    {
      id: '4',
      name: 'Pedro Oliveira',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      type: 'simple',
      followers: 750,
      likes: 1200,
      products: 15,
      rating: 4.3
    },
    {
      id: '5',
      name: 'Carla Souza',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      type: 'vip',
      followers: 1800,
      likes: 3800,
      products: 52,
      rating: 4.7
    },
    {
      id: '6',
      name: 'Lucas Ferreira',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      type: 'simple',
      followers: 620,
      likes: 980,
      products: 23,
      rating: 4.4
    },
    {
      id: '7',
      name: 'Isabel Santos',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce',
      type: 'vip',
      followers: 2300,
      likes: 5100,
      products: 78,
      rating: 4.9
    },
    {
      id: '8',
      name: 'Ricardo Lima',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
      type: 'simple',
      followers: 930,
      likes: 1700,
      products: 34,
      rating: 4.6
    },
    {
      id: '9',
      name: 'Beatriz Costa',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
      type: 'vip',
      followers: 1950,
      likes: 4200,
      products: 59,
      rating: 4.8
    },
    {
      id: '10',
      name: 'Fernando Melo',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef',
      type: 'simple',
      followers: 840,
      likes: 1400,
      products: 25,
      rating: 4.5
    },
    {
      id: '11',
      name: 'Sofia Rocha',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
      type: 'vip',
      followers: 2800,
      likes: 6300,
      products: 92,
      rating: 4.9
    },
    {
      id: '12',
      name: 'Miguel Castro',
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556',
      type: 'simple',
      followers: 710,
      likes: 1100,
      products: 19,
      rating: 4.4
    },
    {
      id: '13',
      name: 'Laura Pereira',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
      type: 'vip',
      followers: 1680,
      likes: 3600,
      products: 48,
      rating: 4.7
    },
    {
      id: '14',
      name: 'André Martins',
      avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea',
      type: 'simple',
      followers: 560,
      likes: 890,
      products: 21,
      rating: 4.3
    },
    {
      id: '15',
      name: 'Carolina Dias',
      avatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56',
      type: 'vip',
      followers: 2450,
      likes: 5400,
      products: 73,
      rating: 4.8
    }
  ] 

export function SellersGrid() {
  return (
    <div className="flex justify-center py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sellers.map((seller) => (
          <SellerCard key={seller.id} seller={seller} />
        ))}
      </div>
    </div>
  );
}
