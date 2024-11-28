import React from 'react';
import { FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface ProfileIconProps {
  isActive: boolean;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ isActive }) => {
  return (
    <Link
      to="/sign-in"
      className={`relative p-1 hover:text-[#56B280] ${
        isActive ? 'text-[#56B280] font-bold' : 'text-gray-700'
      }`}
    >
      <FaRegUser className="w-6 h-6" />
    </Link>
  );
};

export default ProfileIcon;
