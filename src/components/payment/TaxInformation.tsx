import React from 'react';
import { useCheckout } from '../CheckoutContext';
import { Form, Input } from 'antd';

const TaxInfo: React.FC = () => {
  const { taxInformation, setTaxInformation } = useCheckout();

  return (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-2">Tax Information</h3>
      <Form layout="vertical">
        <Form.Item label="VAT Number" required tooltip="Your VAT identification number">
          <Input
            type="text"
            placeholder="VAT Number"
            value={taxInformation.vatNumber || ''}
            onChange={(e) => setTaxInformation({ ...taxInformation, vatNumber: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="PEC (Optional)">
          <Input
            type="text"
            placeholder="PEC (Optional)"
            value={taxInformation.pec || ''}
            onChange={(e) => setTaxInformation({ ...taxInformation, pec: e.target.value })}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default TaxInfo;
