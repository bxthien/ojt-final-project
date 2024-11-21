import React from 'react';
import MockupIp from '../../assets/images/mockupIp.png';

const OrderSummary: React.FC = () => {
  return (
    <div className="flex-1 mt-8 md:mt-0 md:ml-8 bg-white p-6 shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Order Information</h2>
      <div className="flex items-center mb-4 border-b pb-4">
        <img src={MockupIp} alt="Spiced Mint Candleaf" className="w-12 h-12 rounded mr-4" />
        <div>
          <h3 className="font-semibold">Spiced Mint Candleaf®</h3>
          <p className="text-green-600">$9.99</p>
        </div>
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Coupon code"
          className="w-full p-2 border rounded-md mb-2"
        />
        <button className="bg-gray-300 p-2 rounded-md">Add Code</button>
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>$9.99</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>Free Shipping</span>
        </div>
        <div className="flex justify-between font-semibold text-lg mt-6">
          <span>Total</span>
          <span>$9.99</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
