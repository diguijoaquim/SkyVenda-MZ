import React, { useState,useEffect } from 'react';
import { MapPin, Eye, Heart, Star, ChevronLeft, ChevronRight, MessageCircle, X, Send } from 'lucide-react';
import { useContext } from 'react';
import { HomeContext } from '../context/HomeContext';
import api from '../api/api_fecher';
import { useParams } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import { data } from 'autoprefixer';
import axios from 'axios';


function formatPrice(price) {
  return new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' })
    .format(price)
    .replace('MTn', 'MZN'); // Substitui MTn por MZN, se necessário
}

// Image Gallery Component
function ImageGallery({images}) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Verifica se há imagens para exibir
  if (!images || images.length === 0) {
    return <div>Nenhuma imagem disponível</div>;
  }

  return (
    <div className="relative w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden">
      <img
        src={`https://skyvendamz.up.railway.app/produto/${images[currentImage]}`}
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
              currentImage === index ? "bg-white" : "bg-white/50"
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
        <h1 className="text-3xl font-bold text-gray-900">{property?.title}</h1>
        <div className="flex items-center gap-2 mt-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{property?.province}, {property?.district}</span>
        </div>
      </div>
      <div className="text-right">
        <p className="text-3xl font-bold text-blue-600">{formatPrice(property?.price)}</p>
        <p className="text-gray-500 text-sm">Posted {property?.time}</p>
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
        <span>{property?.views} views</span>
      </div>
      <div className="flex items-center gap-2">
        <Heart className="w-5 h-5 text-gray-600" />
        <span>{property?.likes} likes</span>
      </div>
      <button
        onClick={onCommentsClick}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <MessageCircle className="w-5 h-5" />
        <span>Comments ({property?.comments?.length})</span>
      </button>
    </div>
  );
}
function CommentsModal({ isOpen, onClose, user, avatar, commentarios,slug }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const { token } = useContext(AuthContext);

  // Sincronize o estado `comments` com os dados iniciais de `commentarios`
  useEffect(() => {
    if (commentarios && Array.isArray(commentarios)) {
      setComments(commentarios);
    }
  }, [commentarios]);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!newComment.trim()) return; // Evita envio se o campo estiver vazio.
  
    try {
      const formData = new URLSearchParams();
      formData.append('produto_slug', slug); // 'venda-de-casa' no exemplo cURL
      formData.append('conteudo', newComment);
  
      console.log("Token enviado:", token);
  
      const response = await axios.post(
        'https://skyvendamz.up.railway.app/comentarios/', // Adicione barra final se necessário
        formData, // Enviar como objeto URLSearchParams
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token.trim()}`, // Certifique-se que o token está correto
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
  
      // Sucesso
      console.log("Resposta da API:", response.data);
  
      const comment = {
        id: comments.length + 1,
        user: {
          name: user,
          avatar: `https://skyvendamz.up.railway.app/perfil/${avatar}`,
        },
        text: newComment,
        date: "agora",
      };
  
      setComments([comment, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Erro ao enviar o comentário:', error);
      if (error.response) {
        console.log("Erro detalhado:", error.response.data);
      }
    }
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
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <img
                  src={`https://skyvendamz.up.railway.app/perfil/${comment.user?.avatar}`}
                  alt={comment.user?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{comment.user?.name}</span>
                    <span className="text-sm text-gray-500">{comment.date}</span>
                  </div>
                  <p className="text-gray-700 mt-1">{comment.text}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">Nenhum comentário para exibir</p>
          )}
        </div>

        <div className="border-t p-4">
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
              onClick={handleSubmit}
            >
              <Send className="w-4 h-4" />
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// Seller Card Component
function SellerCard({ user }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Nhonguista</h2>
      <div className="flex items-center gap-4">
        <img
          src={`https://skyvendamz.up.railway.app/perfil/${user?.avatar}`}
          alt={user?.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <p className="font-medium text-lg">{user?.name}</p>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>{'New Seller'}</span>
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
  const { slug } = useParams();
  const { loading, setLoading, produtos } = useContext(HomeContext);
  const {user,isAuthenticated}  = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading2, setLoading2] = useState(loading);

  useEffect(() => {
    async function fetchProduct() {
      if (produtos.length > 0) {
        setLoading2(true)
        const produto = produtos.find(p => p.slug === slug);
        if (produto) {
          setProduct(produto);
          console.log(produto)
        }else{
          
        }
      }
      setLoading2(false);
      api.get(`/produtos/detalhe/${slug}`)
    }

    fetchProduct();
  }, [slug, produtos]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {product && product.images ? (
              <>
                <ImageGallery images={product.images.split(',')} />
              </>
            ) : (
              <p>Loading product details...</p> 
            )}
          </div>
          <div className="space-y-6">
            <PropertyHeader property={product} />
            <PropertyStats 
              property={product} 
              onCommentsClick={() => setIsCommentsOpen(true)}
            />
            <SellerCard user={product?.user} />
            <PropertyDescription description={product?.description} />
          </div>
        </div>
      </div>  
      {isAuthenticated?(<CommentsModal 
        isOpen={isCommentsOpen} 
        onClose={() => setIsCommentsOpen(false)} 
        username={user?.name}
        avatar={user?.perfil}
        commentarios={product?.comments || []}
        slug={product?.slug || ""}
      />):<p>fazer Login</p>}
      
    </div>
  );
}

export default ProductPage;