import React, { useState } from 'react';
import { useCheckout } from '../CheckoutContext';

const ShippingInfo: React.FC = () => {
  const { shippingAddress, setShippingAddress } = useCheckout();
  const [isEditing, setIsEditing] = useState(false);
  const [shippingInput, setShippingInput] = useState(shippingAddress);

  const handleSave = () => {
    setShippingAddress(shippingInput);
    setIsEditing(false);
  };

  return (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
      {isEditing ? (
        <div>
          {Object.keys(shippingAddress).map((key) => (
            <input
              key={key}
              type="text"
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={shippingInput[key as keyof typeof shippingAddress]}
              onChange={(e) =>
                setShippingInput((prev) => ({
                  ...prev,
                  [key]: e.target.value,
                }))
              }
              className="w-full p-2 border rounded-md mb-2"
            />
          ))}
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p>{`${shippingAddress.name || 'No Name'} ${shippingAddress.secondName || ''}`}</p>
          <p>
            {shippingAddress.address || 'No Address'}, {shippingAddress.city || ''},{' '}
            {shippingAddress.district || ''}, {shippingAddress.province || ''}
          </p>
          <button onClick={() => setIsEditing(true)} className="text-green-500 hover:underline">
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default ShippingInfo;
