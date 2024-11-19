import { useState } from 'react';

const Checkout = () => {
  const [, setBillingDetails] = useState({
    firstName: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    city: '',
    phoneNumber: '',
    emailAddress: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('bank');

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setBillingDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
  };

  const subtotal = 1750;

  return (
    <div className="flex gap-8 px-5 py-10 max-w-5xl mx-auto items-start justify-between">
      {/* Billing Details */}
      <div className="flex-1 mr-5">
        <h2 className="text-2xl font-bold mb-5">Billing Details</h2>
        <form className="space-y-4">
          {[
            { name: 'firstName', placeholder: 'First Name*', required: true },
            { name: 'companyName', placeholder: 'Company Name' },
            { name: 'streetAddress', placeholder: 'Street Address*', required: true },
            { name: 'apartment', placeholder: 'Apartment, floor, etc. (optional)' },
            { name: 'city', placeholder: 'Town/City*', required: true },
            { name: 'phoneNumber', placeholder: 'Phone Number*', required: true },
            { name: 'emailAddress', placeholder: 'Email Address*', required: true },
          ].map((input, index) => (
            <input
              key={index}
              type={input.name === 'emailAddress' ? 'email' : 'text'}
              name={input.name}
              placeholder={input.placeholder}
              onChange={handleChange}
              required={input.required}
              className="w-full p-3 border border-gray-300 rounded-md text-sm"
            />
          ))}
          <label className="flex items-center mt-4 text-sm cursor-pointer">
            <input type="checkbox" className="mr-2" />
            Save this information for faster check-out next time
          </label>
        </form>
      </div>

      {/* Order Summary */}
      <div className="flex-[0.8] border border-gray-300 rounded-md p-5 bg-gray-50">
        <h2 className="text-xl font-bold mb-5">Order Summary</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>LCD Monitor</span>
            <span>$650</span>
          </div>
          <div className="flex justify-between items-center">
            <span>H1 Gamepad</span>
            <span>$1100</span>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-5 pt-5 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total:</span>
            <span>${subtotal}</span>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={paymentMethod === 'bank'}
              onChange={() => setPaymentMethod('bank')}
              className="mr-3"
            />
            Bank
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={() => setPaymentMethod('cash')}
              className="mr-3"
            />
            Cash on delivery
          </label>
        </div>

        <div className="mt-5 flex gap-3">
          <input
            type="text"
            placeholder="Coupon Code"
            className="flex-1 p-3 border border-gray-300 rounded-md"
          />
          <button className="px-5 py-3 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">
            Apply Coupon
          </button>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="mt-5 w-full px-5 py-3 bg-green-500 text-white rounded-md text-lg font-medium hover:bg-green-600"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
