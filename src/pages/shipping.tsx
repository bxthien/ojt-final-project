import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../components/CheckoutContext';
import CustomerInformation from '../components/shipping/CustomerInformation';
import ShippingAddress from '../components/shipping/ShippingAddress';
import OrderInformation from '../components/shipping/OrderInformation';

const Shipping: React.FC = () => {
  const [subtotal] = useState(9.99);
  const [shipping] = useState(0);
  const [total] = useState(subtotal + shipping);
  const navigate = useNavigate();
  const { setContact } = useCheckout();

  const [contactInput, setContactInput] = useState('');
  const [shippingInput, setShippingInput] = useState({
    name: '',
    secondName: '',
    address: '',
    city: '',
    postalCode: '',
    district: '',
    province: '',
  });

  const handleGoToShipping = () => {
    setContact(contactInput);
    setShippingInput(shippingInput);

    navigate('/payment');
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row p-4 bg-gray-50 min-h-screen">
        <div className="flex-1 bg-white p-6 shadow-lg rounded-md">
          <div className="mb-6 text-sm text-gray-500">
            <span>Cart &gt; </span>
            <span>Details &gt; </span>
            <span className="text-green-500 font-medium">Shipping &gt; </span>
            <span>Payment</span>
          </div>
          <CustomerInformation contactInput={contactInput} setContactInput={setContactInput} />
          <ShippingAddress />
          <div className="flex justify-between mt-4">
            <button className="text-green-500 hover:underline">Back to cart</button>
            <button
              onClick={handleGoToShipping}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Go to Payment
            </button>
          </div>
        </div>
        <div className="flex-1 mt-8 md:mt-0 md:ml-8 bg-white p-6 shadow-lg rounded-md">
          <OrderInformation subtotal={subtotal} shipping={shipping} total={total} />
        </div>
      </div>
    </div>
  );
};

export default Shipping;
