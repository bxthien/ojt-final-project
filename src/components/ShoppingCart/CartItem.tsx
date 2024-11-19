import { useState } from 'react';

const CartItem = ({
  item = { id: '', name: '', image: '', price: 0, sku: '' },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onQuantityChange = (_id: string, _newQuantity: unknown) => {},
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(item.id, newQuantity);
    }
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(item.id, newQuantity);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '50px', maxWidth: '900px' }}>
      <img
        src={item.image || 'https://via.placeholder.com/100'}
        alt={item.name || 'Unknown'}
        style={{ width: '100px', marginRight: '20px' }}
      />
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 5px 0' }}>{item.name || 'Unnamed Item'}</h4>
        <p style={{ margin: '0 0 5px 0', color: '#666' }}>{item.sku || 'No SKU'}</p>
        <p style={{ margin: 0, fontWeight: 'bold' }}>${item.price.toFixed(2)}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          onClick={handleDecrease}
          style={{
            margin: '0 5px',
            padding: '5px 10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: '#f9f9f9',
          }}
        >
          -
        </button>
        <span style={{ margin: '0 10px', fontWeight: 'bold' }}>{quantity}</span>
        <button
          onClick={handleIncrease}
          style={{
            margin: '0 5px',
            padding: '5px 10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: '#f9f9f9',
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
