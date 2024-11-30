import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { categoryItems } from '../../constants/data';

const CategoryNav = () => {
  const location = useLocation();
  const isActivePath = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="bg-[#56B280] text-white overflow-x-auto hidden md:block">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-between h-12">
          {categoryItems.map((item, index) => (
            <React.Fragment key={item.label}>
              <Link
                to={item.href}
                className={`flex items-center justify-center space-x-2 transition-all px-8 py-3 whitespace-nowrap ${
                  isActivePath(item.href) ? 'text-gray-900' : 'hover:bg-slate-200 hover:text-black'
                }`}
              >
                <item.Icon className="w-5 h-5 mr-2" />
                {item.label}
              </Link>
              {index < categoryItems.length - 1 && <span className="h-6 w-px bg-[#CFCFCF]" />}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CategoryNav;
