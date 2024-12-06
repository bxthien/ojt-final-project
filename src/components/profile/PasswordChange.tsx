import React from 'react';
import { Form, Input, Button, FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';

interface PasswordChangeProps {
  form: FormInstance;
  handleChangePassword: (values: { oldPassword: string; newPassword: string }) => void;
}

const PasswordChange: React.FC<PasswordChangeProps> = ({ form, handleChangePassword }) => {
  const { t } = useTranslation();

  return (
    <Form form={form} layout="vertical" onFinish={handleChangePassword}>
      <Form.Item
        label={t('passwordChange.oldPassword')}
        name="oldPassword"
        rules={[{ required: true, message: t('passwordChange.oldPasswordRequired') }]}
      >
        <Input.Password className="border-2 border-gray-300 p-2 rounded-md" />
      </Form.Item>
      <Form.Item
        label={t('passwordChange.newPassword')}
        name="newPassword"
        rules={[{ required: true, message: t('passwordChange.newPasswordRequired') }]}
      >
        <Input.Password className="border-2 border-gray-300 p-2 rounded-md" />
      </Form.Item>
      <Form.Item
        label={t('passwordChange.confirmPassword')}
        name="confirmPassword"
        rules={[{ required: true, message: t('passwordChange.confirmPasswordRequired') }]}
      >
        <Input.Password className="border-2 border-gray-300 p-2 rounded-md" />
      </Form.Item>
      <Button htmlType="submit" className="bg-[#56B280] text-white w-full sm:w-auto">
        {t('passwordChange.changePasswordButton')}
      </Button>
    </Form>
  );
};

export default PasswordChange;
