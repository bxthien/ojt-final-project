import React from 'react';
import { useCheckout } from '../CheckoutContext';

const BillingAddress: React.FC = () => {
  const { billingAddress, setBillingAddress } = useCheckout();

  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Billing Address</h3>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={billingAddress.sameAsShipping}
          onChange={(e) => setBillingAddress({ sameAsShipping: e.target.checked })}
          className="form-checkbox text-green-500"
        />
        <span>Same as the shipping address</span>
      </label>
      {!billingAddress.sameAsShipping && (
        <input
          type="text"
          placeholder="Enter Billing Address"
          className="w-full p-2 border rounded-md mt-2"
        />
      )}
    </div>
  );
};

export default BillingAddress;
