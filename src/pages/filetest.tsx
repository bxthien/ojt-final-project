import { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, message, Collapse } from 'antd';
import { getProfile, updateProfile, changePassword, Order, getOrders } from '../constants/service';
import axios from 'axios';

const { Panel } = Collapse;

const Profile = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('profile');
  const [username, setUsername] = useState('');
  const [url, setUrl] = useState('');
  const [, setOrders] = useState<Order[]>([]);
  const [, setUploading] = useState(false);

  useEffect(() => {
    getProfile()
      .then((response) => {
        const userData = response || {};
        form.setFieldsValue({
          username: userData.username || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || '',
          description: userData.description || '',
        });
        setUsername(userData.username || '');
        setUrl(userData.url || '');
      })
      .catch((err) => console.error('Error fetching profile:', err));

    getOrders()
      .then((data) => {
        console.log('Orders Data:', data);
        setOrders(data);
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
        message.error('Failed to fetch orders');
      });
  }, [form]);

  const handleSaveChanges = (values: {
    username: string;
    email: string;
    address: string;
    phone: string;
    description: string;
    url: string;
  }) => {
    const updatedValues = {
      ...values,
      url: url,
    };
    updateProfile(updatedValues)
      .then(() => {
        message.success('Profile updated successfully');
        setUsername(values.username);
      })
      .catch(() => message.error('Failed to update profile'));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);
    axios
      .post('/upload/image', formData)
      .then((response) => {
        const imageUrl = response.data.url;
        setUrl(imageUrl);
        message.success('Avatar uploaded successfully');
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        message.error('Failed to upload avatar');
      })
      .finally(() => {
        setUploading(false);
      });
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
        <div className="flex items-center p-4 bg-white shadow-md rounded-lg mb-4">
          <img
            src={url}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-[#56B280] mr-3"
          />
          <div>
            <p className="text-gray-600 text-sm">
              Hello{' '}
              <span role="img" aria-label="wave">
                👋
              </span>
            </p>
            <h4 className="text-lg font-bold text-black">{username || 'userName'}</h4>
          </div>
        </div>

        <div className="lg:hidden">
          <Collapse
            defaultActiveKey={['1']}
            bordered={false}
            expandIconPosition="end"
            className="bg-white"
          >
            <Panel header="My Account" key="1">
              <ul className="space-y-2">
                <li
                  className="cursor-pointer pl-4 text-gray-600 hover:text-[#56B280]"
                  onClick={() => setActiveTab('profile')}
                >
                  Profile
                </li>
                <li
                  className="cursor-pointer pl-4 text-gray-600 hover:text-[#56B280]"
                  onClick={() => setActiveTab('password')}
                >
                  Change Password
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
          <Collapse
            defaultActiveKey={['1']}
            bordered={false}
            expandIconPosition="end"
            className="bg-white"
          >
            <Panel header="My Account" key="1">
              <ul className="space-y-2">
                <li
                  className={`cursor-pointer pl-4 transition-colors duration-300 ${activeTab === 'profile' ? 'text-[#56B280] font-bold' : 'text-gray-600 hover:text-[#56B280]'}`}
                  onClick={() => setActiveTab('profile')}
                >
                  Profile
                </li>
                <li
                  className={`cursor-pointer pl-4 transition-colors duration-300 ${activeTab === 'password' ? 'text-[#56B280] font-bold' : 'text-gray-600 hover:text-[#56B280]'}`}
                  onClick={() => setActiveTab('password')}
                >
                  Change Password
                </li>
              </ul>
            </Panel>
            <Panel header="My Orders" key="2">
              <ul className="space-y-2">
                <li className="text-gray-500 pl-4 hover:text-[#56B280] cursor-pointer">
                  My Returns
                </li>
                <li className="text-gray-500 pl-4 hover:text-[#56B280] cursor-pointer">
                  My Cancellations
                </li>
              </ul>
            </Panel>
            <Panel header="My Wishlist" key="3">
              <p className="cursor-pointer pl-4">Wishlist Items</p>
            </Panel>
          </Collapse>
        </div>
      </div>

      <div className="w-full lg:w-3/4 bg-white p-6 lg:p-8 shadow-md rounded-lg">
        {activeTab === 'profile' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-[#56B280]">Edit Your Profile</h2>
            <div className="border-2 border-gray-300 p-6 rounded-lg">
              <Form form={form} layout="vertical" onFinish={handleSaveChanges}>
                {/* Phần Upload ảnh đại diện */}
                <Form.Item label="Avatar">
                  <div className="flex items-center space-x-4">
                    <img src={url} alt="Avatar" className="w-16 h-16 rounded-full border" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="cursor-pointer"
                    />
                  </div>
                </Form.Item>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Username" name="username">
                      <Input className="border-2 border-gray-300 p-2 rounded-md" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Email" name="email">
                      <Input className="border-2 border-gray-300 p-2 rounded-md" disabled />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Phone Number" name="phone">
                      <Input className="border-2 border-gray-300 p-2 rounded-md" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Address" name="address">
                      <Input className="border-2 border-gray-300 p-2 rounded-md" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="Bio" name="description">
                  <Input.TextArea className="border-2 border-gray-300 p-2 rounded-md" rows={3} />
                </Form.Item>
                <Button htmlType="submit" className="bg-[#56B280] text-white w-full sm:w-auto">
                  Save Changes
                </Button>
              </Form>
            </div>
          </>
        )}

        {activeTab === 'password' && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-[#56B280]">Change Password</h2>
            <div className="border-2 border-gray-300 p-6 rounded-lg">
              <Form form={passwordForm} layout="vertical" onFinish={handleChangePassword}>
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
