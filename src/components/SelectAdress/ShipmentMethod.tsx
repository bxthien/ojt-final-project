import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShipmentMethod = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('free');

  const handleNext = () => {
    if (selectedMethod) {
      navigate('/payment'); // Replace this with the path to the next step
    } else {
      alert('Please select a shipment method.');
    }
  };

  return (
    <div
      style={{
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      {/* Steps */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '30px',
          alignItems: 'center',
        }}
      >
        <div style={{ color: '#ccc' }}>Step 1: Address</div>
        <div>
          <span style={{ fontWeight: 'bold', color: '#000' }}>●</span> Step 2: Shipping
        </div>
        <div style={{ color: '#ccc' }}>Step 3: Payment</div>
      </div>

      {/* Title */}
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
        Shipment Method
      </h2>

      {/* Shipment Options */}
      <div style={{ marginBottom: '40px' }}>
        <div
          style={{
            border: selectedMethod === 'free' ? '2px solid #4CAF50' : '1px solid #ddd',
            padding: '15px',
            borderRadius: '5px',
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setSelectedMethod('free')}
        >
          <div>
            <strong>Free</strong>{' '}
            <span style={{ color: '#666', marginLeft: '10px' }}>Regular shipment</span>
          </div>
          <span>17 Oct, 2023</span>
        </div>

        <div
          style={{
            border: selectedMethod === 'fast' ? '2px solid #4CAF50' : '1px solid #ddd',
            padding: '15px',
            borderRadius: '5px',
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setSelectedMethod('fast')}
        >
          <div>
            <strong>$8.50</strong>{' '}
            <span style={{ color: '#666', marginLeft: '10px' }}>
              Get your delivery as soon as possible
            </span>
          </div>
          <span>1 Oct, 2023</span>
        </div>

        <div
          style={{
            border: selectedMethod === 'schedule' ? '2px solid #4CAF50' : '1px solid #ddd',
            padding: '15px',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setSelectedMethod('schedule')}
        >
          <div>
            <strong>Schedule</strong>{' '}
            <span style={{ color: '#666', marginLeft: '10px' }}>
              Pick a date when you want to get your delivery
            </span>
          </div>
          <span>Select Date ▼</span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <button
          style={{
            border: '1px solid #ddd',
            padding: '12px 24px',
            borderRadius: '5px',
            backgroundColor: 'white',
            cursor: 'pointer',
            fontSize: '16px',
          }}
          onClick={() => navigate(-1)} // Back to previous page
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
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShipmentMethod;
