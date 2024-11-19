import { useState } from 'react';
import './Cart.css';
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
    // Logic cập nhật giỏ hàng
  };

  const handleApplyCoupon = () => {
    // Logic áp dụng mã giảm giá
  };

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <div className="breadcrumb">Home / Cart</div>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="product-cell">
                <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>
                  ✕
                </button>
                <img src={item.image} alt={item.name} className="product-image" />
                <span>{item.name}</span>
              </td>
              <td>${item.price}</td>
              <td>
                <select
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </td>
              <td>${item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cart-actions">
        <button className="return-button">Return To Shop</button>
        <button className="update-button" onClick={handleUpdateCart}>
          Update Cart
        </button>
      </div>

      <div className="coupon-total">
        <div className="coupon-section">
          <input type="text" placeholder="Coupon Code" className="coupon-input" />
          <button className="apply-coupon-button" onClick={handleApplyCoupon}>
            Apply Coupon
          </button>
        </div>

        <div className="cart-summary">
          <h3>Cart Total</h3>
          <div className="cart-summary-row">
            <span>Subtotal:</span>
            <span>${subtotal}</span>
          </div>
          <div className="cart-summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="cart-summary-total">
            <span>Total:</span>
            <span>${subtotal}</span>
          </div>
          <button className="checkout-button">
            <Link to="/checkout" style={{ color: 'white', textDecoration: 'none' }}>
              Proceed to checkout
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
