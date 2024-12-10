import React, { useState } from 'react';
import { useCheckout } from '../CheckoutContext';
import { Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';

const ShippingInfo: React.FC = () => {
  const { t } = useTranslation();
  const { shippingAddress, setShippingAddress } = useCheckout();
  const [isEditing, setIsEditing] = useState(false);
  const [shippingInput, setShippingInput] = useState(shippingAddress);

  const handleSave = () => {
    setShippingAddress(shippingInput);
    setIsEditing(false);
  };

  return (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-2">{t('checkout.shippingAddressTitle')}</h3>
      {isEditing ? (
        <Form layout="vertical">
          {Object.keys(shippingAddress).map((key) => (
            <Form.Item
              key={key}
              label={t(`checkout.${key}`) || key.charAt(0).toUpperCase() + key.slice(1)}
            >
              <Input
                type="text"
                value={shippingInput[key as keyof typeof shippingAddress]}
                onChange={(e) =>
                  setShippingInput((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
                placeholder={
                  t(`checkout.enter${key.charAt(0).toUpperCase() + key.slice(1)}`) || `Enter ${key}`
                } // i18n cho placeholder
              />
            </Form.Item>
          ))}
          <Form.Item>
            <Button type="primary" onClick={handleSave} className="w-full">
              {t('checkout.save')}
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div className="flex justify-between items-center">
          <p>{`${shippingAddress.name || t('checkout.noName')} ${shippingAddress.secondName || ''}`}</p>
          <p>
            {shippingAddress.address || t('checkout.noAddress')}, {shippingAddress.city || ''},{' '}
            {shippingAddress.district || ''}, {shippingAddress.province || ''}
          </p>
          <Button onClick={() => setIsEditing(true)} type="link" className="text-green-500">
            {t('checkout.edit')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShippingInfo;
