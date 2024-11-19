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
    // Logic cập nhật giỏ hàng
    alert('Cart updated successfully!');
  };

  const handleApplyCoupon = () => {
    // Logic áp dụng mã giảm giá
    alert('Coupon applied successfully!');
  };

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '1200px',
        margin: 'auto',
      }}
    >
      <h2 style={{ fontSize: '24px', marginBottom: '10px', fontWeight: 'bold' }}>Cart</h2>
      <div
        style={{
          fontSize: '14px',
          color: '#888',
          marginBottom: '20px',
        }}
      >
        Home / Cart
      </div>

      {/* Table Section */}
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '30px',
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>
              Product
            </th>
            <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>
              Price
            </th>
            <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>
              Quantity
            </th>
            <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>
              Subtotal
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px',
                  borderBottom: '1px solid #e0e0e0',
                }}
              >
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'red',
                    fontSize: '16px',
                    marginRight: '15px',
                    cursor: 'pointer',
                  }}
                >
                  ✕
                </button>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    marginRight: '15px',
                    borderRadius: '5px',
                  }}
                />
                <span style={{ fontSize: '16px' }}>{item.name}</span>
              </td>
              <td style={{ padding: '15px', fontSize: '16px' }}>${item.price}</td>
              <td style={{ padding: '15px' }}>
                <select
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  style={{
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                  }}
                >
                  {[...Array(10).keys()].map((q) => (
                    <option key={q + 1} value={q + 1}>
                      {q + 1}
                    </option>
                  ))}
                </select>
              </td>
              <td style={{ padding: '15px', fontSize: '16px' }}>${item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
        }}
      >
        <button
          style={{
            padding: '10px 20px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            backgroundColor: 'white',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Return To Shop
        </button>
        <button
          onClick={handleUpdateCart}
          style={{
            padding: '10px 20px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            backgroundColor: 'white',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Update Cart
        </button>
      </div>

      {/* Coupon and Cart Total Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end', // Align right
          alignItems: 'flex-start',
          gap: '20px', // Gap between coupon and cart total
        }}
      >
        {/* Coupon Section */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <input
            type="text"
            placeholder="Coupon Code"
            style={{
              width: '200px', // Shortened input
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '14px',
            }}
          />
          <button
            onClick={handleApplyCoupon}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Apply Coupon
          </button>
        </div>

        {/* Cart Total Section */}
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '5px',
            padding: '20px',
            width: '400px', // Adjusted size for cart total
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <h3
            style={{
              margin: '0',
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >
            Cart Total
          </h3>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>Subtotal:</span>
            <span>${subtotal}</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 'bold',
            }}
          >
            <span>Total:</span>
            <span>${subtotal}</span>
          </div>
          <button
            style={{
              padding: '10px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
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
