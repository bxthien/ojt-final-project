import React, { useState } from 'react';
import { useCheckout } from '../CheckoutContext';
import { Form, Input, Button } from 'antd';
import QRVNPay from '../../assets/images/QRVNPay.png';

const PaymentMethod: React.FC = () => {
  const { paymentMethod, setPaymentMethod } = useCheckout();
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [qrVisible, setQrVisible] = useState(false);
  const [cardFormVisible, setCardFormVisible] = useState(false);

  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    validFrom: '',
    expiryDate: '',
  });

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
    setShowPaymentDetails(method === 'VNPay' || method === 'Stripe');
    setQrVisible(false);
    setCardFormVisible(false);
  };

  const handleCardInput = (field: string, value: string) => {
    setCardInfo({
      ...cardInfo,
      [field]: field === 'cardHolder' ? value.toUpperCase() : value,
    });
  };

  return (
    <div className="mb-6 border-b pb-4">
      <h3 className="font-semibold text-lg mb-2">Payment Method</h3>
      <div className="space-y-2">
        {['VNPay', 'Stripe', 'COD'].map((method) => (
          <label key={method} className="flex items-center space-x-2">
            <input
              type="radio"
              name="paymentMethod"
              value={method}
              checked={paymentMethod === method}
              onChange={(e) => handlePaymentMethodChange(e.target.value)}
            />
            <span>{method}</span>
          </label>
        ))}
      </div>

      {showPaymentDetails && (
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          <h4 className="font-semibold text-md mb-2">Payment Details</h4>
          <div className="space-y-2">
            <Button
              onClick={() => {
                setQrVisible(true);
                setCardFormVisible(false);
              }}
              className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600"
            >
              Scan QR Code
            </Button>
            <Button
              onClick={() => {
                setQrVisible(false);
                setCardFormVisible(true);
              }}
              className="bg-green-500 text-white w-full py-2 rounded-md hover:bg-green-600"
            >
              Enter Card Information
            </Button>
          </div>

          {qrVisible && (
            <div className="mt-4 flex justify-center">
              <img src={QRVNPay} alt="QR Code" className="w-40 h-40 object-contain" />
            </div>
          )}

          {cardFormVisible && (
            <Form className="mt-4 space-y-4">
              <Form.Item label="Card Number">
                <Input
                  type="text"
                  value={cardInfo.cardNumber}
                  onChange={(e) => handleCardInput('cardNumber', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                />
              </Form.Item>

              <Form.Item label="Card Holder">
                <Input
                  type="text"
                  value={cardInfo.cardHolder}
                  onChange={(e) => handleCardInput('cardHolder', e.target.value)}
                  placeholder="CARD HOLDER NAME"
                />
              </Form.Item>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item label="Valid From (MM/YYYY)" className="m-0">
                  <Input
                    type="text"
                    value={cardInfo.validFrom}
                    onChange={(e) => handleCardInput('validFrom', e.target.value)}
                    placeholder="01/2024"
                  />
                </Form.Item>
                <Form.Item label="Expiry Date (MM/YYYY)" className="m-0">
                  <Input
                    type="text"
                    value={cardInfo.expiryDate}
                    onChange={(e) => handleCardInput('expiryDate', e.target.value)}
                    placeholder="12/2028"
                  />
                </Form.Item>
              </div>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Confirm Payment
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
