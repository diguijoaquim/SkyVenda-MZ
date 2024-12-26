import React, { useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom'; // Importando Link do react-router-dom

const categories = [
  {
    name: 'Eletrônicos',
    subcategories: ['Smartphones', 'Laptops', 'Tablets', 'Acessórios']
  },
  {
    name: 'Moda',
    subcategories: ['Roupas Masculinas', 'Roupas Femininas', 'Sapatos', 'Acessórios']
  },
  {
    name: 'Casa & Decoração',
    subcategories: ['Móveis', 'Decoração', 'Cozinha', 'Iluminação']
  },
  {
    name: 'Beleza',
    subcategories: ['Cuidados com a Pele', 'Maquiagem', 'Cuidados com o Cabelo', 'Perfumes']
  },
  {
    name: 'Viaturas',
    subcategories: ['Carros', 'Motos', 'Peças & Acessórios']
  },
  {
    name: 'Imóveis',
    subcategories: ['Casas', 'Apartamentos', 'Terrenos', 'Propriedades Comerciais']
  },
  {
    name: 'Eletrodomésticos',
    subcategories: ['Geladeiras', 'Máquinas de Lavar', 'Micro-ondas', 'Ar Condicionado']
  },
  {
    name: 'Roupas e Sapatos',
    subcategories: ['Sapatos Masculinos', 'Sapatos Femininos', 'Roupas Casuais', 'Roupas Formais']
  }
];

export default function CategoriesDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="rounded-full h-[30px] bg-white/80 flex items-center px-4 gap-3 hover:bg-white transition-colors"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Menu className="w-4 h-4" />
        <span className="text-sm">Todas as categorias</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg py-2 z-50"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {categories.map((category) => (
            <div
              key={category.name}
              className="group relative px-4 py-2 hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm">{category.name}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>

              <div className="absolute left-full top-0 hidden group-hover:block">
                <div className="ml-2 w-48 bg-white rounded-lg shadow-lg py-2">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory}
                      to={`/${category.name.toLowerCase()}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`} // Link para a página da subcategoria
                    >
                      <button
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        {subcategory}
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
