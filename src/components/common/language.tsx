import { Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const items = [
    {
      label: 'English',
      key: 'en',
      onClick: () => {
        setCurrentLanguage('en');
        i18n.changeLanguage('en');
      },
    },
    {
      label: 'Vietnamese',
      key: 'vi',
      onClick: () => {
        setCurrentLanguage('vi');
        i18n.changeLanguage('vi');
      },
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Space>
        {currentLanguage === 'en' ? 'English' : 'Vietnamese'}
        <DownOutlined />
      </Space>
    </Dropdown>
  );
};

export default LanguageSelector;
