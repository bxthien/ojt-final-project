import { Button, Card, Modal, Radio, Space, Steps, Typography } from 'antd';
import { useState } from 'react';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';

const { Step } = Steps;
const { Title, Text } = Typography;

const ShipmentMethod = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('cod');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const address = queryParams.get('address') || '';

  const handleNext = () => {
    if (selectedMethod) {
      const params = {
        address,
        paymentMethod: selectedMethod,
      };
      navigate({
        pathname: '/payment',
        search: `?${createSearchParams(params)}`,
      });
    } else {
      Modal.warning({
        title: 'No Shipment Method Selected',
        content: 'Please select a shipment method before proceeding.',
      });
    }
  };

  const shipmentOptions = [
    {
      value: 'cod',
      title: 'COD',
      description: 'Payment when receive product',
    },
    {
      value: 'banking',
      title: 'Vnpay Payment',
      description: 'Payment online via VNPay',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-10">
      {/* Steps */}
      <Steps current={1} className="mb-8">
        <Step title="Address" />
        <Step title="Shipping" />
        <Step title="Payment" />
      </Steps>

      {/* Title */}
      <Title level={3} className="mb-6">
        Payment Method
      </Title>

      {/* Shipment Options */}
      <Radio.Group
        value={selectedMethod}
        onChange={(e) => setSelectedMethod(e.target.value)}
        className="w-full"
      >
        <Space direction="vertical" size="large" className="w-full">
          {shipmentOptions.map((option) => (
            <Card
              key={option.value}
              bordered
              className={`cursor-pointer flex items-center ${
                selectedMethod === option.value ? 'border-green-500' : 'border-gray-300'
              }`}
              bodyStyle={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Radio value={option.value} className="w-full flex justify-between items-center">
                <div>
                  <Title level={5} className="mb-0">
                    {option.title}
                  </Title>
                  <Text type="secondary">{option.description}</Text>
                </div>
                {/* <Text>{option.date}</Text> */}
              </Radio>
            </Card>
          ))}
        </Space>
      </Radio.Group>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4 mt-10">
        <Button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Back
        </Button>
        <Button
          type="primary"
          onClick={handleNext}
          className="bg-[#56B280] border-[#56B280] hover:bg-[#3D8F64] text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ShipmentMethod;
