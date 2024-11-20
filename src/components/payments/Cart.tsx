import { useState } from 'react';
import { Table, Input, Button, Select, Card, Row, Col, Space, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

function Cart() {
  const [items, setItems] = useState([
    { id: 1, name: 'LCD Monitor', price: 650, quantity: 1, image: 'src/assets/images/manhinh.png' },
    { id: 2, name: 'H1 Gamepad', price: 550, quantity: 2, image: 'src/assets/images/taycam.png' },
  ]);

  const handleQuantityChange = (id: number, newQuantity: number) => {
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
      render: (_: unknown, record: { id: number; image: string | undefined; name: string }) => (
        <Space size="middle" className="flex items-center">
          <Button
            type="text"
            icon={<CloseOutlined className="text-red-500" />}
            onClick={() => handleRemoveItem(record.id)}
          />
          <img src={record.image} alt={record.name} className="w-15 h-15 rounded" />
          <Text>{record.name}</Text>
        </Space>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `$${price}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number, record: { id: number }) => (
        <Select
          value={quantity}
          onChange={(value) => handleQuantityChange(record.id, value)}
          className="w-20"
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
      render: (_: unknown, record: { price: number; quantity: number }) =>
        `$${record.price * record.quantity}`,
    },
  ];

  return (
    <div className="cart-container p-5 max-w-5xl mx-auto">
      <Title level={2}>Cart</Title>
      <Text type="secondary">Home / Cart</Text>
      <Table
        dataSource={items}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="mt-5 mb-10"
      />

      <Row gutter={24}>
        {/* Coupon Section */}
        <Col xs={24} md={12}>
          <Card>
            <Title level={4}>Apply Coupon</Title>
            <Space direction="vertical" size="middle" className="w-full">
              <Input placeholder="Coupon Code" />
              <Button
                type="primary"
                className="bg-[#56B280] border-[#56B280] text-white hover:bg-[#3D8F64] hover:border-[#3D8F64]"
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
            <Space direction="vertical" size="middle" className="w-full">
              <Row justify="space-between" className="w-full">
                <Text>Subtotal:</Text>
                <Text>${subtotal}</Text>
              </Row>
              <Row justify="space-between" className="w-full">
                <Text>Shipping:</Text>
                <Text>Free</Text>
              </Row>
              <Row justify="space-between" className="w-full font-bold">
                <Text>Total:</Text>
                <Text>${subtotal}</Text>
              </Row>
              <Button
                type="primary"
                className="bg-[#56B280] border-[#56B280] text-white hover:bg-[#3D8F64] hover:border-[#3D8F64]"
                block
                onClick={() => (window.location.href = '/checkout')}
              >
                Proceed to checkout
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Cart;
