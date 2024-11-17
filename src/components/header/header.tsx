import { useLocation } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import HeaderLogo from './header-logo';
import SearchBar from './search';
import DesktopMenu from './desktop-menu';
import MobileMenu from './mobile-menu';
import CategoryNav from './category-nav';

import CartIcon from './cart-icon';
import ProfileIcon from './profile-icon';
import { useState } from 'react';

const Header = () => {
  const { pathname } = useLocation();
  const isActivePath = (path: string) => pathname === path;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  return (
    <header className="w-full relative">
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <HeaderLogo />
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <SearchBar isMobile={false} />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-11">
            <DesktopMenu />
            <div className="flex items-center space-x-6">
              <CartIcon cartCount={cartCount} isActive={isActivePath('/cart')} />
              <ProfileIcon isActive={isActivePath('/profile')} />
            </div>
          </nav>

          {/* Mobile Icons */}
          <div className="flex md:hidden items-center space-x-4">
            <CartIcon cartCount={cartCount} isActive={isActivePath('/cart')} />
            <ProfileIcon isActive={isActivePath('/profile')} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="block md:hidden"
            >
              {isMobileMenuOpen ? (
                <IoClose className="w-6 h-6" />
              ) : (
                <RxHamburgerMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden">
        <SearchBar isMobile={true} />
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} />
      <CategoryNav />
    </header>
  );
};

export default Header;
