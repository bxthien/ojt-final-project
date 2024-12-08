import React from 'react';
import { Form, Input, Checkbox } from 'antd';
import { useCheckout } from '../CheckoutContext';
import { useTranslation } from 'react-i18next';

const BillingAddress: React.FC = () => {
  const { t } = useTranslation();
  const { billingAddress, setBillingAddress } = useCheckout();

  return (
    <Form>
      <h3 className="font-semibold text-lg mb-2">{t('billingAddress.billingAddress')}</h3>
      <Form.Item>
        <Checkbox
          checked={billingAddress.sameAsShipping}
          onChange={(e) => setBillingAddress({ sameAsShipping: e.target.checked })}
        >
          {t('billingAddress.sameAsShipping')}
        </Checkbox>
      </Form.Item>
      {!billingAddress.sameAsShipping && (
        <Form.Item
          name="billingAddress"
          rules={[{ required: true, message: t('billingAddress.addressRequired') }]}
        >
          <Input
            placeholder={t('billingAddress.enterBillingAddress')}
            className="w-full p-2 border rounded-md mt-2"
          />
        </Form.Item>
      )}
    </Form>
  );
};

export default BillingAddress;
