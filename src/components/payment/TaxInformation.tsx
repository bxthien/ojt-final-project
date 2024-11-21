import React from 'react';
import { useCheckout } from '../CheckoutContext';

const TaxInfo: React.FC = () => {
  const { taxInformation, setTaxInformation } = useCheckout();

  return (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-2">Tax Information</h3>
      <input
        type="text"
        placeholder="VAT Number"
        value={taxInformation.vatNumber || ''}
        onChange={(e) => setTaxInformation({ ...taxInformation, vatNumber: e.target.value })}
        className="w-full p-2 border rounded-md mb-2"
      />
      <input
        type="text"
        placeholder="PEC (Optional)"
        value={taxInformation.pec || ''}
        onChange={(e) => setTaxInformation({ ...taxInformation, pec: e.target.value })}
        className="w-full p-2 border rounded-md"
      />
    </div>
  );
};

export default TaxInfo;
