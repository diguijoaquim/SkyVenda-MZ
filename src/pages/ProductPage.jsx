import React, { useState } from 'react';
import { MapPin, Eye, Heart, Star, ChevronLeft, ChevronRight, MessageCircle, X, Send } from 'lucide-react';

// Mock data for the property
const mockProperty = {
  id: 3,
  nome: "venda de Casa",
  capa: "0a0643fc-57d6-45aa-867f-5a73d20d8f29.png",
  fotos: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2075&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2053&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
  ],
  preco: 9000000,
  quantidade_estoque: 1,
  estado: "electronics",
  provincia: "maputo",
  distrito: "xai-xai",
  descricao: "Luxurious modern house located in a prime area of Xai-Xai, Maputo. This stunning property features spacious rooms, high-end finishes, and a beautiful garden. Perfect for families looking for comfort and elegance.",
  view: 17,
  likes: 1,
  tempo: "há 11 dias",
  usuario: {
    id: 1,
    nome: "jorge paulo",
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    media_estrelas: 4.5
  }
};

// Mock data for comments
const mockComments = [
  {
    id: 1,
    user: {
      name: "Maria Silva",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    },
    text: "Beautiful property! Is it still available?",
    date: "2 days ago"
  },
  {
    id: 2,
    user: {
      name: "João Santos",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    },
    text: "What's the total area of the property?",
    date: "3 days ago"
  }
];

// Image Gallery Component
function ImageGallery({ images }) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden">
      <img
        src={images[currentImage]}
        alt={`Property image ${currentImage + 1}`}
        className="w-full h-full object-cover"
      />
      
      <button
        onClick={previousImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full ${
              currentImage === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Property Header Component
function PropertyHeader({ property }) {
  function formatPrice(price) {
    return new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' })
      .format(price)
      .replace('MTn', 'MZN'); // Substitui MTn por MZN, se necessário
  }

  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{property.nome}</h1>
        <div className="flex items-center gap-2 mt-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{property.provincia}, {property.distrito}</span>
        </div>
      </div>
      <div className="text-right">
        <p className="text-3xl font-bold text-blue-600">{formatPrice(property.preco)}</p>
        <p className="text-gray-500 text-sm">Posted {property.tempo}</p>
      </div>
    </div>
  );
}

// Property Stats Component with Comments Button
function PropertyStats({ property, onCommentsClick }) {
  return (
    <div className="flex items-center gap-6 py-4 border-y border-gray-200">
      <div className="flex items-center gap-2">
        <Eye className="w-5 h-5 text-gray-600" />
        <span>{property.view} views</span>
      </div>
      <div className="flex items-center gap-2">
        <Heart className="w-5 h-5 text-gray-600" />
        <span>{property.likes} likes</span>
      </div>
      <button
        onClick={onCommentsClick}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <MessageCircle className="w-5 h-5" />
        <span>Comments ({mockComments.length})</span>
      </button>
    </div>
  );
}

// Comments Modal Component
function CommentsModal({ isOpen, onClose }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(mockComments);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: comments.length + 1,
      user: {
        name: "Current User",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
      },
      text: newComment,
      date: "Just now"
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Comments</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <img
                src={comment.user.avatar}
                alt={comment.user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.user.name}</span>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
                <p className="text-gray-700 mt-1">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="border-t p-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escreva o seu Comentario"
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Seller Card Component
function SellerCard({ user }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Seller Information</h2>
      <div className="flex items-center gap-4">
        <img
          src={user.foto}
          alt={user.nome}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <p className="font-medium text-lg">{user.nome}</p>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>{user.media_estrelas || 'New Seller'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Property Description Component
function PropertyDescription({ description }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Description</h2>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
}

// Main Product Page Component
function ProductPage() {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <ImageGallery images={mockProperty.fotos} />
          </div>
          <div className="space-y-6">
            <PropertyHeader property={mockProperty} />
            <PropertyStats 
              property={mockProperty} 
              onCommentsClick={() => setIsCommentsOpen(true)}
            />
            <SellerCard user={mockProperty.usuario} />
            <PropertyDescription description={mockProperty.descricao} />
          </div>
        </div>
      </div>
      
      <CommentsModal 
        isOpen={isCommentsOpen} 
        onClose={() => setIsCommentsOpen(false)} 
      />
    </div>
  );
}

export default ProductPage;