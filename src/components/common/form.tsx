import React from 'react';
import { emailValidator, passwordValidator, phoneValidator } from '../../constants/regex';
import { Form } from 'antd';
import { Rule } from 'antd/es/form';

interface CustomFormItem {
  name: string;
  type?: 'text' | 'password' | 'email' | 'phone';
  rules?: Rule[];
  children: React.ReactNode;
}

const getDefaultRules = (type?: string): Rule[] => {
  switch (type) {
    case 'email':
      return [{ validator: emailValidator }];
    case 'password':
      return [{ validator: passwordValidator }];
    case 'phone':
      return [{ validator: phoneValidator }];
    default:
      return [];
  }
};

const FormItem: React.FC<CustomFormItem> = ({ name, type, rules = [], children }) => {
  const defaultRules = getDefaultRules(type);

  return (
    <Form.Item name={name} rules={[...defaultRules, ...rules]}>
      {children}
    </Form.Item>
  );
};

export default FormItem;
