import { useState } from 'react';
import { Typography, Button, InputNumber } from 'antd';

const { Text } = Typography;

const CartItem = ({
  item = { id: '', name: '', image: '', price: 0, sku: '' },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  onQuantityChange = (_id: any, _newQuantity: any) => {},
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value: number) => {
    const newQuantity = value > 0 ? value : 1; // Ensure positive values only
    setQuantity(newQuantity);
    onQuantityChange(item.id, newQuantity);
  };

  return (
    <div className="flex justify-between items-center border-b border-gray-200 py-4 gap-4">
      {/* Image and Details */}
      <div className="flex items-center gap-4 flex-[2] min-w-[200px]">
        <Button
          type="text"
          className="text-red-500 text-lg"
          onClick={() => onQuantityChange(item.id, 0)}
        >
          ✕
        </Button>
        <img
          src={item.image || 'https://via.placeholder.com/100'}
          alt={item.name || 'Product'}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div>
          <Text strong className="block text-lg mb-1">
            {item.name || 'Unnamed Item'}
          </Text>
          <Text type="secondary" className="text-sm">
            {item.sku || 'No SKU'}
          </Text>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 flex-1 justify-center">
        <Button
          type="text"
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
          className="w-8 h-8 flex justify-center items-center text-lg"
        >
          -
        </Button>
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => handleQuantityChange(value || 1)}
          className="w-16 text-center"
        />
        <Button
          type="text"
          onClick={() => handleQuantityChange(quantity + 1)}
          className="w-8 h-8 flex justify-center items-center text-lg"
        >
          +
        </Button>
      </div>

      {/* Subtotal */}
      <div className="flex-1 text-right">
        <Text strong className="text-lg">
          ${item.price * quantity}
        </Text>
      </div>
    </div>
  );
};

export default CartItem;
