import React from 'react';
import { Input, Form } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { emailValidator, passwordValidator, phoneValidator } from '../../constants/regex';

interface InputProps {
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'phone';
  name: string;
  [key: string]: unknown;
}

const CustomInput: React.FC<InputProps> = ({ placeholder, type = 'text', name, ...props }) => {
  const commonClasses = 'bg-[#EAF0F7] border-none p-2 color-[#4F555A]';

  return (
    <Form.Item
      name={name}
      rules={
        type === 'email'
          ? [{ validator: emailValidator }]
          : type === 'password'
            ? [{ validator: passwordValidator }]
            : type === 'phone'
              ? [{ validator: phoneValidator }]
              : []
      }
    >
      {type === 'password' ? (
        <Input.Password
          className={commonClasses}
          placeholder={placeholder}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          {...props}
        />
      ) : (
        <Input className={commonClasses} placeholder={placeholder} {...props} />
      )}
    </Form.Item>
  );
};

export default CustomInput;
