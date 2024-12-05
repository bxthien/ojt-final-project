import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

interface PaymentStatusProps {
  status: 'success' | 'failed';
  orderId?: string;
  customerName?: string;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ status, orderId, customerName }) => {
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
          title="Payment Confirmed"
          subTitle={
            <>
              {orderId && <p>ORDER #{orderId}</p>}
              <p>
                Thank you {customerName || 'Customer'} for your purchase! Your order is confirmed
                and will be ready to ship in 2 days. Please check your inbox for updates.
              </p>
            </>
          }
          extra={[
            <Button type="primary" onClick={handleBackToShopping} key="back">
              Back to shopping
            </Button>,
            <Button onClick={() => window.print()} key="print">
              Print receipt
            </Button>,
          ]}
        />
      ) : (
        <Result
          status="error"
          title="Payment Failed"
          subTitle="We encountered an issue while processing your payment. Please try again or contact support."
          extra={[
            <Button type="primary" onClick={handleBackToPayment} key="retry">
              Retry Payment
            </Button>,
            <Button onClick={() => navigate('/help')} key="help">
              Contact Support
            </Button>,
          ]}
        />
      )}
    </div>
  );
};

export default PaymentStatus;
