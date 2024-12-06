import React from 'react';
import { SettingOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, message, Space } from 'antd';
import { FaRegUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/authSlice';

interface ProfileIconProps {
  isActive: boolean;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ isActive }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    dispatch(logout());
    message.success('Logged out successfully');
    navigate('/');
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to="/profile">
          <Space>
            <UserOutlined />
            Profile
          </Space>
        </Link>
      ),
    },
    {
      key: '2',
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
      key: '3',
      label: (
        <span onClick={handleLogout}>
          <Space>
            <LogoutOutlined />
            Logout
          </Space>
        </span>
      ),
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
