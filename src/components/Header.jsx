import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiSearch, FiHome, FiMessageSquare, FiBell, FiMenu, FiUser } from 'react-icons/fi';
import Cart from './Cart';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import PopUpMenu from './popupmenu/popup_menu';
import PopupMenuDeskTop from './popupmenu/popupmenu_desktop';
import PopupMenuMobile from './popupmenu/popup_menu_mobile';
import { suggestedProducts } from '../data/sugest';
import IconButton from './IconButton';

function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const menuClickedRef = useRef(false);
  const {user, isAuthenticated, logout} = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuClickedRef.current) {
        menuClickedRef.current = false;
        return;
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (route) => {
    menuClickedRef.current = true;
    navigate(route);
    setTimeout(() => {
      setIsProfileOpen(false);
      setIsMobileMenuOpen(false);
    }, 100);
  };

  const handleSearchSelect = (product) => {
    setSearchTerm(product);
    navigate(`/search?q=${product}`);
    setIsSearchOpen(false);
    setShowSuggestions(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/50' : 'bg-transparent'
    }`}>
      <div className="relative">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm"></div>

        <div className="container mx-auto px-4 relative">
          {/* Desktop Header */}
          <div className="hidden md:flex flex-col md:flex-row justify-between items-center py-4">
            <div className="flex items-center mb-4 md:mb-0">
              <button 
                onClick={() => handleNavigate('/')} 
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
              >
                SkyVenda MZ
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex-grow mx-4 relative max-w-[400px]">
              <div className="relative search-container group">
                <input
                  type="text"
                  placeholder="Pesquisar produtos..."
                  className="w-full py-2 px-4 pr-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-md focus:outline-none focus:border-blue-500/50 text-gray-800 placeholder-gray-500 transition-all group-hover:border-blue-500/30"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setIsSearchOpen(false);
                      navigate(`/search?q=${searchTerm}`);
                    }
                  }}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors">
                  <FiSearch size={20} />
                </button>
              </div>

              {/* Search Suggestions */}
              {searchTerm && showSuggestions && (
                <div className="absolute z-10 w-full mt-2 bg-white/90 backdrop-blur-md rounded-lg shadow-lg overflow-hidden border border-white/20">
                  {suggestedProducts
                    .filter(product => product.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((product, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-blue-50/50 cursor-pointer transition-colors"
                        onClick={() => handleSearchSelect(product)}
                      >
                        {product}
                      </div>
                    ))
                  }
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-6">
              <IconButton
                icon={FiBell}
                count={3}
                onClick={() => handleNavigate('/notifications')}
                color="red"
              />
              
              <IconButton
                icon={FiMessageSquare}
                count={5}
                onClick={() => handleNavigate('/messages')}
                color="green"
              />
              
              <IconButton
                icon={FiShoppingCart}
                count={3}
                onClick={() => setIsCartOpen(true)}
                color="purple"
              />

              {/* Profile Button */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white transform transition-all duration-300 group-hover:scale-110 relative z-10">
                    <FiUser size={20} />
                  </div>
                </button>

                {isProfileOpen && isAuthenticated && user && (
                  <PopupMenuDeskTop
                    user={{
                      name: user.name || '',
                      email: user.email || '',
                      revisado: user.revisado || false
                    }}
                    logout={logout}
                    handleNavigate={handleNavigate}
                    isAuthenticated={isAuthenticated}
                  />
                )}

                {isProfileOpen && !isAuthenticated && (
                  <PopUpMenu handleNavigate={handleNavigate} />
                )}
              </div>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden">
            {/* Mobile Top Row */}
            <div className="flex justify-between items-center py-3">
              <button 
                onClick={() => handleNavigate('/')} 
                className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
              >
                SkyVenda MZ
              </button>
              <div className="flex items-center space-x-4">
                <IconButton
                  icon={FiSearch}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  color="blue"
                />
                
                <IconButton
                  icon={FiShoppingCart}
                  count={3}
                  onClick={() => setIsCartOpen(true)}
                  color="purple"
                />

                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="relative group"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white transform transition-all duration-300 group-hover:scale-110">
                      <FiUser size={18} />
                    </div>
                  </button>

                  {isProfileOpen && isAuthenticated && (
                    <PopupMenuMobile 
                      user={{ name: user.name, email: user.email, revisado: user.revisado }}
                      logout={logout}
                      handleNavigate={handleNavigate}
                      isAuthenticated={isAuthenticated}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Search Bar */}
            {isSearchOpen && (
              <div className="py-2">
                <div className="relative search-container group">
                  <input
                    type="text"
                    placeholder="Pesquisar produtos..."
                    className="w-full py-2 px-4 rounded-full border border-white/20 bg-white/10 backdrop-blur-md focus:outline-none focus:border-blue-500/50 text-gray-800 placeholder-gray-500 group-hover:border-blue-500/30"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setIsSearchOpen(false);
                        navigate(`/search?q=${searchTerm}`);
                      }
                    }}
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors">
                    <FiSearch size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Bottom Navigation */}
            <div className="flex justify-between items-center py-2">
              <IconButton
                icon={FiHome}
                onClick={() => handleNavigate('/')}
                color="blue"
              />
              
              <IconButton
                icon={FiMessageSquare}
                count={5}
                onClick={() => handleNavigate('/messages')}
                color="green"
              />
              
              <IconButton
                icon={FiBell}
                count={3}
                onClick={() => handleNavigate('/notifications')}
                color="red"
              />
              
              <IconButton
                icon={FiMenu}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                color="purple"
              />
            </div>
          </div>
        </div>
      </div>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}

export default Header;