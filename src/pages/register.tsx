import { Button, Divider, Image, Input, Form, notification } from 'antd';
import { authenticationType, thirdMethod } from '../constants/login';
import MockupIC from '../assets/images/mockupIp.png';
import Background from '../assets/images/background.png';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSelector from '../components/common/language';
import { emailValidator, passwordValidator } from '../constants/regex';
import { register, RegisterPayload } from '../constants/service';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleRegister = async (values: RegisterPayload) => {
    try {
      const res = await register(values);
      if (res) {
        notification.success({
          message: t('success.register'),
          description: t('success.noti'),
        });
        navigate('/sign-in');
      }
    } catch (error) {
      notification.error({
        message: t('error.fail'),
        description: t('error.message'),
      });
      console.log('error', error);
    }
  };

  return (
    <div className="flex flex-row h-screen w-screen justify-evenly p-4 md:p-12 bg-[#F6F6F6]">
      <div className="relative md:flex md:items-center md:justify-center hidden">
        <Image
          className="relative lg:max-w-[700px] md:max-w-[90%]"
          src={MockupIC}
          preview={false}
        />
        <div className="hidden md:block absolute top-6 left-8 text-3xl font-medium">
          {t('register.signUpToPayment')}
        </div>
        <div className="hidden md:block absolute top-[90px] left-8 text-sm font-light text-[#4F555A] max-w-[300px]">
          {t('register.account')} <span className="ml-1"></span>
          <Link to="/sign-in" className="text-[#56B280] font-semibold underline">
            {t('register.signInHere')}
          </Link>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-end w-full gap-6 p-4">
          <LanguageSelector />
          {authenticationType.map((item) => (
            <Link
              key={item.value}
              to={item.href}
              className={`text-sm font-semibold px-2 py-1  whitespace-nowrap ${
                location.pathname === item.href
                  ? 'border-b-2 border-[#56B280]'
                  : 'text-[#56B280] bg-white rounded-2xl'
              }`}
            >
              {t(item.label)}
            </Link>
          ))}
          <Button
            className="bg-white text-[#56B280] border-2 rounded-full px-4 py-2 hover:bg-[#56B280] hover:text-white"
            type="text"
          >
            <Link to="/">{t('common.button.home')}</Link>
          </Button>
        </div>

        <div className="flex flex-col gap-3 flex-grow justify-center">
          <div className="md:hidden text-center mb-4 text-3xl font-medium">
            {t('register.signUpToPayment')}
          </div>
          <div className="md:hidden text-center mb-4 text-sm font-light text-[#4F555A]">
            {t('register.account')} <span className="ml-1"></span>
            <Link to="/sign-in" className="text-[#56B280] font-semibold underline">
              {t('register.signInHere')}
            </Link>
            <Image
              className="md:hidden fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
              src={Background}
              preview={false}
            />
          </div>

          <Form
            form={form}
            name="register_form"
            onFinish={handleRegister}
            initialValues={{ name: '', phone: '', email: '', password: '' }}
            layout="vertical"
          >
            <Form.Item
              label={
                <span>
                  <span className="text-red-500"></span> {t('common.input.enterName')}{' '}
                </span>
              }
              name="username"
              rules={[
                { required: true, message: t('validation.name.nameRequired') },
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.resolve();
                    }
                    if (/^\s|\s$/.test(value)) {
                      return Promise.reject(t('validation.name.nameRequired'));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input className="w-full" allowClear />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  <span className="text-red-500"></span> {t('common.input.enterPhone')}{' '}
                </span>
              }
              name="phone"
              rules={[
                { required: true, message: t('validation.phone.required') },
                { min: 10, message: t('validation.phone.min') },
                { pattern: /^[0-9]*$/, message: t('validation.phone.invalid') },
              ]}
            >
              <Input className="w-full" allowClear maxLength={10} />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  <span className="text-red-500"></span> {t('common.input.enterEmail')}{' '}
                </span>
              }
              name="email"
              rules={[
                {
                  required: true,
                  validator: emailValidator,
                  message: t('validation.email.invalid'),
                },
              ]}
            >
              <Input className="w-full" allowClear />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  <span className="text-red-500"></span> {t('common.input.enterPassword')}{' '}
                </span>
              }
              name="password"
              rules={[
                {
                  required: true,
                  validator: passwordValidator,
                  message: t('validation.password.invalid'),
                },
              ]}
            >
              <Input.Password className="w-full" allowClear />
            </Form.Item>

            <Form.Item
              label={
                <span>
                  <span className="text-red-500"></span> {t('common.input.confirmPassword')}{' '}
                </span>
              }
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: t('validation.password.confirmRequired') },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(t('validation.password.mismatch')));
                  },
                }),
              ]}
            >
              <Input.Password className="w-full" allowClear />
            </Form.Item>

            <Form.Item label={null}>
              <Button
                className="w-full py-4 bg-[#56B280] font-semibold"
                type="primary"
                htmlType="submit"
              >
                {t('common.button.register')}
              </Button>
            </Form.Item>
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

export default Register;
