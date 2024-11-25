import React, { useState } from 'react';
import { useCheckout } from '../CheckoutContext';
import { Form, Input, Button } from 'antd';

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
        <Form layout="vertical">
          {Object.keys(shippingAddress).map((key) => (
            <Form.Item key={key} label={key.charAt(0).toUpperCase() + key.slice(1)}>
              <Input
                type="text"
                value={shippingInput[key as keyof typeof shippingAddress]}
                onChange={(e) =>
                  setShippingInput((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
                placeholder={`Enter ${key}`}
              />
            </Form.Item>
          ))}
          <Form.Item>
            <Button type="primary" onClick={handleSave} className="w-full">
              Save
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div className="flex justify-between items-center">
          <p>{`${shippingAddress.name || 'No Name'} ${shippingAddress.secondName || ''}`}</p>
          <p>
            {shippingAddress.address || 'No Address'}, {shippingAddress.city || ''},{' '}
            {shippingAddress.district || ''}, {shippingAddress.province || ''}
          </p>
          <Button onClick={() => setIsEditing(true)} type="link" className="text-green-500">
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShippingInfo;
