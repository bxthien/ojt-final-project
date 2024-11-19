import { useState } from 'react';
import { Link } from 'react-router-dom';

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

  const handleUpdateCart = () => {
    alert('Cart updated successfully!');
  };

  const handleApplyCoupon = () => {
    alert('Coupon applied successfully!');
  };

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-5 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      <div className="text-sm text-gray-500 mb-5">Home / Cart</div>

      {/* Table Section */}
      <table className="w-full border-collapse mb-8">
        <thead>
          <tr>
            <th className="p-4 text-left border-b-2 border-gray-200">Product</th>
            <th className="p-4 text-left border-b-2 border-gray-200">Price</th>
            <th className="p-4 text-left border-b-2 border-gray-200">Quantity</th>
            <th className="p-4 text-left border-b-2 border-gray-200">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-gray-200">
              <td className="p-4 flex items-center">
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 text-lg mr-4 cursor-pointer"
                >
                  ✕
                </button>
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded mr-4" />
                <span className="text-lg">{item.name}</span>
              </td>
              <td className="p-4 text-lg">${item.price}</td>
              <td className="p-4">
                <select
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  className="p-2 border border-gray-300 rounded"
                >
                  {[...Array(10).keys()].map((q) => (
                    <option key={q + 1} value={q + 1}>
                      {q + 1}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-4 text-lg">${item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-8">
        <button className="px-5 py-2 border border-gray-300 rounded bg-white text-sm cursor-pointer">
          Return To Shop
        </button>
        <button
          onClick={handleUpdateCart}
          className="px-5 py-2 border border-gray-300 rounded bg-white text-sm cursor-pointer"
        >
          Update Cart
        </button>
      </div>

      {/* Coupon and Cart Total Section */}
      <div className="flex justify-between items-start gap-8">
        {/* Coupon Section */}
        <div className="flex flex-col items-start gap-4">
          <h3 className="text-lg font-bold">Apply Coupon</h3>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              placeholder="Coupon Code"
              className="w-52 p-2 border border-gray-300 rounded text-sm"
            />
            <button
              onClick={handleApplyCoupon}
              className="px-5 py-2 bg-green-500 text-white rounded text-sm cursor-pointer"
            >
              Apply Coupon
            </button>
          </div>
        </div>

        {/* Cart Total Section */}
        <div className="border border-gray-300 rounded p-6 w-96 flex flex-col gap-4">
          <h3 className="text-lg font-bold">Cart Total</h3>
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${subtotal}</span>
          </div>
          <button className="px-5 py-2 bg-green-500 text-white rounded text-sm mt-4">
            <Link to="/checkout" className="text-white no-underline">
              Proceed to checkout
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
