import React from 'react';
import { Collapse } from 'antd';
import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

interface SidebarProps {
  url: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  username: string;
}

const Sidebar: React.FC<SidebarProps> = ({ url, activeTab, setActiveTab, username }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <div className="flex items-center p-4 bg-white shadow-md rounded-lg mb-4">
        {url ? (
          <img
            src={url}
            alt="User Avatar"
            sizes="large"
            className="w-12 h-12 rounded-full border-2 mr-3"
          />
        ) : (
          <div className="w-12 h-12 rounded-full border-2 mr-3 flex items-center justify-center bg-gray-100 text-gray-500">
            <UserOutlined style={{ fontSize: '24px' }} />
          </div>
        )}
        <div>
          <p className="text-gray-600 text-sm">
            {t('sidebar.hello')}
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
          <Panel header={t('sidebar.myAccount')} key="1">
            <ul className="space-y-2">
              <li
                className="cursor-pointer pl-4 text-gray-600 hover:text-[#56B280]"
                onClick={() => setActiveTab('profile')}
              >
                {t('sidebar.profile')}
              </li>
              <li
                className="cursor-pointer pl-4 text-gray-600 hover:text-[#56B280]"
                onClick={() => setActiveTab('password')}
              >
                {t('sidebar.changePassword')}
              </li>
            </ul>
          </Panel>
          <Panel header={t('sidebar.myOrders')} key="2">
            <ul className="space-y-2">
              <li
                className="cursor-pointer pl-4 text-gray-600 hover:text-[#56B280]"
                onClick={() => setActiveTab('orders')}
              >
                {t('sidebar.orderHistory')}
              </li>
            </ul>
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
          <Panel header={t('sidebar.myAccount')} key="1">
            <ul className="space-y-2">
              <li
                className={`cursor-pointer pl-4 transition-colors duration-300 ${activeTab === 'profile' ? 'text-[#56B280] font-bold' : 'text-gray-600 hover:text-[#56B280]'}`}
                onClick={() => setActiveTab('profile')}
              >
                {t('sidebar.profile')}
              </li>
              <li
                className={`cursor-pointer pl-4 transition-colors duration-300 ${activeTab === 'password' ? 'text-[#56B280] font-bold' : 'text-gray-600 hover:text-[#56B280]'}`}
                onClick={() => setActiveTab('password')}
              >
                {t('sidebar.changePassword')}
              </li>
            </ul>
          </Panel>
          <Panel header={t('sidebar.myOrders')} key="2">
            <ul className="space-y-2">
              <li
                className={`cursor-pointer pl-4 transition-colors duration-300 ${activeTab === 'orders' ? 'text-[#56B280] font-bold' : 'text-gray-600 hover:text-[#56B280]'}`}
                onClick={() => setActiveTab('orders')}
              >
                {t('sidebar.orderHistory')}
              </li>
            </ul>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default Sidebar;
