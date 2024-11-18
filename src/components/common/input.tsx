import React from 'react';
import { Input as AntInput, Form } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

interface InputProps {
  placeholder?: string;
  type?: 'text' | 'password' | 'email';
  name: string;
  [key: string]: unknown;
}

const Input: React.FC<InputProps> = ({ placeholder, type = 'text', name, ...props }) => {
  const commonClasses = 'bg-[#EAF0F7] border-none p-2 color-[#4F555A]';

  const emailValidator = (_rule: unknown, value: string) => {
    if (!value) {
      return Promise.reject('Please input your email!');
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      return Promise.reject('Please input a valid email!');
    }
    return Promise.resolve();
  };

  const passwordValidator = (_rule: unknown, value: string) => {
    if (!value) {
      return Promise.reject('Please input your password!');
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(value)) {
      return Promise.reject(
        'Password must be at least 8 characters long and contain both letters and numbers!'
      );
    }
    return Promise.resolve();
  };

  return (
    <Form.Item
      name={name}
      rules={
        type === 'email'
          ? [{ validator: emailValidator }]
          : type === 'password'
            ? [{ validator: passwordValidator }]
            : []
      }
    >
      {type === 'password' ? (
        <AntInput.Password
          className={commonClasses}
          placeholder={placeholder}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          {...props}
        />
      ) : (
        <AntInput className={commonClasses} placeholder={placeholder} {...props} />
      )}
    </Form.Item>
  );
};

export default Input;
