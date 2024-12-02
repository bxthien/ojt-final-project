import { useLocation, useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MdLogout } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
import HeaderLogo from './header-logo';
import DesktopMenu from './desktop-menu';
import MobileMenu from './mobile-menu';
import CategoryNav from './category-nav';
import CartIcon from './cart-icon';
import ProfileIcon from './profile-icon';
import { Button } from 'antd';
import { useState } from 'react';
import Search from './search';
import { CiSearch } from 'react-icons/ci';
import { useAuth } from '../../hook/useAuth';
import { useLogout } from '../../constants/service';

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isActivePath = (path: string) => pathname === path;
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const isAuth = useAuth();
  const { logOut } = useLogout();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount] = useState<number>(0);

  const handleLogin = () => {
    if (isAuth) {
      navigate('/profile');
    } else {
      navigate('/sign-in');
    }
  };

  const handleLogout = () => {
    logOut();
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <header className="w-full relative">
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <HeaderLogo />
          </div>

          {/* Search Bar  */}
          <div className="hidden lg:flex items-center flex-1 max-w-lg mx-8">
            <Search placeholder="Search for products..." isMobile={false} />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-11">
            <DesktopMenu />
            <div className="flex items-center space-x-6">
              <CartIcon cartCount={cartCount} isActive={isActivePath('/cart')} />
              {isAuth ? (
                <div className="flex items-center space-x-4">
                  <ProfileIcon isActive={isActivePath('/profile')} />
                  <Button type="link" onClick={handleLogout} className="text-[#56B280] text-2xl">
                    <MdLogout />
                  </Button>
                </div>
              ) : (
                <Button
                  type="primary"
                  onClick={handleLogin}
                  className="py-4 bg-[#56B280] font-semibold"
                >
                  Sign In
                </Button>
              )}
            </div>
          </nav>
          <div className="flex lg:hidden items-center space-x-4">
            <CiSearch className="w-6 h-6 cursor-pointer" onClick={toggleSearch} />
            {/* <SearchIcon /> */}
            <CartIcon cartCount={cartCount} isActive={isActivePath('/cart')} />
            {isAuth ? (
              <>
                <ProfileIcon isActive={isActivePath('/profile')} />
                <Button type="link" onClick={handleLogout} className="text-[#56B280] text-2xl">
                  <MdLogout />
                </Button>
              </>
            ) : (
              <Button
                type="primary"
                className="py-4 bg-[#56B280] font-semibol"
                size="small"
                onClick={() => navigate('/sign-in')}
              >
                Sign In
              </Button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="block lg:hidden"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
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
      {isSearchVisible && (
        <div className="lg:hidden">
          <Search placeholder="Search for product..." isMobile={true} />
        </div>
      )}

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <div className="hidden lg:block">
        <CategoryNav />
      </div>
    </header>
  );
};

export default Header;
