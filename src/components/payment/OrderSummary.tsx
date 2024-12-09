import React from 'react';
import { Form, Input, Button } from 'antd';
import MockupIp from '../../assets/images/mockupIp.png';
import { useTranslation } from 'react-i18next';

const OrderSummary: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex-1 mt-8 md:mt-0 md:ml-8 bg-white p-6 shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">{t('orderSummary.orderInformation')}</h2>

      <div className="flex items-center mb-4 border-b pb-4">
        <img
          src={MockupIp}
          alt={t('orderSummary.productName')}
          className="w-12 h-12 rounded mr-4"
        />
        <div>
          <h3 className="font-semibold">{t('orderSummary.productName')}</h3>
          <p className="text-green-600">$9.99</p>
        </div>
      </div>

      <div className="mt-4">
        <Form.Item>
          <Input
            type="text"
            placeholder={t('orderSummary.couponPlaceholder')}
            className="w-full mb-2"
          />
        </Form.Item>
        <Form.Item>
          <Button className="bg-gray-300 p-2 rounded-md">{t('orderSummary.addCoupon')}</Button>
        </Form.Item>
      </div>

      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between mb-2">
          <span>{t('orderSummary.subtotal')}</span>
          <span>$9.99</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>{t('orderSummary.shipping')}</span>
          <span>{t('orderSummary.freeShipping')}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg mt-6">
          <span>{t('orderSummary.total')}</span>
          <span>$9.99</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
