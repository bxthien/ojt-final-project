import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, message, Space } from 'antd';
import { FaRegUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

interface ProfileIconProps {
  isActive: boolean;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ isActive }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    message.success('Logged out successfully');
    navigate('/sign-in');
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: '2',
      label: <Link to="/billing">Billing</Link>,
    },
    {
      key: '3',
      label: (
        <Link to="/settings">
          <Space>
            <SettingOutlined />
            Settings
          </Space>
        </Link>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '4',
      label: <span onClick={handleLogout}>Logout</span>,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['hover']}>
      <a
        onClick={(e) => e.preventDefault()}
        className={`relative p-1 hover:text-[#56B280] ${isActive ? 'text-[#56B280] font-bold' : 'text-gray-700'}`}
      >
        <Space>
          <FaRegUser className="w-6 h-6" />
        </Space>
      </a>
    </Dropdown>
  );
};

export default ProfileIcon;
