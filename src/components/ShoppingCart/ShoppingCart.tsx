import { Row, Col, Typography } from 'antd';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';

const { Title } = Typography;

const ShoppingCart = () => {
  const cartItems = [
    {
      id: '1',
      name: 'Apple iPhone 14 Pro Max 128Gb Deep Purple',
      price: 1399,
      image: '/assets/images/iphone.png',
      sku: '#25139526913984',
    },
    {
      id: '2',
      name: 'AirPods Max Silver',
      price: 549,
      image: '/assets/images/airmax.png',
      sku: '#53459358345',
    },
    {
      id: '3',
      name: 'Apple Watch Series 9 GPS 41mm Starlight Aluminium',
      price: 399,
      image: '/assets/images/airpod.png',
      sku: '#63632324',
    },
  ];

  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const estimatedTax = 50;
  const shipping = 29;
  const total = subtotal + estimatedTax + shipping;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleQuantityChange = (id: any, quantity: unknown) => {
    console.log(`Updated item ${id} to quantity ${quantity}`);
  };

  return (
    <Row
      gutter={[24, 24]}
      style={{ padding: '24px', maxWidth: '1200px', margin: 'auto', justifyContent: 'center' }}
    >
      {/* Cart Items Section */}
      <Col xs={24} lg={16}>
        <Title level={3} style={{ marginBottom: '24px' }}>
          Shopping Cart
        </Title>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} onQuantityChange={handleQuantityChange} />
        ))}
      </Col>

      {/* Order Summary Section */}
      <Col xs={24} lg={8}>
        <OrderSummary subtotal={subtotal} tax={estimatedTax} shipping={shipping} total={total} />
      </Col>
    </Row>
  );
};

export default ShoppingCart;
