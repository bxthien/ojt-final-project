import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../components/CheckoutContext';
import { Form, Input, Button } from 'antd';
import ShippingAddress from '../components/shipping/ShippingAddress';
import OrderInformation from '../components/shipping/OrderInformation';
import { fetchProducts, Product } from '../constants/shipping'; // Import API

interface FormValues {
  contact: string;
}

const Shipping: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [subtotal] = useState(9.99);
  const [shipping] = useState(0);
  const [total] = useState(subtotal + shipping);
  const navigate = useNavigate();
  const { setContact } = useCheckout();

  const [form] = Form.useForm();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(); // Gọi API
        setProducts(data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    loadProducts();
  }, []);

  const handleGoToPayment = (values: FormValues) => {
    const { contact } = values;
    setContact(contact);
    navigate('/payment');
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row p-4 bg-gray-50 min-h-screen">
        <div className="flex-1 bg-white p-6 shadow-lg rounded-md">
          <div className="mb-6 text-sm text-gray-500">
            <span>Cart &gt; </span>
            <span>Details &gt; </span>
            <span className="text-green-500 font-medium">Shipping &gt; </span>
            <span>Payment</span>
          </div>
          <Form form={form} layout="vertical" onFinish={handleGoToPayment}>
            <Form.Item
              label="Contact Information"
              name="contact"
              rules={[{ required: true, message: 'Please input your contact information!' }]}
            >
              <Input placeholder="Enter your contact information" />
            </Form.Item>

            <ShippingAddress />

            <div className="flex justify-between mt-4">
              <Button type="link" className="text-green-500 hover:underline">
                Back to cart
              </Button>
              <Button type="primary" htmlType="submit" className="bg-green-500 text-white">
                Go to Payment
              </Button>
            </div>
          </Form>
        </div>
        <div className="flex-1 mt-8 md:mt-0 md:ml-8 bg-white p-6 shadow-lg rounded-md">
          <OrderInformation subtotal={subtotal} shipping={shipping} total={total} />
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Products</h3>
            <ul className="mt-4 space-y-2">
              {products.map((product) => (
                <li key={product.id} className="border-b pb-2">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.category}</div>
                  <div className="text-sm font-semibold text-green-500">
                    ${product.price.toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
