import { useEffect, useState, useContext } from 'react';
import { ProductCard } from '../cards/ProductCard';
import { ProductCardSkeleton2 } from '../skeleton/productcardskeleton2';
import { AuthContext } from '../../context/AuthContext';
import { HomeContext } from '../../context/HomeContext';
import api from '../../api/api_fecher';
import { FaArrowLeft } from 'react-icons/fa';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../../hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CATEGORIES, SUBCATEGORIES } from '../../data/consts';

export function ProductGrid() {
  const [loading, setLoading] = useState(true);
  const { myproducts, addProducts } = useContext(HomeContext);
  const { isAuthenticated, token } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [images, setImages] = useState([]);
  const maxImages = 5;
  
  // States for each input field
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [estado, setEstado] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const { toast } = useToast();

  const handleContentChange = (value) => {
    setContent(value);
  };

  useEffect(() => {
    if (selectedProduct) {
      setProductName(selectedProduct.title || '');
      setPrice(selectedProduct.price || '');
      setCategory(selectedProduct.category || '');
      setStock(selectedProduct.stock || 0);
      setEstado(selectedProduct.estado || '');
      setType(selectedProduct.type || '');
      setDescription(selectedProduct.description || '');
      setContent(selectedProduct.content || '');
    }
  }, [selectedProduct]);
  const sideAds=[
    {
      title:"Casa A venda",
      descriptio:"esta casa esta a venda com ...",
      image:"https://www.maisvendas.co.mz/images/listings/2024-11/medThmb/972fd7b0_2185_4cac_839e_a327906ebadajpeg-1732709411-593-e.jpeg"
    },
    {
      title:"Toyota Mark X",
      descriptio:"o luxuoso Mark X esta  ...",
      image:"https://www.maisvendas.co.mz/images/listings/2024-03/20240308_182209jpg-1710190019-206-e.jpg"
    },
    {
      title:"Tennis 2025",
      descriptio:"faz brilhar ou seu ser ...",
      image:"https://conceitoshoes.com/cdn/shop/files/tenis-esportivo-sport-premium-tenis-esportivo-sport-premium-grupo-10-vinnci-store-cinza-laranja-37-908974_800x.jpg?v=1705602594"
    }
  ]

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setPage(2);
  };

  const handleDelete = (slug,name) => {
    console.log(token)
    api.delete(`/produtos/produtos/${slug}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((res)=>{
      const updatedProducts = myproducts.filter((product) => product.slug !== slug);
      addProducts(updatedProducts);
      toast({
        title: "Produto deletado!",
        description: `O produto,${name}, for eliminado com sucesso,`,
      });
    }).catch((err)=>{
      toast({})
    })
    
  };

  useEffect(() => {
    if (!token && myproducts) return;
    if(myproducts?.length>=1){
      setLoading(false)
    }else{
      api.get(`produtos/produtos/?skip=0&limit=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        addProducts(Array.isArray(res.data.produtos) ? res.data.produtos : []);
      })
      .catch((err) => {
        console.error('Erro ao buscar produtos:', err);
        addProducts([]);
      })
      .finally(() => setLoading(false));
    }

    
  }, [token]);

  const handleSubmit = async () => {
    
    const formData = new FormData();
    formData.append('nome', productName);
    formData.append('preco', parseFloat(price));
    formData.append('quantidade_estoque', parseInt(stock));
    formData.append('estado', estado);
    formData.append('disponiblidade', 'string');
    formData.append('descricao', description);
    formData.append('detalhes', content);
    formData.append('tipo', type);
    formData.append('categoria', category);
    
    
    
    

    api.put(`/produtos/${selectedProduct?.slug}`,formData,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      toast({
        title: "Produto atualizado com sucesso!",
        description: "As alterações foram salvas.",
      });
    }).catch(err => {
      toast({
        title: "Erro ao atualizar produto",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
      setPage(1);
    })

      
    
  };

  return (
    <>
      {page === 1 ? (
        <div className="bg-white rounded-lg shadow h-[calc(100vh-100px)]">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Meus Produtos</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {loading ? (
              <>
                {[...Array(4)].map((_, index) => (
                  <ProductCardSkeleton2 key={index} />
                ))}
              </>
            ) : (
              <>
                {myproducts.length === 0 ? (
                  <p>Nenhum produto encontrado</p>
                ) : (
                  myproducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onEdit={handleEdit}
                      onDelete={() => handleDelete(product.slug,product.title)}
                    />
                  ))
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow h-[calc(100vh-100px)] overflow-y-auto">
          <div className="p-4 border-b sticky top-0 bg-white z-10">
            <div className="flex items-center gap-2">
              <button
                className="flex justify-center items-center hover:bg-indigo-200 rounded-full p-3"
                onClick={() => setPage(1)}
              >
                <FaArrowLeft />
              </button>
              <h2 className="text-lg font-semibold text-gray-900">
                Editar Produto - <span className="font-bold">{selectedProduct?.title}</span>
              </h2>
            </div>
          </div>
          {selectedProduct && (
            <div className="flex flex-col lg:flex-row gap-6 p-4">
              <div className="relative w-full lg:w-[500px] h-[500px] bg-gray-100 rounded-lg ">
                <img
                  src={`https://skyvendamz.up.railway.app/produto/${selectedProduct?.thumb}`}
                  onError={(e) => (e.target.src = 'imagem.jpg')}
                  alt={selectedProduct?.title}
                  className="w-full h-full object-cover border"
                />
              </div>

              <div className="flex-1 space-y-6 h-[500px] w-[400px]  flex">
                <div className="space-y-4 overflow-y-scroll h-[500px] w-full px-5">
                  {/* Nome do Produto */}
                  <div>
                    <Label htmlFor="productName">Nome do Produto</Label>
                    <Input
                      id="productName"
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="Ex: iPhone 14 Pro"
                      className="mt-1"
                    />
                  </div>

                  {/* Preço */}
                  <div>
                    <Label htmlFor="price">Preço</Label>
                    <Input
                      id="price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      className="mt-1"
                    />
                  </div>

                  {/* Categoria */}
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      value={category}
                      onValueChange={(value) => setCategory(value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subcategoria */}
                  <div>
                    <Label htmlFor="type">Subcategoria</Label>
                    <Select
                      value={type}
                      onValueChange={(value) => setType(value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione uma subcategoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {category && SUBCATEGORIES[category]?.map((subcat) => (
                          <SelectItem key={subcat} value={subcat}>
                            {subcat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Estoque */}
                  <div>
                    <Label htmlFor="stock">Quantidade em Estoque</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="0"
                      className="mt-1"
                    />
                  </div>

                  {/* Estado */}
                  <div>
                    <Label htmlFor="estado">Estado</Label>
                    <Select
                      value={estado}
                      onValueChange={(value) => setEstado(value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione o estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Novo">Novo</SelectItem>
                        <SelectItem value="Bolada">Bolada</SelectItem>
                        <SelectItem value="Seminovo">Seminovo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {/* Detalhes - Rich Text Editor */}
                  <div>
                    <Label htmlFor="content">Detalhes</Label>
                    <div className="mt-1">
                      <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={handleContentChange}
                        className="h-64"
                      />
                    </div>
                  </div>

                  {/* Descrição */}
                  <div>
                    <Label htmlFor="description">Descrição</Label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      rows="4"
                      placeholder="Descreva seu produto..."
                    />
                  </div>
                </div>

                <div className=" bg-white p-4 border-t w-[500px] flex justify-center items-center flex-col gap-2">
                  <Button onClick={handleSubmit} className="w-full">
                    Salvar Alterações
                  </Button>
                  <div className="w-w-full h-[350px] rounded-md bg-white/30 border-blue-200 shadow-md p-4 space-y-2 overflow-y-auto">
                      <label className="text-black">Melhores Boladas</label>
                      {sideAds.map((item, index) => (
                        <div
                          className="flex gap-2 h-[90px] bg-white/40 p-3 border rounded-md hover:bg-indigo-100"
                          key={`sideAd-${index}`} // Chave única para cada item
                        >
                          <img src={item.image} className="w-[80px]" alt={item.title} />
                          <div className="flex-col">
                            <p className="font-bold">{item.title}</p>
                            <label className="text-wrap text-sm text-gray-500">{item.descriptio}</label>
                          </div>
                        </div>
                      ))}
                    </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}