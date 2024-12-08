import React from 'react';
import { useCheckout } from '../CheckoutContext';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const TaxInfo: React.FC = () => {
  const { t } = useTranslation();
  const { taxInformation, setTaxInformation } = useCheckout();

  return (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-2">{t('checkout.taxInfoTitle')}</h3>
      <Form layout="vertical">
        <Form.Item label={t('checkout.vatNumber')} required tooltip={t('checkout.vatTooltip')}>
          <Input
            type="text"
            placeholder={t('checkout.vatNumber')}
            value={taxInformation.vatNumber || ''}
            onChange={(e) => setTaxInformation({ ...taxInformation, vatNumber: e.target.value })}
          />
        </Form.Item>

        <Form.Item label={t('checkout.pec')} tooltip={t('checkout.pecTooltip')}>
          <Input
            type="text"
            placeholder={t('checkout.pec')}
            value={taxInformation.pec || ''}
            onChange={(e) => setTaxInformation({ ...taxInformation, pec: e.target.value })}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default TaxInfo;
