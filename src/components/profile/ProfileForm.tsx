import React from 'react';
import { Form, Input, Button, Row, Col, FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';
import AvatarUpload from './AvatarUpload';

interface ProfileFormProps {
  form: FormInstance;
  url: string;
  setUrl: (url: string) => void;
  setUploading: (uploading: boolean) => void;
  handleSaveChanges: (values: {
    username: string;
    email: string;
    address: string;
    phone: string;
    description: string;
    url: string;
  }) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  form,
  url,
  setUrl,
  setUploading,
  handleSaveChanges,
}) => {
  const { t } = useTranslation();

  return (
    <Form form={form} layout="vertical" onFinish={handleSaveChanges}>
      <Form.Item label={t('profileForm.avatar')}>
        <AvatarUpload url={url} setUrl={setUrl} setUploading={setUploading} />
      </Form.Item>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item label={t('profileForm.username')} name="username">
            <Input className="border-2 border-gray-300 p-2 rounded-md" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item label={t('profileForm.email')} name="email">
            <Input className="border-2 border-gray-300 p-2 rounded-md" disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item label={t('profileForm.phone')} name="phone">
            <Input className="border-2 border-gray-300 p-2 rounded-md" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item label={t('profileForm.address')} name="address">
            <Input className="border-2 border-gray-300 p-2 rounded-md" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label={t('profileForm.bio')} name="description">
        <Input.TextArea className="border-2 border-gray-300 p-2 rounded-md" rows={3} />
      </Form.Item>
      <Button htmlType="submit" className="bg-[#56B280] text-white w-full sm:w-auto">
        {t('profileForm.saveChangesButton')}
      </Button>
    </Form>
  );
};

export default ProfileForm;
