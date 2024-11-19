import { useState } from 'react';
import './Checkout.css';

const Checkout = () => {
  const [, setBillingDetails] = useState({
    firstName: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    city: '',
    phoneNumber: '',
    emailAddress: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('bank');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handlePlaceOrder = () => {
    // Logic xử lý đặt hàng
    alert('Order placed successfully!');
  };

  const subtotal = 1750;

  return (
    <div className="checkout-container">
      <div className="billing-details">
        <h2 className="title">Billing Details</h2>
        <form>
          <input
            type="text"
            name="firstName"
            placeholder="First Name*"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="streetAddress"
            placeholder="Street Address*"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="apartment"
            placeholder="Apartment, floor, etc. (optional)"
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="Town/City*"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number*"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="emailAddress"
            placeholder="Email Address*"
            onChange={handleChange}
            required
          />
          <label>
            <input type="checkbox" />
            Save this information for faster check-out next time
          </label>
        </form>
      </div>

      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="cart-items">
          <div className="cart-item">
            <span>LCD Monitor</span>
            <span>$650</span>
          </div>
          <div className="cart-item">
            <span>H1 Gamepad</span>
            <span>$1100</span>
          </div>
        </div>
        <div className="cart-summary-checkout">
          <div className="cart-summary-row">Subtotal: ${subtotal}</div> <hr />
          <div className="cart-summary-row">Shipping: Free</div>
          <hr />
          <div className="cart-summary-total">Total: ${subtotal}</div>
        </div>

        <div className="payment-methods">
          <label>
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={paymentMethod === 'bank'}
              onChange={() => setPaymentMethod('bank')}
            />
            Bank
            <img src="" alt="" />
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={() => setPaymentMethod('cash')}
            />
            Cash on delivery
          </label>
        </div>

        <div className="coupon-section">
          <input type="text" placeholder="Coupon Code" className="coupon-input-checkout" />
          <button className="apply-coupon-button">Apply Coupon</button>
        </div>

        <button className="place-order-button" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
