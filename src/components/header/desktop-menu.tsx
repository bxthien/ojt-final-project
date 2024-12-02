import { useLocation, useNavigate } from 'react-router-dom';
import { menuItems } from '../../constants/data';

const DesktopMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path) && location.pathname !== '/';
  };

  const handleClick = (href: string) => {
    navigate(href);
  };

  return (
    <nav className="hidden md:flex items-center space-x-12">
      {menuItems.map((item) => (
        <button
          key={item.label}
          onClick={() => handleClick(item.href)}
          className={`transition ${
            isActivePath(item.href)
              ? 'text-[#56B280] font-normal'
              : 'text-gray-700 hover:text-[#56B280] hover:font-normal'
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default DesktopMenu;
