import React, { useState } from 'react';
import { FiX, FiUpload, FiDollarSign, FiBarChart2,FiBox, FiTag, FiImage, FiGitPullRequest } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-quill/dist/quill.snow.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/api_fecher';
import ReactQuill from 'react-quill';



function PublishProductCard({ isOpen, onClose }) {
  const [dragOver, setDragOver] = useState(false);
  const [images, setImages] = useState([]);
  const maxImages = 5;
  const [loading,setLoading]=useState(false)
  // States for each input field
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [estado, setEstado] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const { token } = useContext(AuthContext);

   // Função para converter base64 para File
   const base64ToFile = (base64String, filename, mimeType) => {
    const byteCharacters = atob(base64String.split(',')[1]);
    const byteArrays = [];
    
    for (let offset = 0; offset < byteCharacters.length; offset++) {
      byteArrays.push(byteCharacters.charCodeAt(offset));
    }
    
    const byteArray = new Uint8Array(byteArrays);
    const blob = new Blob([byteArray], { type: mimeType });
    return new File([blob], filename, { type: mimeType });
  };

  const postProduct = async () => {
    const formData = new FormData();
    formData.append('nome', productName);
    formData.append('preco', parseFloat(price));
    formData.append('categoria', category);
    formData.append('quantidade_estoque', parseInt(stock));
    formData.append('estado', estado);
    formData.append('provincia', province);
    formData.append('distrito', district);
    formData.append('tipo', type);
    formData.append('descricao', description);
    formData.append('detalhes', content);
    formData.append('localizacao', 'string');
    formData.append('disponiblidade', 'string');
    formData.append('revisao', 'string');
    setLoading(true)

    // Adicionando as imagens convertidas para o FormData
    images.forEach((image) => {
      const file = base64ToFile(image.url, `image-${image.id}.png`, 'image/png');
      formData.append('fotos', file);
    });

    api.post('/produtos/publicar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
      },
    })
    .then(response => {
      if (response.status === 200) {
        console.log('Produto publicado com sucesso!');
      }
    })
    .catch(error => {
      console.log(error.message);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleNewImages(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleNewImages(files);
  };

  const handleNewImages = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const remainingSlots = maxImages - images.length;
    
    // Only process up to the remaining slots
    const filesToProcess = imageFiles.slice(0, remainingSlots);

    filesToProcess.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => [...prev, {
          id: Date.now() + Math.random(), // Unique ID for each image
          url: e.target.result
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (idToRemove) => {
    setImages(prev => prev.filter(img => img.id !== idToRemove));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-md max-h-[90vh] mx-4 overflow-hidden"
          >
            <div className="bg-white  shadow-2xl ">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 sticky top-0 z-10 ">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Publicar Produto</h2>
                  <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-8rem)] custom-scrollbar">
                <div className="p-6 space-y-6">
                  {/* Image Upload Area */}
                  <div className="space-y-4">
                    {/* Image Preview Grid */}
                    {images.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {images.map((image) => (
                          <div key={image.id} className="relative group">
                            <img
                              src={image.url}
                              alt="Preview"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => removeImage(image.id)}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full 
                                       opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <FiX size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Upload Area */}
                    {images.length < maxImages && (
                      <div
                        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                          dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                        }`}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragOver(true);
                        }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleDrop}
                      >
                        <FiImage className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-4">
                          <label htmlFor="file-upload" className="cursor-pointer">
                            <span className="mt-2 block text-sm font-medium text-gray-600">
                              Arraste imagens ou
                            </span>
                            <span className="text-blue-500 hover:text-blue-600 transition-colors">
                              procure no computador
                            </span>
                            <span className="mt-2 block text-sm text-gray-500">
                              {images.length}/{maxImages} imagens
                            </span>
                          </label>
                          <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handleFileInput}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome do Produto
                      </label>
                      <div className="relative">
                        <FiBox className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={productName}
                          onChange={(e)=>setProductName(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="Ex: Smartphone XYZ"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preço
                      </label>
                      <div className="relative">
                        <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          value={price}
                          onChange={(e)=>setPrice(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Categoria
                      </label>
                      <div className="relative">
                        <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none">
                          <option value="">Selecione uma categoria</option>
                          <option value="electronics">Eletrônicos</option>
                          <option value="clothing">Roupas</option>
                          <option value="books">Livros</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantidade do estoque
                      </label>
                      <div className="relative">
                        <FiBarChart2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          
                        <input
                        value={stock}
                        onChange={(e)=>setStock(e.target.value)}
                          type="number"
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estado
                      </label>
                      <div className="relative">
                        <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select value={estado} onChange={(e)=>setEstado(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none">
                          <option value="">Novo</option>
                          <option value="">Novo Fora da Caixa</option>
                          <option value="electronics">Segunda mao - Bolada</option>
                        </select>
                      </div>
                    </div>
                    <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Província
                </label>
                <div className="relative">
                  <FiGitPullRequest className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select value={province} onChange={(e)=>setProvince(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none">
                    <option value="">Selecione uma província</option>
                    <option value="maputo">Maputo</option>
                    <option value="gaza">Gaza</option>
                    <option value="inhambane">Inhambane</option>
                    {/* Adicione mais opções conforme necessário */}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Distrito
                </label>
                <div className="relative">
                  <FiGitPullRequest className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select value={district} onChange={(e)=>setDistrict(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none">
                    <option value="">Selecione um distrito</option>
                    <option value="matola">Matola</option>
                    <option value="xai-xai">Xai-Xai</option>
                    <option value="vilankulo">Vilankulo</option>
                    {/* Adicione mais opções conforme necessário */}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo
                </label>
                <div className="relative">
                  <FiGitPullRequest className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select value={type} onChange={(e)=>setType(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none">
                    <option value="">Selecione o tipo</option>
                    <option value="novo">Novo</option>
                    <option value="usado">Usado</option>
                    <option value="recondicionado">Recondicionado</option>
                  </select>
                </div>
              </div>
            <div className='py-4'>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Detalhes
              </label>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={handleContentChange}
                style={{ height: '260px' }}
                  />
            </div>

            <div className='py-4'>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                rows="4"
                placeholder="Descreva seu produto..."
              ></textarea>
            </div>
          </div>
            </div>
         </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-4 sticky bottom-0 z-10">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Cancelar
                </button>
                <button onClick={()=>postProduct()} className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
                {loading ? (
              
              <div role="status">
                  <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-300/75 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span className="sr-only">Loading...</span>
              </div>

            ) : (
              'Puclicar'
            )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default PublishProductCard;