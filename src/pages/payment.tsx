import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Space, Typography, Divider } from 'antd';
import ContactInfo from '../components/payment/ContactInfo';
import ShippingAddress from '../components/payment/ShippingInfo';
import PaymentMethod from '../components/payment/PaymentMethod';
import TaxInfo from '../components/payment/TaxInformation';
import BillingAddress from '../components/payment/BillingAddress';
import OrderSummary from '../components/payment/OrderSummary';
import { fetchProducts, Product } from '../constants/payment';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

const Payment: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleBackToShipping = () => {
    navigate('/shipping');
  };

  return (
    <div className="flex flex-col md:flex-row p-6 bg-gray-100 min-h-screen">
      <div className="flex-1 bg-white p-6 shadow-md rounded-md">
        <div className="mb-6 text-sm text-gray-500">
          <span>{t('payment.breadcrumb.cart')} &gt; </span>
          <span>{t('payment.breadcrumb.details')} &gt; </span>
          <span>{t('payment.breadcrumb.shipping')} &gt; </span>
          <span className="text-green-500 font-medium">{t('payment.breadcrumb.payment')}</span>
        </div>
        <ContactInfo />
        <ShippingAddress />
        <PaymentMethod />
        <TaxInfo />
        <BillingAddress />

        {loading ? (
          <Text>{t('payment.loading')}</Text>
        ) : error ? (
          <Text type="danger">{t('payment.error', { error })}</Text>
        ) : (
          <Card title={t('payment.orderSummary.title')} className="mt-6">
            <Space direction="vertical" size="large" className="w-full">
              {products.map((product) => (
                <div key={product.id} className="flex justify-between items-center">
                  <Text>{product.name}</Text>
                  <Text>${product.price}</Text>
                </div>
              ))}
              <Divider />
              <div className="flex justify-between">
                <Text>{t('payment.orderSummary.total')}:</Text>
                <Text>${products.reduce((acc, product) => acc + product.price, 0)}</Text>
              </div>
            </Space>
          </Card>
        )}

        <div className="flex justify-between mt-4">
          <Button
            type="link"
            onClick={handleBackToShipping}
            className="text-green-500 hover:underline"
          >
            {t('payment.buttons.backToShipping')}
          </Button>
          <Button type="primary" className="bg-green-500 text-white">
            {t('payment.buttons.payNow')}
          </Button>
        </div>
      </div>
      <OrderSummary />
    </div>
  );
};

export default Payment;
