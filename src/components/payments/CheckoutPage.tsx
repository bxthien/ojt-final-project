import { useState } from 'react';

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setBillingDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
  };

  const subtotal = 1750;

  return (
    <div
      style={{
        display: 'flex',
        gap: '30px',
        padding: '40px 20px',
        maxWidth: '1200px',
        margin: 'auto',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}
    >
      {/* Billing Details */}
      <div style={{ flex: 1, marginRight: '20px' }}>
        <h2
          style={{
            fontSize: '1.8rem',
            marginBottom: '20px',
            fontWeight: 'bold',
          }}
        >
          Billing Details
        </h2>
        <form>
          {[
            { name: 'firstName', placeholder: 'First Name*', required: true },
            { name: 'companyName', placeholder: 'Company Name' },
            { name: 'streetAddress', placeholder: 'Street Address*', required: true },
            { name: 'apartment', placeholder: 'Apartment, floor, etc. (optional)' },
            { name: 'city', placeholder: 'Town/City*', required: true },
            { name: 'phoneNumber', placeholder: 'Phone Number*', required: true },
            { name: 'emailAddress', placeholder: 'Email Address*', required: true },
          ].map((input, index) => (
            <input
              key={index}
              type={input.name === 'emailAddress' ? 'email' : 'text'}
              name={input.name}
              placeholder={input.placeholder}
              onChange={handleChange}
              required={input.required}
              style={{
                width: '100%',
                padding: '12px',
                margin: '10px 0',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px',
              }}
            />
          ))}
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '15px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            <input
              type="checkbox"
              style={{
                marginRight: '10px',
              }}
            />
            Save this information for faster check-out next time
          </label>
        </form>
      </div>

      {/* Order Summary */}
      <div
        style={{
          flex: 0.8,
          border: '1px solid #ddd',
          borderRadius: '5px',
          padding: '20px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Order Summary</h2>
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '15px',
            }}
          >
            <span>LCD Monitor</span>
            <span>$650</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '15px',
            }}
          >
            <span>H1 Gamepad</span>
            <span>$1100</span>
          </div>
        </div>
        <div
          style={{
            margin: '20px 0',
            borderTop: '1px solid #ddd',
            paddingTop: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <span>Subtotal:</span>
            <span>${subtotal}</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '10px',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
          >
            <span>Total:</span>
            <span>${subtotal}</span>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              cursor: 'pointer',
            }}
          >
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={paymentMethod === 'bank'}
              onChange={() => setPaymentMethod('bank')}
              style={{
                marginRight: '10px',
              }}
            />
            Bank
          </label>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={() => setPaymentMethod('cash')}
              style={{
                marginRight: '10px',
              }}
            />
            Cash on delivery
          </label>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '20px',
          }}
        >
          <input
            type="text"
            placeholder="Coupon Code"
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
            }}
          />
          <button
            style={{
              padding: '10px',
              border: 'none',
              backgroundColor: '#28a745',
              color: 'white',
              cursor: 'pointer',
              borderRadius: '5px',
            }}
          >
            Apply Coupon
          </button>
        </div>

        <button
          onClick={handlePlaceOrder}
          style={{
            padding: '12px',
            width: '100%',
            backgroundColor: '#28a745',
            color: 'white',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
