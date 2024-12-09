import { useLocation } from 'react-router-dom';
import { menuItems, categoryItems } from '../../constants/data';
import { useTranslation } from 'react-i18next';

const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const location = useLocation();
  const { t } = useTranslation();

  // Xác định trạng thái active chính xác
  const isActivePath = (path: string) => location.pathname === path;

  return (
    isOpen && (
      <div className="lg:hidden bg-white shadow-lg absolute w-full z-50">
        <nav className="p-4">
          {/* Menu Items */}
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => onClose()} // Đóng menu khi nhấn vào link
              className={`block py-2 ${
                isActivePath(item.href)
                  ? 'text-[#56B280] font-bold'
                  : 'text-gray-700 hover:text-[#56B280] hover:font-bold'
              }`}
            >
              {t(item.label)}
            </a>
          ))}

          <hr className="my-2" />

          {/* Category Items */}
          {categoryItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => onClose()} // Đóng menu khi nhấn vào link
              className={`flex items-center py-2 transition-all space-x-2 whitespace-nowrap ${
                isActivePath(item.href)
                  ? 'text-[#56B280] font-bold'
                  : 'text-gray-700 hover:text-gray-900 hover:font-bold'
              }`}
            >
              <item.Icon className="w-5 h-5" />
              <span>{t(item.label)}</span>
            </a>
          ))}
        </nav>
      </div>
    )
  );
};

export default MobileMenu;
