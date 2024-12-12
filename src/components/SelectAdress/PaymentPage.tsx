import { Steps, Card, Typography, Input, Button, Divider, Row, Col, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCartItems } from '../../constants/cart';
import { fromStoredData } from '../../services/storage';
import { CardProduct } from '../carts/Cart';
import { getDetailAddress } from '../../api/payment';
import { AddressProps } from './SelectAddress';
import axiosInstance from '../../services/axios';

const { Step } = Steps;
const { Title, Text } = Typography;

const PaymentPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [items, setItems] = useState<CardProduct[]>([]);
  // const [total, setTotal] = useState(0);
  // const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState<AddressProps>({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const addressId = queryParams.get('address');
  const paymentMethod = queryParams.get('paymentMethod');

  const totalFinal = items.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        // Fetch cart items
        const cartData = await getCartItems(fromStoredData(userId) || '');
        setItems(cartData || []);
        // setTotal(cartData?.price || 0);

        // Fetch address details
        const addressData = await getDetailAddress(fromStoredData(addressId));
        setAddress(addressData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateOrder = async () => {
    if (paymentMethod === 'banking') {
      const resOrder = await axiosInstance.post('/orders', {
        userId: fromStoredData(userId),
        addressId,
        methodShipping: 'banking',
        status: 'finish_order',
        listCartTransactionId: items.map((item) => {
          return item.transactionId;
        }),
      });

      const params = {
        orderId: resOrder.data.orderId,
        amount: (totalFinal + 1) * 25000,
        orderInfo: 'Pay_For_Viper',
      };

      const res = await axiosInstance.get('/payment/create', { params });
      window.location.href = res.data.url;
    } else {
      await axiosInstance.post('/orders', {
        userId: fromStoredData(userId),
        addressId,
        methodShipping: 'cod',
        status: 'not_payment',
        listCartTransactionId: items.map((item) => {
          return item.transactionId;
        }),
      });

      notification.success({
        message: 'Create Order Successfully',
        description: 'Create Successfully',
      });

      navigate('/paymentsuccess');
    }
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Steps */}
        <Steps current={2} className="mb-10">
          <Step title={t('payment.address')} />
          <Step title={t('payment.shipping')} />
          <Step title={t('payment.payment')} />
        </Steps>

        {/* Layout for Summary and Payment */}
        <Row gutter={24} className="flex items-center justify-center">
          {/* Summary Section */}
          <Col xs={24} lg={12}>
            <Card
              title={t('payment.summary')}
              bordered
              className="shadow-md"
              bodyStyle={{ padding: '24px 16px' }}
            >
              <Title level={5} className="pb-3">
                Cart Product
              </Title>
              <div className="mb-4">
                {items.map((item, idx) => (
                  <Row
                    justify="space-between"
                    align="middle"
                    key={idx}
                    className="mb-2 border-b border-gray-300 pb-2"
                  >
                    <Col>
                      <span className="font-bold">{`${item?.quantity} x`}</span>
                      <span className="ml-2">{item?.product?.name}</span>
                    </Col>
                    <Col>
                      <span className="text-right font-semibold text-red-700">${item.price}</span>
                    </Col>
                  </Row>
                ))}
              </div>

              {/* Apply Coupon Section */}
              <Divider />
              <div className="mb-4">
                <Title level={5} className="mb-3">
                  {/* {t('payment.applyCoupon')} */}
                  Apply Coupon
                </Title>
                <div className="flex items-center space-x-4">
                  <Input placeholder="Enter coupon" className="flex-1" />
                  <Button
                    type="primary"
                    className="bg-blue-600 border-blue-600 text-white hover:bg-blue-500"
                    // onClick={applyCoupon}
                  >
                    {/* {t('payment.apply')} */}
                    Apply
                  </Button>
                </div>
              </div>

              {/* Address and Shipment Method */}
              <Divider />
              <div className="bg-white">
                <Title level={5} className="pb-3 text-gray-800">
                  {t('payment.addressLabel')}
                </Title>
                <div className="mt-3 space-y-1">
                  <Text className="block font-semibold text-gray-900">
                    {address?.recipientName}
                  </Text>
                  <Text className="block text-gray-700">{`${address?.detailedAddress} - ${address.ward} - ${address.district} - ${address.province}`}</Text>
                  <Text className="block mt-2 font-medium text-blue-600">{address?.phone}</Text>
                </div>
              </div>
              <Divider />
              <div>
                <Title level={5} className="mb-3">
                  {t('payment.shipmentMethod')}
                </Title>
                <Text>{paymentMethod === 'cod' ? 'Cash on delivery' : 'Pay by Vnpay'}</Text>
              </div>

              {/* Subtotals */}
              <Divider />
              <Row justify="space-between" className="mb-2">
                <Col>{t('payment.subtotal')}</Col>
                <Col>${totalFinal}</Col>
              </Row>
              <Row justify="space-between" className="mb-2">
                <Col>{t('payment.estimatedShipping')}</Col>
                <Col>$1</Col>
              </Row>
              <Divider />
              <Row justify="space-between">
                <Col>
                  <Title level={5}>{t('payment.total')}</Title>
                </Col>
                <Col>
                  <Title level={5}>${totalFinal + 1}</Title>
                </Col>
              </Row>
              <Row justify="end" className="mt-10" gutter={16}>
                <Col>
                  <Button onClick={() => navigate(-1)}>Back</Button>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    // onClick={() => alert('Payment Successful!')}
                    onClick={() => handleCreateOrder()}
                    className="bg-[#56B280] border-[#56B280] hover:bg-[#3D8F64] text-white"
                  >
                    Confirm Order
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PaymentPage;
