import CartItem from './CartItem';
import OrderSummary from './OrderSummary';

const ShoppingCart = () => {
  const cartItems = [
    {
      id: '1',
      name: 'Apple iPhone 14 Pro Max 128Gb Deep Purple',
      price: 1399,
      image: 'src/assets/images/iphone.png',
      sku: '#25139526913984',
    },
    {
      id: '2',
      name: 'AirPods Max Silver',
      price: 549,
      image: 'src/assets/images/airmax.png',
      sku: '#53459358345',
    },
    {
      id: '3',
      name: 'Apple Watch Series 9 GPS 41mm Starlight Aluminium',
      price: 399,
      image: 'src/assets/images/airpod.png',
      sku: '#63632324',
    },
  ];

  const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
  const estimatedTax = 50;
  const shipping = 29;
  const total = subtotal + estimatedTax + shipping;

  return (
    <div style={{ display: 'flex', padding: '20px', gap: '20px' }}>
      <div style={{ flex: 2 }}>
        <h2 style={{ fontWeight: 'bold', fontSize: '1.5rem,', marginBottom: '20px' }}>
          Shopping Cart
        </h2>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} onQuantityChange={undefined} />
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <OrderSummary subtotal={subtotal} tax={estimatedTax} shipping={shipping} total={total} />
      </div>
    </div>
  );
};

export default ShoppingCart;
