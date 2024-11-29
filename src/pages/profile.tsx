import { useEffect, useState } from 'react';
import { Form, Input, Button, Avatar, Tabs, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile, changePassword } from '../constants/service';

const { TabPane } = Tabs;

interface Profile {
  email: string;
  username: string;
  avatar: string;
}

interface ProfileFormValues {
  fullName: string;
  email: string;
  address: string;
  phone: string;
  description: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [profile, setProfile] = useState<Profile>({ email: '', username: '', avatar: '' });

  useEffect(() => {
    getProfile()
      .then((response) => {
        setProfile({ email: response.email, username: response.username, avatar: response.avatar });
        form.setFieldsValue({
          fullName: response?.fullName || '',
          email: response?.email || '',
          address: response?.address || '',
          phone: response?.phone || '',
          description: response?.description || '',
        });
      })
      .catch((err) => {
        console.error('Error fetching profile:', err);
      });
  }, [form]);

  const handleSaveChanges = (values: ProfileFormValues) => {
    updateProfile(values)
      .then(() => {
        message.success('Profile updated successfully');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        message.error('Failed to update profile');
      });
  };

  const handleChangePassword = (values: { oldPassword: string; newPassword: string }) => {
    const { oldPassword, newPassword } = values;
    changePassword({ oldPassword, newPassword })
      .then(() => {
        message.success('Password changed successfully');
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error changing password:', error);
        message.error('Failed to change password');
      });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Avatar
                size={64}
                src={profile.avatar || <UserOutlined />}
                icon={!profile.avatar && <UserOutlined />}
              />
              <div>
                <h2 className="text-2xl font-bold">{profile.username}</h2>
                <p className="text-gray-500">{profile.email}</p>
              </div>
            </div>
            <Button
              className="bg-[#56B280] text-white hover:bg-[#56B280] rounded-md"
              onClick={() => navigate('/')}
            >
              Home
            </Button>
          </div>

          <Tabs defaultActiveKey="1" type="line">
            <TabPane tab="My Profile" key="1">
              <Form form={form} layout="vertical" onFinish={handleSaveChanges}>
                <Form.Item
                  label="Full Name"
                  name="fullName"
                  rules={[{ required: true, message: 'Full name is required.' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ type: 'email', message: 'Invalid email address.' }]}
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Address" name="address">
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[{ pattern: /^[0-9]+$/, message: 'Invalid phone number.' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Description" name="description">
                  <Input.TextArea rows={4} />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-[#56B280] text-white hover:bg-[#56B280] py-2 px-4 w-full"
                >
                  Save Changes
                </Button>
              </Form>
            </TabPane>

            <TabPane tab="Change Password" key="2">
              <Form layout="vertical" onFinish={handleChangePassword}>
                <Form.Item
                  label="Old Password"
                  name="oldPassword"
                  rules={[{ required: true, message: 'Old password is required.' }]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="New Password"
                  name="newPassword"
                  rules={[{ required: true, message: 'New password is required.' }]}
                >
                  <Input.Password />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-[#56B280] text-white hover:bg-[#56B280] py-2 px-4 w-full"
                >
                  Change Password
                </Button>
              </Form>
            </TabPane>

            <TabPane tab="My Order" key="3"></TabPane>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
