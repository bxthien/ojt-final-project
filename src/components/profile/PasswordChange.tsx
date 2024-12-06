import React from 'react';
import { Form, Input, Button, FormInstance } from 'antd';

interface PasswordChangeProps {
  form: FormInstance;
  handleChangePassword: (values: { oldPassword: string; newPassword: string }) => void;
}

const PasswordChange: React.FC<PasswordChangeProps> = ({ form, handleChangePassword }) => {
  return (
    <Form form={form} layout="vertical" onFinish={handleChangePassword}>
      <Form.Item
        label="Old Password"
        name="oldPassword"
        rules={[{ required: true, message: 'Please input your old password!' }]}
      >
        <Input.Password className="border-2 border-gray-300 p-2 rounded-md" />
      </Form.Item>
      <Form.Item
        label="New Password"
        name="newPassword"
        rules={[{ required: true, message: 'Please input your new password!' }]}
      >
        <Input.Password className="border-2 border-gray-300 p-2 rounded-md" />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        rules={[{ required: true, message: 'Please input your confirm password!' }]}
      >
        <Input.Password className="border-2 border-gray-300 p-2 rounded-md" />
      </Form.Item>
      <Button htmlType="submit" className="bg-[#56B280] text-white w-full sm:w-auto">
        Change Password
      </Button>
    </Form>
  );
};

export default PasswordChange;
