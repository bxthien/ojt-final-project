import React from 'react';
import { Form, Input, Checkbox } from 'antd';
import { useCheckout } from '../CheckoutContext';

const BillingAddress: React.FC = () => {
  const { billingAddress, setBillingAddress } = useCheckout();

  return (
    <Form>
      <h3 className="font-semibold text-lg mb-2">Billing Address</h3>
      <Form.Item>
        <Checkbox
          checked={billingAddress.sameAsShipping}
          onChange={(e) => setBillingAddress({ sameAsShipping: e.target.checked })}
        >
          Same as the shipping address
        </Checkbox>
      </Form.Item>
      {!billingAddress.sameAsShipping && (
        <Form.Item
          name="billingAddress"
          rules={[{ required: true, message: 'Please enter your billing address!' }]}
        >
          <Input
            placeholder="Enter Billing Address"
            className="w-full p-2 border rounded-md mt-2"
          />
        </Form.Item>
      )}
    </Form>
  );
};

export default BillingAddress;
