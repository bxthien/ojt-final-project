import { useEffect, useState } from 'react';
import { Table, Input, Button, Card, Row, Col, Space, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { getCartItems } from '../../constants/cart';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

interface Product {
  id: string;
  name: string;
  price: number;
  url: string;
  quantity: number;
}

interface CardProduct {
  transactionId: string;
  quantity: number;
  price: number;
  product: Product;
}

function Cart() {
  const { t } = useTranslation();
  const [items, setItems] = useState<CardProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const [transactionId] = useState('54f51a4d-f9b5-4f17-9f17-385eb4b9e834');
  const [coupon, setCoupon] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      console.log('Fetching cart with transactionId:', transactionId);
      setLoading(true);
      try {
        const data = await getCartItems(transactionId);
        console.log('Fetched cart data:', data);
        setItems(data.transactions || []);
        setTotal(data.price || 0);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [transactionId]);

  const handleRemoveItem = async (id: string) => {
    setLoading(true);
    try {
      setItems(items.filter((item) => item.product.id !== id));
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (id: string, operation: 'increase' | 'decrease') => {
    const updatedItems = items.map((item) => {
      if (item.product.id === id) {
        const updatedQuantity = operation === 'increase' ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: updatedQuantity >= 1 ? updatedQuantity : 1 };
      }
      return item;
    });

    setItems(updatedItems);
  };

  useEffect(() => {
    const calculatedTotal = items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    setTotal(calculatedTotal);
  }, [items]);

  const handleApplyCoupon = () => {
    alert(t('cart.couponApplied'));
  };

  const columns = [
    {
      title: t('cart.product'),
      dataIndex: 'name',
      key: 'name',
      render: (_: unknown, record: CardProduct) => (
        <Space size="middle" className="flex items-center">
          <Button
            type="text"
            icon={<CloseOutlined className="text-red-500" />}
            onClick={() => handleRemoveItem(record.product.id)}
          />
          <img src={record.product.url} alt={record.product.name} className="w-15 h-15 rounded" />
          <Text>{record.product.name}</Text>
        </Space>
      ),
    },
    {
      title: t('cart.price'),
      dataIndex: 'price',
      key: 'price',
      render: (_price: number, record: CardProduct) => `$${record.product.price}`,
    },
    {
      title: t('cart.quantity'),
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number, record: CardProduct) => (
        <div className="flex items-center">
          <button
            onClick={() => handleQuantityChange(record.product.id, 'decrease')}
            className="px-2 py-1"
          >
            -
          </button>
          <span className="px-4">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(record.product.id, 'increase')}
            className="px-2 py-1"
          >
            +
          </button>
        </div>
      ),
    },
    {
      title: t('cart.subtotal'),
      dataIndex: 'subtotal',
      key: 'subtotal',
      render: (_: unknown, record: CardProduct) => `$${record.quantity * record.product.price}`,
    },
  ];

  return (
    <div className="cart-container p-5 max-w-5xl mx-auto">
      <Title level={2}>{t('cart.title')}</Title>
      <Text type="secondary">{t('cart.subtitle')}</Text>
      <Table
        dataSource={items}
        columns={columns}
        rowKey="transactionId"
        pagination={false}
        loading={loading}
        className="mt-5 mb-10"
      />

      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Card>
            <Title level={4}>{t('cart.applyCoupon')}</Title>
            <Space direction="vertical" size="middle" className="w-full">
              <Input
                placeholder={t('cart.couponPlaceholder')}
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <Button
                type="primary"
                className="bg-[#56B280] border-[#56B280] text-white hover:bg-[#3D8F64] hover:border-[#3D8F64]"
                onClick={handleApplyCoupon}
              >
                {t('cart.applyCouponButton')}
              </Button>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card>
            <Title level={4}>{t('cart.cartTotal')}</Title>
            <Space direction="vertical" size="middle" className="w-full">
              <Row justify="space-between" className="w-full">
                <Text>{t('cart.subtotal')}:</Text>
                <Text>${total}</Text>
              </Row>
              <Row justify="space-between" className="w-full">
                <Text>{t('cart.shipping')}:</Text>
                <Text>{t('cart.free')}</Text>
              </Row>
              <Row justify="space-between" className="w-full font-bold">
                <Text>{t('cart.total')}:</Text>
                <Text>${total}</Text>
              </Row>
              <Button
                type="primary"
                className="bg-[#56B280] border-[#56B280] text-white hover:bg-[#3D8F64] hover:border-[#3D8F64]"
                block
                onClick={() => (window.location.href = '/checkout')}
              >
                {t('cart.proceedToCheckout')}
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Cart;
