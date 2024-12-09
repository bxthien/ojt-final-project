import { useState } from 'react';
import { Form, Input, Checkbox, Radio, Button, Card, Typography, Divider, Space } from 'antd';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

const Checkout = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState('bank');

  const handlePlaceOrder = () => {
    form
      .validateFields()
      .then(() => {
        alert(t('checkout.orderSuccess'));
      })
      .catch(() => {
        alert(t('checkout.fillRequiredFields'));
      });
  };

  const subtotal = 1750;

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-5 py-10 max-w-5xl mx-auto">
      {/* Billing Details */}
      <Card className="flex-1">
        <Title level={4} className="mb-5">
          {t('checkout.billingDetails')}
        </Title>
        <Form form={form} layout="vertical">
          <Form.Item
            label={t('checkout.firstName')}
            name="firstName"
            rules={[{ required: true, message: t('checkout.firstNameRequired') }]}
          >
            <Input placeholder={t('checkout.firstName')} />
          </Form.Item>

          <Form.Item label={t('checkout.companyName')} name="companyName">
            <Input placeholder={t('checkout.companyName')} />
          </Form.Item>

          <Form.Item
            label={t('checkout.streetAddress')}
            name="streetAddress"
            rules={[{ required: true, message: t('checkout.streetAddressRequired') }]}
          >
            <Input placeholder={t('checkout.streetAddress')} />
          </Form.Item>

          <Form.Item label={t('checkout.apartment')} name="apartment">
            <Input placeholder={t('checkout.apartmentOptional')} />
          </Form.Item>

          <Form.Item
            label={t('checkout.city')}
            name="city"
            rules={[{ required: true, message: t('checkout.cityRequired') }]}
          >
            <Input placeholder={t('checkout.city')} />
          </Form.Item>

          <Form.Item
            label={t('checkout.phoneNumber')}
            name="phoneNumber"
            rules={[{ required: true, message: t('checkout.phoneNumberRequired') }]}
          >
            <Input placeholder={t('checkout.phoneNumber')} />
          </Form.Item>

          <Form.Item
            label={t('checkout.emailAddress')}
            name="emailAddress"
            rules={[
              { required: true, message: t('checkout.emailRequired') },
              { type: 'email', message: t('checkout.emailInvalid') },
            ]}
          >
            <Input placeholder={t('checkout.emailAddress')} />
          </Form.Item>

          <Form.Item>
            <Checkbox>{t('checkout.saveInfo')}</Checkbox>
          </Form.Item>
        </Form>
      </Card>

      {/* Order Summary */}
      <Card className="flex-[0.8]" title={t('checkout.orderSummary')}>
        <Space direction="vertical" size="large" className="w-full">
          <div className="flex justify-between items-center">
            <Text>LCD Monitor</Text>
            <Text>$650</Text>
          </div>
          <div className="flex justify-between items-center">
            <Text>H1 Gamepad</Text>
            <Text>$1100</Text>
          </div>
          <Divider />
          <div className="flex justify-between">
            <Text>{t('checkout.subtotal')}:</Text>
            <Text>${subtotal}</Text>
          </div>
          <div className="flex justify-between">
            <Text>{t('checkout.shipping')}:</Text>
            <Text>{t('checkout.free')}</Text>
          </div>
          <div className="flex justify-between font-bold">
            <Text>{t('checkout.total')}:</Text>
            <Text>${subtotal}</Text>
          </div>
        </Space>

        <Divider />

        <Title level={5}>{t('checkout.paymentMethod')}</Title>
        <Radio.Group
          onChange={(e) => setPaymentMethod(e.target.value)}
          value={paymentMethod}
          className="w-full"
        >
          <Space direction="vertical" size="middle">
            <Radio value="bank">{t('checkout.bank')}</Radio>
            <Radio value="cash">{t('checkout.cashOnDelivery')}</Radio>
          </Space>
        </Radio.Group>

        <Divider />

        <Space direction="horizontal" size="middle" className="w-full">
          <Input placeholder={t('checkout.couponCode')} />
          <Button
            type="primary"
            className="bg-[#56B280] border-[#56B280] hover:bg-[#3D8F64] text-white"
          >
            {t('checkout.applyCoupon')}
          </Button>
        </Space>

        <Button
          type="primary"
          block
          className="mt-5 bg-[#56B280] border-[#56B280] hover:bg-[#3D8F64] text-white"
          size="large"
          onClick={handlePlaceOrder}
        >
          {t('checkout.placeOrder')}
        </Button>
      </Card>
    </div>
  );
};

export default Checkout;
