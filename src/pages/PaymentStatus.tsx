import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface PaymentStatusProps {
  status: 'success' | 'failed';
  orderId?: string;
  customerName?: string;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ status, orderId, customerName }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBackToShopping = () => {
    navigate('/');
  };

  const handleBackToPayment = () => {
    navigate('/shipping');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {status === 'success' ? (
        <Result
          status="success"
          title={t('paymentStatus.paymentConfirmed')}
          subTitle={
            <>
              {orderId && <p>{t('paymentStatus.orderId', { orderId })}</p>}
              <p>{t('paymentStatus.thankYou', { customerName: customerName || 'Customer' })}</p>
            </>
          }
          extra={[
            <Button type="primary" onClick={handleBackToShopping} key="back">
              {t('paymentStatus.backToShopping')}
            </Button>,
            <Button onClick={() => window.print()} key="print">
              {t('paymentStatus.printReceipt')}
            </Button>,
          ]}
        />
      ) : (
        <Result
          status="error"
          title={t('paymentStatus.paymentFailed')}
          subTitle={t('paymentStatus.paymentErrorMessage')}
          extra={[
            <Button type="primary" onClick={handleBackToPayment} key="retry">
              {t('paymentStatus.retryPayment')}
            </Button>,
            <Button onClick={() => navigate('/help')} key="help">
              {t('paymentStatus.contactSupport')}
            </Button>,
          ]}
        />
      )}
    </div>
  );
};

export default PaymentStatus;
