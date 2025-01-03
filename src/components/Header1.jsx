import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FiPlus, FiShoppingCart, FiSearch, FiHome, FiMessageSquare, FiBell, FiMenu, FiUser, FiSettings, FiHelpCircle, FiLogOut, FiGrid, FiEdit3 } from 'react-icons/fi';
import Cart from './Cart';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import PopUpMenu from './popupmenu/popup_menu';
import PopupMenuDeskTop from './popupmenu/popupmenu_desktop';
import PopupMenuMobile from './popupmenu/popup_menu_mobile';
import { suggestedProducts } from '../data/sugest';
import { Notifications } from './popupmenu/notifications';
import SearchCard from './popupmenu/searchCard';
import PublishProductCard from './PublishProduct';
import { CandyButton } from './buttons/CandyButtons';


function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSearchCard, setShowSearchCard] = useState(false);
  const [showPostDialog,setShowPostDialog]= useState(false);
  
  const [isNotificationOpen,setIsNotificationOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const menuClickedRef = useRef(false);
  const {user,isAuthenticated,logout}=useContext(AuthContext)
  const NotificationRef = useRef(null);
  const SearchcardRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      // Se o clique foi em um item do menu, não fechamos o menu
      if (menuClickedRef.current) {
        menuClickedRef.current = false;
        return;
      }

      // Se o clique foi fora do menu, fechamos ele
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
        
      }
      if(NotificationRef.current && !NotificationRef.current.contains(event.target)){
        setIsNotificationOpen(false)
      }
      if(SearchcardRef.current && !SearchcardRef.current.contains(event.target)){
        setShowSearchCard(false)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (route) => {
    // Marcamos que o clique foi em um item do menu
    menuClickedRef.current = true;
    navigate(route);
    // Fechamos o menu após um pequeno delay para garantir que o handleClickOutside não interfira
    setTimeout(() => {
      setIsProfileOpen(false);
      setIsMobileMenuOpen(false);
    }, 100);
  };

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsProfileOpen(false);
  };

  const handleSearchSelect = (product) => {
    setSearchTerm(product);
    navigate(`/search?q=${product}`);
    setIsSearchOpen(false);
    setShowSuggestions(false)
  };
  const hangleNotification=()=>{
    setIsNotificationOpen(!isNotificationOpen)
  }

  const toggleProfileMenu = () => {
    menuClickedRef.current = true;
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className=" shadow-sm sticky top-0 z-50 ">
      <div className="container mx-auto px-4">
      {showSearchCard && (<div ref={SearchcardRef}> 
        <SearchCard />
      </div>)}
        {/* Desktop Header */}
        <div className="hidden md:flex flex-col md:flex-row justify-between items-center py-2">
          <div className="flex items-center mb-4 md:mb-0">
            <button 
              onClick={() => handleNavigate('/')} 
              className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
            >
              SkyVenda MZ
            </button>
          </div>
          <div className="flex-grow mx-4 relative max-w-[400px] w-full">
            <div className="relative search-container">
            <input
                type="text"
                placeholder="Pesquisar produtos..."
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true); 
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setIsSearchOpen(false)
                    navigate(`/search?q=${searchTerm}`)
                  }
                }}
                onFocus={()=>setShowSearchCard(!showSearchCard)}
              />

              <button  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500">
                <FiSearch size={20} />
              </button>
              
              
            </div>
            {searchTerm && showSuggestions &&(
              <ul className="absolute z-10 bg-white w-full mt-1 rounded-md shadow-lg max-h-60 overflow-auto">
                {suggestedProducts
                  .filter((product) =>
                    product.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((product, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        handleSearchSelect(product)
                        setShowSuggestions(false)
                        
                      }}
                    >
                      {product}
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <div className="flex items-center space-x-6">
            {/* <CandyButton/> */}
            <button onClick={() => setShowPostDialog(true)} className="text-white flex gap-2
             bg-gray-800 hover:bg-gray-600 px-3 py-2 rounded-full ">
              <FiPlus size={24} className='font-bold'/>
              <span>postar</span>
            </button>
            
            <div className='hover:bg-indigo-200 w-[40px] h-[40px] rounded-full flex items-center justify-center'>
            <button onClick={() => hangleNotification()} className="text-gray-600 hover:text-blue-600 relative">
              <FiBell size={24} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-[18px] h-[18px] flex items-center justify-center">
                3
              </span>
            </button>
            </div>
            <button onClick={() => handleNavigate('/messages')} className="text-gray-600 hover:text-blue-600 relative">
              <FiMessageSquare size={24} />
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-[18px] h-[18px] flex items-center justify-center">
                5
              </span>
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-gray-600 hover:text-blue-600 relative cursor-pointer"
            >
              <FiShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-[18px] h-[18px] flex items-center justify-center">
                3
              </span>
            </button>
            <div className="relative" ref={profileRef}>
            <button
                onClick={toggleProfileMenu}
                className="relative flex items-center space-x-2 cursor-pointer"
              >
                {isAuthenticated ? (
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 p-[2px]">
                    <img
                      src={`https://skyvendamz.up.railway.app/perfil/${user.perfil}`}
                      alt="Profile"
                      className="w-full h-full rounded-full border-2 border-white"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 flex items-center justify-center text-white">
                    <FiUser size={20} />
                  </div>
                )}
              </button>


              {/* Profile Popup Menu */}
              {isProfileOpen && isAuthenticated && user && (
                <PopupMenuDeskTop
                  user={{
                    name: user.name || '',
                    email: user.email || '',
                    revisado: user.revisado || false,
                    perfil: user.perfil || ''
                  }}
                  logout={logout}
                  handleNavigate={handleNavigate}
                  isAuthenticated={isAuthenticated}
                />
              )}

            {isProfileOpen && !isAuthenticated &&(
                <PopUpMenu  handleNavigate={handleNavigate}/>
              )}
            {isNotificationOpen &&(
              <Notifications/>
            )}
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden">
          {/* Top Row */}
          <div className="flex justify-between items-center py-3">
            <button 
              onClick={() => handleNavigate('/')} 
              className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
            >
              SkyVenda MZ
            </button>
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-gray-600">
                <FiSearch size={24} />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="text-gray-600 relative"
              >
                <FiShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-[18px] h-[18px] flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfileMenu}
                  className="text-gray-600 relative"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                    <FiUser size={18} />
                  </div>
                </button>

                {/* Mobile Profile Popup */}
                {isProfileOpen && isAuthenticated &&(
                  <PopupMenuMobile user={{ name: user.name, email: user.email,revisado: user.revisado,perfil: user.perfil }} logout={logout} handleNavigate={handleNavigate} isAuthenticated={isAuthenticated}/>
                )}
              </div>
            </div>
          </div>

          {/* Search Bar (conditionally rendered) */}
          {isSearchOpen==true && (
            <div className="py-2">
              <input
                type="text"
                placeholder="Pesquisar produtos..."
                className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setShowSuggestions(true)
                  
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setIsSearchOpen(false)
                    navigate(`/search?q=${searchTerm}`)
                  }
                }}
              />
            </div>
          )}

          {/* Bottom Row */}
          <div className="flex justify-between items-center py-2">
            <button onClick={() => handleNavigate('/')} className="text-gray-600 flex flex-col items-center">
              <FiHome size={24} />
              <span className="text-xs mt-1">Início</span>
            </button>
            <button onClick={() => handleNavigate('/messages')} className="text-gray-600 flex flex-col items-center relative">
              <FiMessageSquare size={24} />
              <span className="text-xs mt-1">Mensagens</span>
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-[18px] h-[18px] flex items-center justify-center">
                5
              </span>
            </button>
            <button onClick={() => hangleNotification()} className="text-gray-600 flex flex-col items-center relative" >
              <FiBell size={24} />
              <span className="text-xs mt-1">Notificações</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-[18px] h-[18px] flex items-center justify-center">
                3
              </span>
            </button>
            {isNotificationOpen &&(
              <div ref={NotificationRef}>
                <Notifications/>
              </div>

              
            )}
            <button onClick={handleMobileMenuClick} className="text-gray-600 flex flex-col items-center">
              <FiMenu size={24} />
              <span className="text-xs mt-1">Menu</span>
            </button>
          </div>
        </div>
      </div>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        {/* Publish Product Card */}
      <PublishProductCard 
        isOpen={showPostDialog}
        onClose={() => setShowPostDialog(false)}
      />
    </header>
  );
}

export default Header;