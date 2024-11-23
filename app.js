import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

const url = 'http://192.168.1.62:5000/produtos/publicar';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwicm9sZSI6ImxvamEiLCJleHAiOjE3MzA3MzY2NDl9.ZJU_PH30MLEsodhYOQu4mCL025ttyY1gh4uZ14x-JHo';

// Criação de um novo FormData
const formData = new FormData();
formData.append('estado', 'string');
formData.append('descricao', 'string');
formData.append('localizacao', 'string');
formData.append('provincia', 'string');
formData.append('preco', 0);
formData.append('fotos', fs.createReadStream('03.png'), { contentType: 'image/png' });
formData.append('categoria', 'string');
formData.append('tipo', 'string');
formData.append('disponiblidade', 'string');
formData.append('distrito', 'string');
formData.append('detalhes', '<p>Ola</p>');
formData.append('nome', 'string');
formData.append('revisao', 'string');
formData.append('quantidade_estoque', 0);

axios.post(url, formData, {
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`
  }
})
.then(response => {
  console.log('Sucesso:', response.data);
})
.catch(error => {
  console.error('Erro:', error);
});
