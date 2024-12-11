import { Dropdown, Space } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const items = [
    {
      label: (
        <div className="flex items-center space-x-2">
          <img
            src="https://flagcdn.com/w320/gb.png"
            alt="English"
            className="w-4 h-4 rounded-full"
          />
          <span>English</span>
        </div>
      ),
      key: 'en',
      onClick: () => {
        setCurrentLanguage('en');
        i18n.changeLanguage('en');
      },
    },
    {
      label: (
        <div className="flex items-center space-x-2">
          <img
            src="https://flagcdn.com/w320/vn.png"
            alt="Vietnamese"
            className="w-4 h-4 rounded-full"
          />
          <span>Vietnamese</span>
        </div>
      ),
      key: 'vi',
      onClick: () => {
        setCurrentLanguage('vi');
        i18n.changeLanguage('vi');
      },
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']} className="cursor-pointer">
      <Space>
        <div className="flex items-center space-x-2">
          <img
            src={
              currentLanguage === 'en'
                ? 'https://flagcdn.com/w320/gb.png'
                : 'https://flagcdn.com/w320/vn.png'
            }
            alt={currentLanguage === 'en' ? 'English' : 'Vietnamese'}
            className="w-4 h-4 rounded-full"
          />
          <span className="text-sm">{currentLanguage === 'en' ? 'EN' : 'VI'}</span>
        </div>
      </Space>
    </Dropdown>
  );
};

export default LanguageSelector;
