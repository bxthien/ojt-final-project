import React from 'react';

interface CustomerInformationProps {
  contactInput: string;
  setContactInput: (value: string) => void;
}

const CustomerInformation: React.FC<CustomerInformationProps> = ({
  contactInput,
  setContactInput,
}) => (
  <div>
    <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
    <div className="mb-6 border-t pt-4">
      <label className="block text-sm font-medium mb-2">Contact</label>
      <input
        type="text"
        placeholder="Email or mobile phone number"
        value={contactInput}
        onChange={(e) => setContactInput(e.target.value)}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
      />
      <input type="checkbox" id="subscribe" className="mr-2" />
      <label htmlFor="subscribe" className="text-sm">
        Add me to Candleaf newsletter for a 10% discount
      </label>
    </div>
  </div>
);

export default CustomerInformation;
