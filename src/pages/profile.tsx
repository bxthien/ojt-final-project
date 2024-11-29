import { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Row, Col, message, Tabs } from 'antd';
import { getProfile, updateProfile, changePassword } from '../constants/service';
import TabPane from 'antd/es/tabs/TabPane';

const { Option } = Select;

const Profile = () => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    getProfile()
      .then((response) => {
        form.setFieldsValue({
          username: response?.username || '',
          email: response?.email || '',
          phone: response?.phone || '',
          address: response?.address || '',
          description: response?.description || '',
        });
      })
      .catch((err) => console.error('Error fetching profile:', err));
  }, [form]);

  const handleSaveChanges = (values: {
    fullName: string;
    email: string;
    address: string;
    phone: string;
    description: string;
  }) => {
    updateProfile(values)
      .then(() => {
        message.success('Profile updated successfully');
      })
      .catch(() => message.error('Failed to update profile'));
  };

  const handleChangePassword = (values: { oldPassword: string; newPassword: string }) => {
    changePassword(values)
      .then(() => {
        message.success('Password changed successfully');
      })
      .catch(() => message.error('Failed to change password'));
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 min-h-screen p-6 lg:p-10">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-white p-6 shadow-md rounded-lg mb-6 lg:mb-0">
        {/* Dropdown for Mobile */}
        <div className="lg:hidden">
          <Select
            value={activeTab}
            onChange={setActiveTab}
            className="w-full"
            placeholder="Select tab"
          >
            <Option value="1">My Profile</Option>
            <Option value="2">Change Password</Option>
            <Option value="3">My Order</Option>
          </Select>
        </div>

        {/* Tabs for larger screens */}
        <div className="hidden lg:block">
          <Tabs tabPosition="left" activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="My Profile" key="1" />
            <TabPane tab="Change Password" key="2" />
            <TabPane tab="My Order" key="3" />
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="w-full lg:w-3/4 bg-white p-8 shadow-md rounded-lg lg:ml-6">
        {activeTab === '1' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-green-500">Edit Your Profile</h2>
            <Form form={form} layout="vertical" onFinish={handleSaveChanges}>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item label="Username" name="username">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Email" name="email">
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item label="Phone Number" name="phone">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Address" name="address">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Bio" name="description">
                <Input.TextArea rows={3} />
              </Form.Item>
              <Button type="primary" htmlType="submit" className="bg-green-500 text-white">
                Save Changes
              </Button>
            </Form>
          </>
        )}
        {activeTab === '2' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-green-500">Change Password</h2>
            <Form layout="vertical" onFinish={handleChangePassword}>
              <Form.Item
                label="Old Password"
                name="oldPassword"
                rules={[{ required: true, message: 'Please enter your old password!' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[{ required: true, message: 'Please enter your new password!' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Confirm New Password"
                name="confirmPassword"
                dependencies={['newPassword']}
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your new password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Passwords do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Button type="primary" htmlType="submit" className="bg-green-500 text-white">
                Change Password
              </Button>
            </Form>
          </>
        )}
        {activeTab === '3' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-green-500">My Order</h2>
            <p className="text-gray-500">Order history will be displayed here.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
