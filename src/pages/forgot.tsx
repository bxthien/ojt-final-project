import { Button, Image, Form, Input, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { authenticationType } from '../constants/login';
import Background from '../assets/images/background.png';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSelector from '../components/common/language';
import { emailValidator } from '../constants/regex';
import { forgot, ForgotPayload } from '../constants/service';

const Forgot = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleForgot = async (values: ForgotPayload) => {
    try {
      const res = await forgot(values);
      if (res) {
        notification.success({
          message: t('success.noti'),
          description: t('success.sent'),
        });
        navigate('/success');
      }
    } catch (error) {
      notification.error({
        message: t('error.email'),
        description: t('error.message'),
      });
      console.log('error', error);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-between p-4 md:p-12 bg-[#F6F6F6]">
      <Image
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src={Background}
        preview={false}
      />
      <div className="flex items-center justify-end gap-6 p-4">
        <div className="flex w-3/5 justify-start">
          <Link to="/" className=" text-black">
            <ArrowLeftOutlined />
          </Link>
        </div>
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

      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="mb-4 text-3xl font-medium text-center">{t('forgot.forgotPassword')}</div>
        <div className="mb-4 text-sm font-light text-center text-[#4F555A]">
          {t('forgot.reset')}
        </div>
        <div className="w-full max-w-md">
          <Form
            form={form}
            name="forgot_form"
            onFinish={handleForgot}
            initialValues={{ email: '' }}
            layout="vertical"
          >
            <Form.Item
              label={
                <span>
                  {' '}
                  <span className="text-red-500">*</span> {t('common.input.enterEmail')}{' '}
                </span>
              }
              name="email"
              rules={[{ validator: emailValidator, message: t('validation.email.invalid') }]}
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item label={null}>
              <Button
                className="w-full py-2 bg-[#56B280] font-semibold"
                type="primary"
                htmlType="submit"
              >
                {t('common.button.next')}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
