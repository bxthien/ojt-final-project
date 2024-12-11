import { useEffect, useState } from 'react';
import { Form, message } from 'antd';
import ProfileForm from '../components/profile/ProfileForm';
import PasswordChange from '../components/profile/PasswordChange';
import Sidebar from '../components/profile/Sidebar';
import MyOrders from '../components/profile/order';
import { getProfile, updateProfile, changePassword, Order, getOrders } from '../constants/service';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile as updateUserProfile } from '../redux/auth/authSlice';
import { RootState } from '../redux/store';
import { fromStoredData } from '../services/storage';

const Profile = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState<Order[]>([]);
  const [, setUploading] = useState(false);

  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.auth.username);
  const url = useSelector((state: RootState) => state.auth.url);
  const userId = localStorage.getItem('userId');

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

        dispatch(
          updateUserProfile({
            username: userData.username || '',
            url: userData.url || '',
          })
        );
      })
      .catch((err) => {
        console.error('Error fetching profile:', err);
        message.error(t('profile.errorFetchProfile'));
      });

    if (userId) {
      getOrders(fromStoredData(userId))
        .then((data) => {
          console.log('Orders Data:', data);
          setOrders(data);
        })
        .catch((err) => {
          console.error('Error fetching orders:', err);
          message.error(t('profile.errorFetchOrders'));
        });
    }
  }, [dispatch, form, t, userId]);

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
        message.success(t('profile.successUpdateProfile'));
        dispatch(
          updateUserProfile({
            username: values.username,
            url: values.url,
          })
        );
      })
      .catch(() => message.error(t('profile.errorUpdateProfile')));
  };

  const handleChangePassword = (values: { oldPassword: string; newPassword: string }) => {
    changePassword(values)
      .then(() => {
        message.success(t('profile.successChangePassword'));
        passwordForm.resetFields();
      })
      .catch(() => message.error(t('profile.errorChangePassword')));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-white p-8 shadow-md rounded-lg mt-2 mb-2">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} username={username} url={url} />
      </div>

      {/* Main content */}
      <div className="w-full lg:w-3/4 bg-white p-8 shadow-md rounded-lg mt-2 mb-2">
        {activeTab === 'profile' && (
          <>
            <h2 className="text-xl font-bold mb-6 text-[#56B280]">
              {t('profile.editYourProfile')}
            </h2>
            <div className="border-2 border-gray-300 p-6 rounded-lg">
              <ProfileForm
                form={form}
                url={url}
                setUrl={(newUrl) => dispatch(updateUserProfile({ username, url: newUrl }))}
                setUploading={setUploading}
                handleSaveChanges={handleSaveChanges}
              />
            </div>
          </>
        )}
        {activeTab === 'password' && (
          <>
            <h2 className="text-xl font-bold mb-6 text-[#56B280]">{t('profile.changePassword')}</h2>
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
