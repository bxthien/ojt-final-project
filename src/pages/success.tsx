import { Button, Dropdown, Image, MenuProps, Space } from 'antd';
import { DownOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { authenticationType } from '../constants/login';
import Background from '../assets/images/background.png';
import Successfull from '../assets/images/success.png';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Forgot = () => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const items: MenuProps['items'] = [
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
    <div className="flex flex-col h-screen w-screen justify-between p-4 md:p-12 bg-[#F6F6F6]">
      <Image
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src={Background}
        preview={false}
      />
      <div className="flex items-center justify-end gap-6 p-4">
        <div className="flex w-3/5 justify-start ">
          <Link to="/forgot" className=" text-black">
            <ArrowLeftOutlined />
          </Link>
        </div>
        <Dropdown menu={{ items }} trigger={['click']}>
          <Space>
            {currentLanguage === 'en' ? 'English' : 'Vietnamese'}
            <DownOutlined />
          </Space>
        </Dropdown>
        {authenticationType.map((item) => (
          <div
            key={item.value}
            className="text-sm text-[#56B280] font-semibold px-3 py-1 bg-white shadow-lg rounded-2xl"
          >
            {t(item.text)}
          </div>
        ))}
        <Button className="bg-[#56B280] px-4 py-2" type="primary">
          <Link to="/home">{t('common.button.home')}</Link>
        </Button>
      </div>

      <div className="flex-grow flex flex-col gap-3 items-center justify-center">
        <Image
          className="h-24 w-24 text-green-500 mb- z-0 pointer-events-none"
          src={Successfull}
          preview={false}
        />
        <div className="mb-4 text-3xl font-medium text-center">{t('success.success')}</div>
        <div className="mb-4 text-sm font-light text-center text-[#4F555A]">
          {t('success.check')}
        </div>
        <div className="w-full max-w-md">
          <Link to="/sign-in">
            <Button className="w-full py-2 bg-[#56B280] font-semibold" type="primary">
              {t('common.button.continue')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
