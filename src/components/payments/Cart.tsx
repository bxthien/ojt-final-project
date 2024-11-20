import { JSXElementConstructor, ReactElement, ReactNode, useState } from 'react';
import { Table, Input, Button, Select, Card, Row, Col, Space, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

function Cart() {
  const [items, setItems] = useState([
    { id: 1, name: 'LCD Monitor', price: 650, quantity: 1, image: 'src/assets/images/manhinh.png' },
    { id: 2, name: 'H1 Gamepad', price: 550, quantity: 2, image: 'src/assets/images/taycam.png' },
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleQuantityChange = (id: number, newQuantity: any) => {
    setItems(items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleApplyCoupon = () => {
    alert('Coupon applied successfully!');
  };

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (
        _: any,
        record: {
          id: any;
          image: string | undefined;
          name:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | null
            | undefined;
        }
      ) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<CloseOutlined style={{ color: 'red' }} />}
            onClick={() => handleRemoveItem(record.id)}
          />
          <img src={record.image} style={{ width: '60px', height: '60px', borderRadius: '4px' }} />
          <Text>{record.name}</Text>
        </Space>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: unknown) => `$${price}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (quantity: any, record: { id: any }) => (
        <Select
          value={quantity}
          onChange={(value) => handleQuantityChange(record.id, value)}
          style={{ width: 80 }}
        >
          {[...Array(10).keys()].map((q) => (
            <Select.Option key={q + 1} value={q + 1}>
              {q + 1}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: { price: number; quantity: number }) =>
        `$${record.price * record.quantity}`,
    },
  ];

  return (
    <div className="cart-container" style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      <Title level={2}>Cart</Title>
      <Text type="secondary">Home / Cart</Text>
      <Table
        dataSource={items}
        columns={columns}
        rowKey="id"
        pagination={false}
        style={{ marginTop: '20px', marginBottom: '40px' }}
      />

      <Row gutter={24}>
        {/* Coupon Section */}
        <Col xs={24} md={12}>
          <Card>
            <Title level={4}>Apply Coupon</Title>
            <Space direction="vertical" size="middle">
              <Input placeholder="Coupon Code" />
              <Button
                className="bg-[#56B280] border-[#56B280] hover:bg-[#3D8F64] text-white"
                onClick={handleApplyCoupon}
              >
                Apply Coupon
              </Button>
            </Space>
          </Card>
        </Col>

        {/* Cart Total Section */}
        <Col xs={24} md={12}>
          <Card>
            <Title level={4}>Cart Total</Title>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Row justify="space-between">
                <Text>Subtotal:</Text>
                <Text>${subtotal}</Text>
              </Row>
              <Row justify="space-between">
                <Text>Shipping:</Text>
                <Text>Free</Text>
              </Row>
              <Row justify="space-between" style={{ fontWeight: 'bold' }}>
                <Text>Total:</Text>
                <Text>${subtotal}</Text>
              </Row>
              <Button block className="bg-[#56B280] border-[#56B280] hover:bg-[#3D8F64] text-white">
                <Link to="/checkout">Proceed to checkout</Link>
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Cart;
