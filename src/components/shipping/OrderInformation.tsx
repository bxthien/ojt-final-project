import React from 'react';
import { Card, Typography } from 'antd';
import MockupIC from '../../assets/images/mockupIp.png';

interface OrderInformationProps {
  subtotal: number;
  shipping: number;
  total: number;
}

const { Title, Text } = Typography;

const OrderInformation: React.FC<OrderInformationProps> = ({ subtotal, shipping, total }) => (
  <Card bordered={false} className="mb-4">
    <Title level={4} className="mb-4">
      Order Information
    </Title>
    <div className="flex items-center mb-4">
      <img src={MockupIC} alt="Spiced Mint Candleaf" className="w-12 h-12 rounded mr-4" />
      <div>
        <Title level={5} className="font-semibold">
          Spiced Mint Candleaf®
        </Title>
        <Text type="success">${subtotal.toFixed(2)}</Text>
      </div>
    </div>
    <div className="mt-6 border-t pt-4">
      <div className="flex justify-between mb-2">
        <Text>Subtotal</Text>
        <Text>${subtotal.toFixed(2)}</Text>
      </div>
      <div className="flex justify-between mb-2">
        <Text>Shipping</Text>
        <Text>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Calculated at the next step'}</Text>
      </div>
      <div className="flex justify-between font-semibold text-lg mt-6 border-t pt-4">
        <Text>Total</Text>
        <Text>${total.toFixed(2)}</Text>
      </div>
    </div>
  </Card>
);

export default OrderInformation;
