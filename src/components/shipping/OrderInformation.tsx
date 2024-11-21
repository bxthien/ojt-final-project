import React from 'react';
import MockupIC from '../../assets/images/mockupIp.png';

interface OrderInformationProps {
  subtotal: number;
  shipping: number;
  total: number;
}

const OrderInformation: React.FC<OrderInformationProps> = ({ subtotal, shipping, total }) => (
  <div>
    <h2 className="text-lg font-semibold mb-4">Order Information</h2>
    <div className="flex items-center mb-4 border-t pt-4">
      <img src={MockupIC} alt="Spiced Mint Candleaf" className="w-12 h-12 rounded mr-4" />
      <div>
        <h3 className="font-semibold">Spiced Mint Candleaf®</h3>
        <p className="text-green-600">${subtotal.toFixed(2)}</p>
      </div>
    </div>
    <div className="mt-6 border-t pt-4">
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Shipping</span>
        <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Calculated at the next step'}</span>
      </div>
      <div className="flex justify-between font-semibold text-lg mt-6 border-t pt-4">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  </div>
);

export default OrderInformation;
