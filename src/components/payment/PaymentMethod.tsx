import React, { useState } from 'react';
import { useCheckout } from '../CheckoutContext';
import { Form, Input, Button } from 'antd';
import QRVNPay from '../../assets/images/QRVNPay.png';
import { useTranslation } from 'react-i18next';

const PaymentMethod: React.FC = () => {
  const { t } = useTranslation();
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
      <h3 className="font-semibold text-lg mb-2">{t('paymentMethod.title')}</h3>
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
            <span>{t(`paymentMethod.${method}`)}</span>
          </label>
        ))}
      </div>

      {showPaymentDetails && (
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          <h4 className="font-semibold text-md mb-2">{t('paymentMethod.paymentDetails')}</h4>
          <div className="space-y-2">
            <Button
              onClick={() => {
                setQrVisible(true);
                setCardFormVisible(false);
              }}
              className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600"
            >
              {t('paymentMethod.scanQRCode')}
            </Button>
            <Button
              onClick={() => {
                setQrVisible(false);
                setCardFormVisible(true);
              }}
              className="bg-green-500 text-white w-full py-2 rounded-md hover:bg-green-600"
            >
              {t('paymentMethod.enterCardInfo')}
            </Button>
          </div>

          {qrVisible && (
            <div className="mt-4 flex justify-center">
              <img src={QRVNPay} alt="QR Code" className="w-40 h-40 object-contain" />
            </div>
          )}

          {cardFormVisible && (
            <Form className="mt-4 space-y-4">
              <Form.Item label={t('paymentMethod.cardNumber')}>
                <Input
                  type="text"
                  value={cardInfo.cardNumber}
                  onChange={(e) => handleCardInput('cardNumber', e.target.value)}
                  placeholder={t('paymentMethod.cardNumberPlaceholder')}
                />
              </Form.Item>

              <Form.Item label={t('paymentMethod.cardHolder')}>
                <Input
                  type="text"
                  value={cardInfo.cardHolder}
                  onChange={(e) => handleCardInput('cardHolder', e.target.value)}
                  placeholder={t('paymentMethod.cardHolderPlaceholder')}
                />
              </Form.Item>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item label={t('paymentMethod.validFrom')}>
                  <Input
                    type="text"
                    value={cardInfo.validFrom}
                    onChange={(e) => handleCardInput('validFrom', e.target.value)}
                    placeholder={t('paymentMethod.validFromPlaceholder')}
                  />
                </Form.Item>
                <Form.Item label={t('paymentMethod.expiryDate')}>
                  <Input
                    type="text"
                    value={cardInfo.expiryDate}
                    onChange={(e) => handleCardInput('expiryDate', e.target.value)}
                    placeholder={t('paymentMethod.expiryDatePlaceholder')}
                  />
                </Form.Item>
              </div>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  {t('paymentMethod.confirmPayment')}
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
