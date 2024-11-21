import { Link, useLocation } from 'react-router-dom';
import { menuItems } from '../../constants/data';

const DesktopMenu = () => {
  const location = useLocation();
  const isActivePath = (path: string) => location.pathname.startsWith(path);

  return (
    <nav className="hidden md:flex items-center space-x-12">
      {menuItems.map((item) => (
        <Link
          key={item.label}
          to={item.href}
          className={`transition ${
            isActivePath(item.href)
              ? 'text-[#56B280] font-bold'
              : 'text-gray-700 hover:text-[#56B280] hover:font-bold'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopMenu;
