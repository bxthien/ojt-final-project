import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import HeaderLogo from './header-logo';
import DesktopMenu from './desktop-menu';
import MobileMenu from './mobile-menu';
import CategoryNav from './category-nav';
import CartIcon from './cart-icon';
import ProfileIcon from './profile-icon';
import { Button } from 'antd';
import { CiSearch } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Search from './search';
import LanguageSelector from '../common/language';
import { useTranslation } from 'react-i18next';
import { getProfile } from '../../constants/service';
import { updateProfile } from '../../redux/auth/authSlice';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount] = useState<number>(0);
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const username = useSelector((state: RootState) => state.auth.username);
  const url = useSelector((state: RootState) => state.auth.url);

  useEffect(() => {
    getProfile()
      .then((response) => {
        dispatch(
          updateProfile({
            username: response.username || '',
            url: response.url || '',
          })
        );
      })
      .catch((error) => {
        console.error('Failed to fetch profile:', error);
      });
  }, [dispatch]);

  const handleLogin = () => {
    if (isAuth) {
      navigate('/profile');
    } else {
      navigate('/sign-in');
    }
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const isActivePath = (path: string) => pathname === path;

  return (
    <header className="w-full relative">
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <HeaderLogo />
          </div>

          <div className="hidden lg:flex items-center flex-1 max-w-lg mx-8">
            <Search placeholder={t('header.searchPlaceholder')} isMobile={false} />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-11">
            <DesktopMenu />
            <div className="flex items-center space-x-6">
              <CartIcon cartCount={cartCount} isActive={isActivePath('/cart')} />
              <LanguageSelector />
              {isAuth ? (
                <div className="flex items-center space-x-4 cursor-pointer">
                  {isAuth && (
                    <ProfileIcon username={username} url={url} isActive={pathname === '/profile'} />
                  )}
                </div>
              ) : (
                <Button
                  type="primary"
                  onClick={handleLogin}
                  className="py-4 bg-[#56B280] font-semibold"
                >
                  {t('header.signIn')}
                </Button>
              )}
            </div>
          </nav>

          <div className="flex lg:hidden items-center space-x-4">
            <CiSearch className="w-6 h-6 cursor-pointer" onClick={toggleSearch} />
            <CartIcon cartCount={cartCount} isActive={isActivePath('/cart')} />
            <LanguageSelector />
            {isAuth ? (
              <ProfileIcon username={''} url={url} isActive={pathname === '/profile'} />
            ) : (
              <Button
                type="primary"
                className="py-4 bg-[#56B280] font-semibold"
                size="small"
                onClick={handleLogin}
              >
                {t('header.signIn')}
              </Button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="block lg:hidden"
              aria-label={isMobileMenuOpen ? t('header.closeMenu') : t('header.openMenu')}
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
          <Search placeholder={t('header.searchPlaceholder')} isMobile={true} />
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
