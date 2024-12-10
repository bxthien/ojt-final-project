import React from 'react';
import { SettingOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, message, Space, Avatar } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/authSlice';

interface ProfileIconProps {
  isActive: boolean;
  username: string;
  url: string;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ isActive, username, url }) => {
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
          <Avatar src={url} alt="User Avatar" size="small" className="border-2 border-[#56B280]" />
          <span className="font-medium text-sm">{username}</span>
        </Space>
      </a>
    </Dropdown>
  );
};

export default ProfileIcon;
