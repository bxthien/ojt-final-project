import { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, message, Collapse } from 'antd';
import { getProfile, updateProfile, changePassword } from '../constants/service';

const { Panel } = Collapse;

const Profile = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('profile');

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
        passwordForm.resetFields();
      })
      .catch(() => message.error('Failed to change password'));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <div className="w-full lg:w-1/4 bg-white p-6 shadow-md">
        <div className="lg:hidden">
          <Collapse
            defaultActiveKey={['1']}
            bordered={false}
            expandIconPosition="end"
            className="bg-white"
          >
            <Panel header="Manage" key="1">
              <ul className="space-y-2">
                <li
                  className={`cursor-pointer pl-4 transition-colors duration-300 ${
                    activeTab === 'profile'
                      ? 'text-[#56B280] font-bold'
                      : 'text-gray-600 hover:text-[#56B280]'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  My Profile
                </li>
                <li
                  className={`cursor-pointer pl-4 transition-colors duration-300 ${
                    activeTab === 'password'
                      ? 'text-[#56B280] font-bold'
                      : 'text-gray-600 hover:text-[#56B280]'
                  }`}
                  onClick={() => setActiveTab('password')}
                >
                  Change Password
                </li>
                <li className="cursor-pointer pl-4 text-gray-500 hover:text-[#56B280]">
                  My Payment Options
                </li>
              </ul>
            </Panel>
            <Panel header="My Orders" key="2">
              <ul className="space-y-2">
                <li className="cursor-pointer pl-4 text-gray-500 hover:text-[#56B280]">
                  My Returns
                </li>
                <li className="cursor-pointer pl-4 text-gray-500 hover:text-[#56B280]">
                  My Cancellations
                </li>
              </ul>
            </Panel>
            <Panel header="My Wishlist" key="3">
              <p className="cursor-pointer pl-4">Wishlist Items</p>
            </Panel>
          </Collapse>
        </div>

        <div className="hidden lg:block">
          <h3 className="text-xl font-semibold mb-6 text-gray-700">Manage</h3>
          <ul className="space-y-2">
            <li
              className={`cursor-pointer pl-4 transition-colors duration-300 ${
                activeTab === 'profile'
                  ? 'text-[#56B280] font-bold'
                  : 'text-gray-600 hover:text-[#56B280]'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              My Profile
            </li>
            <li
              className={`cursor-pointer pl-4 transition-colors duration-300 ${
                activeTab === 'password'
                  ? 'text-[#56B280] font-bold'
                  : 'text-gray-600 hover:text-[#56B280]'
              }`}
              onClick={() => setActiveTab('password')}
            >
              Change Password
            </li>
            <li className="text-gray-500 pl-4 hover:text-[#56B280] cursor-pointer">
              My Payment Options
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-6 text-gray-700">My Orders</h3>
          <ul className="space-y-2">
            <li className="text-gray-500 pl-4 hover:text-[#56B280] cursor-pointer">My Returns</li>
            <li className="text-gray-500 pl-4 hover:text-[#56B280] cursor-pointer">
              My Cancellations
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-6 text-gray-700">My Wishlist</h3>
        </div>
      </div>

      <div className="w-full lg:w-3/4 bg-white p-6 lg:p-8 shadow-md rounded-lg">
        {activeTab === 'profile' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-[#56B280]">Edit Your Profile</h2>
            <Form form={form} layout="vertical" onFinish={handleSaveChanges}>
              <Row gutter={[16, 16]}>
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
              <Row gutter={[16, 16]}>
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
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
                <Button htmlType="submit" className="bg-[#56B280] text-white w-full sm:w-auto">
                  Save Changes
                </Button>
              </div>
            </Form>
          </>
        )}

        {activeTab === 'password' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-[#56B280]">Change Password</h2>
            <Form form={passwordForm} layout="vertical" onFinish={handleChangePassword}>
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
                  { required: true, message: 'Please confirm your new password!' },
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
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
                <Button htmlType="submit" className="bg-[#56B280] text-white w-full sm:w-auto">
                  Change
                </Button>
              </div>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
