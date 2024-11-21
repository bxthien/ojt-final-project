import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToShopping = () => {
    navigate('/');
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <div className="text-green-500 text-6xl">&#10004;</div>
        <h1 className="text-2xl font-bold">Payment Confirmed</h1>
        <p>ORDER #2039</p>
        <p>
          Thank you Joe for buying Candleleaf. The nature is grateful to you. Now that your order is
          confirmed it will be ready to ship in 2 days. Please check your inbox for your order
          updates.
        </p>

        <button
          onClick={handleBackToShopping}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
        >
          Back to shopping
        </button>
        <button onClick={handlePrintReceipt} className="mt-2 text-green-500">
          Print receipt
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
