const products = [
  { id: 1, name: 'Smartphone XYZ', price: 15000, rating: 4.5 },
  { id: 2, name: 'Laptop ABC', price: 45000, rating: 4.8 },
  { id: 3, name: 'Fones de Ouvido QWE', price: 2500, rating: 4.2 },
  { id: 4, name: 'Smartwatch 123', price: 8000, rating: 4.0 },
  { id: 5, name: 'Câmera Digital PRO', price: 35000, rating: 4.7 },
  { id: 6, name: 'Console de Jogos Next', price: 30000, rating: 4.9 },
];

function formatPrice(price) {
  return new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' }).format(price);
}

function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return `
    ${'★'.repeat(fullStars)}
    ${halfStar ? '½' : ''}
    ${'☆'.repeat(emptyStars)}
  `;
}

export function renderProducts() {
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = products.map(product => `
    <div class="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <div class="p-6">
        <h2 class="text-xl font-semibold mb-2">${product.name}</h2>
        <p class="text-gray-600 mb-4">${formatPrice(product.price)}</p>
        <div class="flex items-center mb-4">
          <span class="text-yellow-400 mr-1">${renderStars(product.rating)}</span>
          <span class="text-gray-600">(${product.rating})</span>
        </div>
        <button class="btn w-full">Adicionar ao Carrinho</button>
      </div>
    </div>
  `).join('');
}