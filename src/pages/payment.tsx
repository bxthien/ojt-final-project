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

const { Text } = Typography;

const Payment: React.FC = () => {
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
          <span>Cart &gt; </span>
          <span>Details &gt; </span>
          <span>Shipping &gt; </span>
          <span className="text-green-500 font-medium">Payment</span>
        </div>
        <ContactInfo />
        <ShippingAddress />
        <PaymentMethod />
        <TaxInfo />
        <BillingAddress />

        {loading ? (
          <Text>Loading products...</Text>
        ) : error ? (
          <Text type="danger">{error}</Text>
        ) : (
          <Card title="Order Summary" className="mt-6">
            <Space direction="vertical" size="large" className="w-full">
              {products.map((product) => (
                <div key={product.id} className="flex justify-between items-center">
                  <Text>{product.name}</Text>
                  <Text>${product.price}</Text>
                </div>
              ))}
              <Divider />
              <div className="flex justify-between">
                <Text>Total:</Text>
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
            Back to Shipping
          </Button>
          <Button type="primary" className="bg-green-500 text-white">
            Pay Now
          </Button>
        </div>
      </div>
      <OrderSummary />
    </div>
  );
};

export default Payment;
