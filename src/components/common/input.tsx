import React from 'react';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

interface Input {
  type?: 'text' | 'password' | 'email' | 'phone';
  placeholder?: string;
  [key: string]: unknown;
}

const CustomInput: React.FC<Input> = ({ type = 'text', placeholder, ...props }) => {
  const commonClasses = 'bg-[#EAF0F7] border-none p-2 color-[#4F555A]';

  if (type === 'password') {
    return (
      <Input.Password
        className={commonClasses}
        placeholder={placeholder}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        {...props}
      />
    );
  }

  return <Input className={commonClasses} placeholder={placeholder} {...props} />;
};

export default CustomInput;
