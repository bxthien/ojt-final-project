import { useState } from 'react';
import { Form, Input, Checkbox, Radio, Button, Card, Typography, Divider, Space } from 'antd';

const { Title, Text } = Typography;

const Checkout = () => {
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState('bank');

  const handlePlaceOrder = () => {
    form
      .validateFields()
      .then(() => {
        alert('Order placed successfully!');
      })
      .catch(() => {
        alert('Please fill out all required fields.');
      });
  };

  const subtotal = 1750;

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-5 py-10 max-w-5xl mx-auto">
      {/* Billing Details */}
      <Card className="flex-1">
        <Title level={4} className="mb-5">
          Billing Details
        </Title>
        <Form form={form} layout="vertical">
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please enter your first name' }]}
          >
            <Input placeholder="First Name*" />
          </Form.Item>

          <Form.Item label="Company Name" name="companyName">
            <Input placeholder="Company Name" />
          </Form.Item>

          <Form.Item
            label="Street Address"
            name="streetAddress"
            rules={[{ required: true, message: 'Please enter your street address' }]}
          >
            <Input placeholder="Street Address*" />
          </Form.Item>

          <Form.Item label="Apartment" name="apartment">
            <Input placeholder="Apartment, floor, etc. (optional)" />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: 'Please enter your city' }]}
          >
            <Input placeholder="Town/City*" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input placeholder="Phone Number*" />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="emailAddress"
            rules={[
              { required: true, message: 'Please enter your email address' },
              { type: 'email', message: 'Please enter a valid email address' },
            ]}
          >
            <Input placeholder="Email Address*" />
          </Form.Item>

          <Form.Item>
            <Checkbox>Save this information for faster check-out next time</Checkbox>
          </Form.Item>
        </Form>
      </Card>

      {/* Order Summary */}
      <Card className="flex-[0.8]" title="Order Summary">
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
            <Text>Subtotal:</Text>
            <Text>${subtotal}</Text>
          </div>
          <div className="flex justify-between">
            <Text>Shipping:</Text>
            <Text>Free</Text>
          </div>
          <div className="flex justify-between font-bold">
            <Text>Total:</Text>
            <Text>${subtotal}</Text>
          </div>
        </Space>

        <Divider />

        <Title level={5}>Payment Method</Title>
        <Radio.Group
          onChange={(e) => setPaymentMethod(e.target.value)}
          value={paymentMethod}
          className="w-full"
        >
          <Space direction="vertical" size="middle">
            <Radio value="bank">Bank</Radio>
            <Radio value="cash">Cash on delivery</Radio>
          </Space>
        </Radio.Group>

        <Divider />

        <Space direction="horizontal" size="middle" className="w-full">
          <Input placeholder="Coupon Code" />
          <Button
            type="primary"
            className="bg-[#56B280] border-[#56B280] hover:bg-[#3D8F64] text-white"
          >
            Apply Coupon
          </Button>
        </Space>

        <Button
          type="primary"
          block
          className="mt-5 bg-[#56B280] border-[#56B280] hover:bg-[#3D8F64] text-white"
          size="large"
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </Card>
    </div>
  );
};

export default Checkout;
