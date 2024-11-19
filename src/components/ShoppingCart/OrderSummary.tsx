const OrderSummary = ({ subtotal = 0, tax = 0, shipping = 0, total = 0 }) => {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        padding: '30px',
        borderRadius: '10px',
        maxWidth: '400px',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontWeight: 'bold',
          fontSize: '1.5rem',
          marginBottom: '20px',
        }}
      >
        Order Summary
      </h2>

      {/* Discount and Bonus Code Section */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Discount code / Promo code"
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '14px',
          }}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Enter Card Number"
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '14px',
            }}
          />
          <button
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Apply
          </button>
        </div>
      </div>

      {/* Subtotals */}
      <div style={{ marginBottom: '20px', fontSize: '14px', lineHeight: '1.6' }}>
        <p style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Subtotal:</span> <strong>${subtotal.toFixed(2)}</strong>
        </p>
        <p style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Estimated Tax:</span> <strong>${tax.toFixed(2)}</strong>
        </p>
        <p style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Estimated shipping & Handling:</span> <strong>${shipping.toFixed(2)}</strong>
        </p>
      </div>

      {/* Total */}
      <h3
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '20px',
        }}
      >
        <span>Total:</span> <strong>${total.toFixed(2)}</strong>
      </h3>

      {/* Checkout Button */}
      <button
        style={{
          padding: '15px',
          width: '100%',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
