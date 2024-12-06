import React from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

interface SidebarProps {
  url: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  username: string;
}

const Sidebar: React.FC<SidebarProps> = ({ url, activeTab, setActiveTab, username }) => {
  return (
    <div className="w-full">
      <div className="flex items-center p-4 bg-white shadow-md rounded-lg mb-4">
        <img src={url} alt="User Avatar" className="w-12 h-12 rounded-full border-2 mr-3" />
        <div>
          <p className="text-gray-600 text-sm">
            Hello{' '}
            <span role="img" aria-label="wave">
              👋
            </span>
          </p>
          <h4 className="text-lg font-bold text-black">{username || 'User'}</h4>
        </div>
      </div>

      {/* Mobile View (Collapsed Sidebar) */}
      <div className="lg:hidden">
        <Collapse
          defaultActiveKey={['1']}
          bordered={false}
          expandIconPosition="end"
          className="bg-white"
        >
          <Panel header="My Account" key="1">
            <ul className="space-y-2">
              <li
                className="cursor-pointer pl-4 text-gray-600 hover:text-[#56B280]"
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </li>
              <li
                className="cursor-pointer pl-4 text-gray-600 hover:text-[#56B280]"
                onClick={() => setActiveTab('password')}
              >
                Change Password
              </li>
            </ul>
          </Panel>
          <Panel header="My Orders" key="2">
            <ul className="space-y-2">
              <li
                className="cursor-pointer pl-4 text-gray-600 hover:text-[#56B280]"
                onClick={() => setActiveTab('orders')}
              >
                Order History
              </li>
            </ul>
          </Panel>
          <Panel header="My Wishlist" key="3">
            <p className="cursor-pointer pl-4">Wishlist Items</p>
          </Panel>
        </Collapse>
      </div>

      {/* Desktop View (Expanded Sidebar) */}
      <div className="hidden lg:block">
        <Collapse
          defaultActiveKey={['1']}
          bordered={false}
          expandIconPosition="end"
          className="bg-white"
        >
          <Panel header="My Account" key="1">
            <ul className="space-y-2">
              <li
                className={`cursor-pointer pl-4 transition-colors duration-300 ${activeTab === 'profile' ? 'text-[#56B280] font-bold' : 'text-gray-600 hover:text-[#56B280]'}`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </li>
              <li
                className={`cursor-pointer pl-4 transition-colors duration-300 ${activeTab === 'password' ? 'text-[#56B280] font-bold' : 'text-gray-600 hover:text-[#56B280]'}`}
                onClick={() => setActiveTab('password')}
              >
                Change Password
              </li>
            </ul>
          </Panel>
          <Panel header="My Orders" key="2">
            <ul className="space-y-2">
              <li
                className="cursor-pointer pl-4 text-gray-600 hover:text-[#56B280]"
                onClick={() => setActiveTab('orders')}
              >
                Order History
              </li>
            </ul>
          </Panel>
          <Panel header="My Wishlist" key="3">
            <p className="cursor-pointer pl-4">Wishlist Items</p>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default Sidebar;
