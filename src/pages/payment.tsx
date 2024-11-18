import React, { useState } from 'react';
import MockupIC from '../assets/images/mockupIp.png';
import { useNavigate } from 'react-router-dom';

const Payment: React.FC = () => {
  const [subtotal] = useState(9.99);
  const [shipping] = useState(0);
  const [total] = useState(subtotal);
  const navigate = useNavigate();

  const handleGoToShipping = () => {
    navigate('/Shipping');
  };

  return (
    <div className="flex flex-col md:flex-row p-4 bg-gray-50 min-h-screen">
      <div className="flex-1 bg-white p-6 shadow-lg rounded-md">
        <h2 className="text-lg font-semibold mb-4">Customer Information</h2>

        <div className="mb-6 border-t pt-4">
          <label className="block text-sm font-medium mb-2">Contact</label>
          <input
            type="text"
            placeholder="Email or mobile phone number"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
          />
          <div className="flex items-center mt-2">
            <input type="checkbox" id="subscribe" className="mr-2" />
            <label htmlFor="subscribe" className="text-sm">
              Add me to Candleaf newsletter for a 10% discount
            </label>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-4 border-t pt-4">Shipping Address</h3>
        <div className="border-t pt-4 mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Name" className="p-2 border rounded-md" />
          <input type="text" placeholder="Second Name" className="p-2 border rounded-md" />
          <input
            type="text"
            placeholder="Address and number"
            className="col-span-2 p-2 border rounded-md"
          />
          <input type="text" placeholder="City" className="p-2 border rounded-md" />
          <input type="text" placeholder="Postal Code" className="p-2 border rounded-md" />
          <select className="p-2 border rounded-md">
            <option>Province</option>
            <option>KonTum</option>
            <option>Da Nang</option>
          </select>
          <select className="col-span-2 p-2 border rounded-md">
            <option>Country</option>
            <option>VietNam</option>
            <option>England</option>
          </select>
          <div className="flex items-center mt-2">
            <input type="checkbox" id="save-info" className="mr-2" />
            <label htmlFor="save-info" className="text-sm">
              Save this information for a future fast checkout
            </label>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button className="text-green-500 hover:underline">Back to cart</button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={handleGoToShipping}
          >
            Go To Shipping
          </button>
        </div>
      </div>

      <div className="flex-1 mt-8 md:mt-0 md:ml-8 bg-white p-6 shadow-lg rounded-md">
        <h2 className="text-lg font-semibold mb-4">Order Information</h2>
        <div className="flex items-center mb-4 border-t pt-4">
          <img src={MockupIC} alt="Spiced Mint Candleaf" className="w-12 h-12 rounded mr-4" />
          <div>
            <h3 className="font-semibold">Spiced Mint Candleaf®</h3>
            <p className="text-green-600">${subtotal.toFixed(2)}</p>
          </div>
        </div>

        <input type="text" placeholder="Coupon code" className="border p-2 w-full mt-2" />
        <button className="bg-gray-300 p-2 mt-2">Add code</button>

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
    </div>
  );
};

export default Payment;
