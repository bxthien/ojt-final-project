import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Row, Space, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import {
  getCartItems,
  minusQuantityCartProduct,
  plusQuantityCartProduct,
  removeFromCart,
} from '../../constants/cart';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

export interface Product {
  id: string;
  name: string;
  price: number;
  url: string;
  quantity: number;
}

export interface CardProduct {
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
  // const [coupon, setCoupon] = useState('');
  const [total, setTotal] = useState(0);

  console.log(items);

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
      await removeFromCart(id);

      setItems(items.filter((item) => item.transactionId !== id));
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlusChange = async (id: string) => {
    try {
      const updatedItem = await plusQuantityCartProduct(id);
      if (updatedItem) {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.transactionId === id ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      }
    } catch (error) {
      console.error('Error increasing quantity:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMinusChange = async (id: string) => {
    try {
      const updatedItem = await minusQuantityCartProduct(id);
      if (updatedItem) {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.transactionId === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
      }
    } catch (error) {
      console.error('Error increasing quantity:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const calculatedTotal = items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    setTotal(calculatedTotal);
  }, [items]);

  const columns = [
    {
      title: t('cart.product'),
      dataIndex: 'name',
      key: 'name',
      render: (_: unknown, record: CardProduct) => (
        <Space size="middle" className="flex items-center">
          <img src={record.product.url} alt={record.product.name} className="w-20 h-20 rounded" />
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
          <button onClick={() => handleMinusChange(record.transactionId)} className="px-2 py-1">
            -
          </button>
          <span className="px-4">{quantity}</span>
          <button onClick={() => handlePlusChange(record.transactionId)} className="px-2 py-1">
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
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: unknown, record: CardProduct) => (
        <Space size="middle" className="flex items-center">
          <Button
            type="text"
            icon={<CloseOutlined className="text-red-500" />}
            onClick={() => handleRemoveItem(record.transactionId)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="cart-container py-5 max-w-5xl mx-auto">
      <Title level={2}>Cart</Title>

      {/* {items.map((item) => (
        <CartItem item={item} />
      ))} */}

      <Row gutter={24}>
        {/* Coupon Section */}
        <Col xs={24} md={16}>
          <Table
            dataSource={items}
            columns={columns}
            rowKey="transactionId" // Sử dụng transactionId làm rowKey
            pagination={false}
            loading={loading}
          />
        </Col>
        <Col xs={24} md={8}>
          <Card className="shadow-md">
            <Title level={4}>Cart Total</Title>
            <Space direction="vertical" size="middle" className="w-full">
              <Row justify="space-between" className="w-full">
                <Text>{t('cart.subtotal')}:</Text>
                <Text>${total}</Text>
              </Row>
              <Row justify="space-between" className="w-full">
                <Text>{t('cart.shipping')}:</Text>
                <Text>{t('cart.free')}</Text>
              </Row>
              <Divider />
              <Row justify="space-between" className="w-full font-bold">
                <Text>{t('cart.total')}:</Text>
                <Text>${total}</Text>
              </Row>
            </Space>
          </Card>
          <div className="px-4 mt-4 flex items-end justify-center">
            <Button
              type="primary"
              className="bg-[#56B280] border-[#56B280] text-white hover:bg-[#3D8F64] hover:border-[#3D8F64] h-10"
              block
              onClick={() => (window.location.href = '/checkout')}
            >
              {t('cart.proceedToCheckout')}
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Cart;
