import { Button, Divider, Image, Input, Form, notification } from 'antd';
import { authenticationType, thirdMethod } from '../constants/login';
import MockupIC from '../assets/images/mockupIp.png';
import Background from '../assets/images/background.png';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSelector from '../components/common/language';
import FormItem from '../components/common/form';
import { passwordValidator } from '../constants/regex';
import { useState } from 'react';
import { authService, SignInPayload } from '../constants/service';
import axios from 'axios';

const SignIn = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSignIn = async (values: SignInPayload) => {
    try {
      setLoading(true);
      const response = await authService.signIn(values);

      if (response.statusCode === 200) {
        notification.success({
          message: 'Thành công',
          description: response.message || 'Đăng nhập thành công',
        });
        navigate('/');
      }
    } catch (error: unknown) {
      let errorMessage = 'Đăng nhập thất bại';

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message || 'Đăng nhập thất bại';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        errorMessage = (error as { message: string }).message;
      }

      notification.error({
        message: 'Lỗi',
        description: errorMessage,
      });
      form.setFieldsValue({ password: '' });

      console.error('Lỗi đăng nhập:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-rol md:flex-row h-screen w-screen justify-evenly p-4 md:p-12 bg-[#F6F6F6]">
      <div className="relative md:flex md:items-center md:justify-center hidden">
        <Image
          className="relative hidden md:block lg:max-w-[700px] md:max-w-[90%]"
          src={MockupIC}
          preview={false}
        />
        <div className="hidden md:block absolute top-6 left-8 text-3xl font-medium">
          {t('login.signInToPayment')}
        </div>
        <div className="hidden md:block absolute top-[90px] left-8 text-sm font-light text-[#4F555A] max-w-[300px]">
          {t('login.noAccount')} <span className="ml-1"></span>
          <Link to="/register" className="text-[#56B280] font-semibold underline">
            {t('login.registerHere')}
          </Link>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-end w-full gap-6 p-4">
          <LanguageSelector />
          {authenticationType.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-sm text-[#56B280] font-semibold px-2 py-1 bg-white shadow-lg rounded-2xl whitespace-nowrap"
            >
              {t(item.label)}
            </Link>
          ))}
          <Button className="bg-[#56B280] px-4 py-2" type="primary">
            <Link to="/home">{t('common.button.home')}</Link>
          </Button>
        </div>

        <div className="flex flex-col gap-3 flex-grow justify-center">
          <div className="md:hidden text-center mb-4 text-3xl font-medium">
            {t('login.signInToPayment')}
          </div>
          <div className="md:hidden text-center mb-4 text-sm font-light text-[#4F555A]">
            {t('login.noAccount')} <span className="ml-1"></span>
            <Link to="/register" className="text-[#56B280] font-semibold underline">
              {t('login.registerHere')}
            </Link>
            <Image
              className="md:hidden fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
              src={Background}
              preview={false}
            />
          </div>
          <Form
            form={form}
            name="sign_in_form"
            onFinish={handleSignIn}
            initialValues={{ email: '', password: '' }}
            layout="vertical"
          >
            <FormItem
              name="email"
              type="email"
              rules={[
                { required: true, message: t('validation.email.required') },
                { type: 'email', message: t('validation.email.invalid') },
              ]}
            >
              <Input placeholder={t('common.input.enterEmail')} allowClear type="email" />
            </FormItem>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: t('validation.password.required') },
                {
                  validator: passwordValidator,
                  min: 8,
                  message: t('validation.password.invalid'),
                },
              ]}
            >
              <Input.Password placeholder={t('common.input.enterPassword')} allowClear />
            </Form.Item>

            <Link
              to="/forgot"
              className="text-xs font-extralight text-[#56B280] text-right hover:text-[#a8a8a8] cursor-pointer block mb-4"
            >
              {t('login.recoverPassword')}
            </Link>

            <Button
              className="py-4 bg-[#56B280] font-semibold"
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              {t('common.button.signIn')}
            </Button>
          </Form>

          <div>
            <div className="relative">
              <Divider />
            </div>
            <div className="grid grid-cols-3 gap-5">
              {thirdMethod.map((item) => (
                <div
                  key={item.value}
                  className="flex items-center justify-center rounded-md shadow-lg py-3"
                >
                  <Image src={item.logo} width={16} height={16} preview={false} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
