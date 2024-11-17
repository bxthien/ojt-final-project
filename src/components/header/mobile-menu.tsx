import { Link, useLocation } from 'react-router-dom';
import { menuItems, categoryItems } from '../../constants/data';

const MobileMenu = ({ isOpen }: { isOpen: boolean }) => {
  const location = useLocation();
  const isActivePath = (path: string) => location.pathname.startsWith(path);

  return (
    isOpen && (
      <div className="md:hidden bg-white shadow-lg">
        <nav className="p-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`block py-2 ${
                isActivePath(item.href)
                  ? 'text-[#56B280] font-bold'
                  : 'text-gray-700 hover:text-[#56B280] hover:font-bold'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <hr className="my-2" />
          {categoryItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`block flex items-center py-2 transition-all space-x-2 whitespace-nowrap ${
                isActivePath(item.href)
                  ? 'text-[#56B280] font-bold'
                  : 'text-gray-700 hover:text-gray-900 hover:font-bold'
              }`}
            >
              <item.Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    )
  );
};

export default MobileMenu;
