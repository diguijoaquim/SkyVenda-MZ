import React,{useState} from 'react';
import { Menu, ChevronDown } from 'lucide-react';

const categories = [
  {
    name: 'Electronics',
    subcategories: ['Smartphones', 'Laptops', 'Tablets', 'Accessories']
  },
  {
    name: 'Fashion',
    subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Shoes', 'Accessories']
  },
  {
    name: 'Home & Living',
    subcategories: ['Furniture', 'Decor', 'Kitchen', 'Lighting']
  },
  {
    name: 'Beauty',
    subcategories: ['Skincare', 'Makeup', 'Haircare', 'Fragrances']
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
                    <button
                      key={subcategory}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      {subcategory}
                    </button>
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