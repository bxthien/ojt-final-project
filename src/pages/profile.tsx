import { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import ProfileForm from '../components/profile/ProfileForm';
import PasswordChange from '../components/profile/PasswordChange';
import Sidebar from '../components/profile/Sidebar';
import MyOrders from '../components/profile/order';
import { getProfile, updateProfile, changePassword, Order, getOrders } from '../constants/service';

const Profile = () => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('profile');
  const [username, setUsername] = useState('');
  const [url, setUrl] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
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
      .catch((err) => {
        console.error('Error fetching profile:', err);
        message.error('Failed to fetch profile');
      });

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
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-white p-6 shadow-md">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} username={username} url={url} />
      </div>

      {/* Nội dung chính */}
      <div className="w-full lg:w-3/4 bg-white p-6 lg:p-8 shadow-md rounded-lg">
        {activeTab === 'profile' && (
          <>
            <h2 className="text-xl font-bold mb-6 text-[#56B280]">Edit Your Profile</h2>
            <div className="border-2 border-gray-300 p-6 rounded-lg">
              <ProfileForm
                form={form}
                url={url}
                setUrl={setUrl}
                setUploading={setUploading}
                handleSaveChanges={handleSaveChanges}
              />
            </div>
          </>
        )}
        {activeTab === 'password' && (
          <>
            <h2 className="text-xl font-bold mb-6 text-[#56B280]">Change Password</h2>
            <div className="border-2 border-gray-300 p-6 rounded-lg">
              <PasswordChange form={passwordForm} handleChangePassword={handleChangePassword} />
            </div>
          </>
        )}
        {activeTab === 'orders' && <MyOrders orders={orders} />}
      </div>
    </div>
  );
};

export default Profile;
