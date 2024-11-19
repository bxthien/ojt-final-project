import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', padding: '40px 0' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* Steps */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '40px',
            gap: '100px',
            fontSize: '14px',
          }}
        >
          {/* Step 1: Address */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ccc' }}>
            <span
              style={{
                display: 'inline-block',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#4CAF50',
                textAlign: 'center',
                lineHeight: '24px',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              1
            </span>
            <span style={{ color: '#666', fontSize: '16px' }}>Address</span>
          </div>

          {/* Step 2: Shipping */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ccc' }}>
            <span
              style={{
                display: 'inline-block',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#4CAF50',
                textAlign: 'center',
                lineHeight: '24px',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              2
            </span>
            <span style={{ color: '#666', fontSize: '16px' }}>Shipping</span>
          </div>

          {/* Step 3: Payment */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#000' }}>
            <span
              style={{
                display: 'inline-block',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#4CAF50',
                textAlign: 'center',
                lineHeight: '24px',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              3
            </span>
            <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Payment</span>
          </div>
        </div>

        {/* Layout for Summary and Payment */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '40px',
          }}
        >
          {/* Summary Section */}
          <div
            style={{
              flex: 1,
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '30px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3 style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '20px' }}>Summary</h3>
            {/* Items */}
            <div style={{ marginBottom: '30px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                  fontSize: '16px',
                }}
              >
                <span>Apple iPhone 14 Pro Max 128Gb</span>
                <strong>$1399</strong>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                  fontSize: '16px',
                }}
              >
                <span>AirPods Max Silver</span>
                <strong>$549</strong>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                  fontSize: '16px',
                }}
              >
                <span>Apple Watch Series 9 GPS 41mm</span>
                <strong>$399</strong>
              </div>
            </div>
            {/* Address and Shipment Method */}
            <div style={{ marginBottom: '30px', fontSize: '16px', color: '#333' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '10px', fontWeight: 'bold' }}>
                Address
              </h4>
              <p style={{ marginBottom: '15px' }}>1131 Dusty Townline, Jacksonville, TX 40322</p>
              <h4 style={{ fontSize: '18px', marginBottom: '10px', fontWeight: 'bold' }}>
                Shipment method
              </h4>
              <p>Free</p>
            </div>
            {/* Subtotals */}
            <div style={{ borderTop: '1px solid #ddd', paddingTop: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '15px',
                  fontSize: '16px',
                }}
              >
                <span>Subtotal</span> <strong>$2347</strong>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '15px',
                  fontSize: '16px',
                }}
              >
                <span>Estimated Tax</span> <strong>$50</strong>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '15px',
                  fontSize: '16px',
                }}
              >
                <span>Estimated shipping & Handling</span> <strong>$29</strong>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '20px',
                  fontWeight: 'bold',
                  fontSize: '18px',
                }}
              >
                <span>Total</span> <strong>$2426</strong>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div
            style={{
              flex: 1.5,
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '30px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3 style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '20px' }}>Payment</h3>
            {/* Payment Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '20px',
                marginBottom: '30px',
                borderBottom: '1px solid #ddd',
                paddingBottom: '15px',
                fontSize: '16px',
              }}
            >
              <div style={{ fontWeight: 'bold', cursor: 'pointer' }}>Credit Card</div>
              <div style={{ color: '#666', cursor: 'pointer' }}>PayPal</div>
              <div style={{ color: '#666', cursor: 'pointer' }}>PayPal Credit</div>
            </div>
            {/* Credit Card Form */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <img
                src="src/assets/images/image65.png"
                alt="Credit Card"
                style={{ marginBottom: '20px', borderRadius: '10px', maxWidth: '100%' }}
              />
            </div>
            <form>
              <input
                type="text"
                placeholder="Cardholder Name"
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                }}
              />
              <input
                type="text"
                placeholder="Card Number"
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                }}
              />
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                <input
                  type="text"
                  placeholder="Exp.Date"
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                  }}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                  }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <input type="checkbox" id="billingAddress" style={{ marginRight: '10px' }} />
                <label htmlFor="billingAddress" style={{ fontSize: '16px' }}>
                  Same as billing address
                </label>
              </div>
            </form>

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
              <button
                style={{
                  border: '1px solid #ddd',
                  padding: '12px 24px',
                  borderRadius: '5px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
                onClick={() => navigate(-1)} // Back to Shipment Method
              >
                Back
              </button>
              <button
                style={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
                onClick={() => alert('Payment Successful!')}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
