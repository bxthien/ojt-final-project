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
    <div className="flex items-center mb-12 max-w-3xl">
      <img
        src={item.image || 'https://via.placeholder.com/100'}
        alt={item.name || 'Unknown'}
        className="w-24 h-24 mr-5 rounded"
      />
      <div className="flex-1">
        <h4 className="mb-1 font-medium text-lg">{item.name || 'Unnamed Item'}</h4>
        <p className="mb-1 text-gray-500">{item.sku || 'No SKU'}</p>
        <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={handleDecrease}
          className="mx-2 px-3 py-1 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer"
        >
          -
        </button>
        <span className="mx-3 font-bold">{quantity}</span>
        <button
          onClick={handleIncrease}
          className="mx-2 px-3 py-1 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
