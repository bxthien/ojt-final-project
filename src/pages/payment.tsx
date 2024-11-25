import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import Footer from '../components/footer';
import Header from '../components/header/header';
import ContactInfo from '../components/payment/ContactInfo';
import ShippingAddress from '../components/payment/ShippingInfo';
import PaymentMethod from '../components/payment/PaymentMethod';
import TaxInfo from '../components/payment/TaxInformation';
import BillingAddress from '../components/payment/BillingAddress';
import OrderSummary from '../components/payment/OrderSummary';

const Payment: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToShipping = () => {
    navigate('/shipping');
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex flex-col md:flex-row p-6 bg-gray-100 min-h-screen">
        <div className="flex-1 bg-white p-6 shadow-md rounded-md">
          <div className="mb-6 text-sm text-gray-500">
            <span>Cart &gt; </span>
            <span>Details &gt; </span>
            <span>Shipping &gt; </span>
            <span className="text-green-500 font-medium">Payment</span>
          </div>
          <ContactInfo />
          <ShippingAddress />
          <PaymentMethod />
          <TaxInfo />
          <BillingAddress />
          <div className="flex justify-between mt-4">
            <Button
              type="link"
              onClick={handleBackToShipping}
              className="text-green-500 hover:underline"
            >
              Back to Shipping
            </Button>
            <Button type="primary" className="bg-green-500 text-white">
              Pay Now
            </Button>
          </div>
        </div>
        <OrderSummary />
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
