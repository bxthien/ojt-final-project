import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShipmentMethod = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('free');

  const handleNext = () => {
    if (selectedMethod) {
      navigate('/payment');
    } else {
      alert('Please select a shipment method.');
    }
  };

  return (
    <div className="px-10 py-10 max-w-3xl mx-auto font-sans">
      {/* Steps */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-gray-400">Step 1: Address</div>
        <div className="flex items-center text-gray-800">
          <span className="font-bold text-lg">●</span> Step 2: Shipping
        </div>
        <div className="text-gray-400">Step 3: Payment</div>
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold mb-6">Shipment Method</h2>

      {/* Shipment Options */}
      <div className="mb-10">
        <div
          className={`border ${
            selectedMethod === 'free' ? 'border-green-500' : 'border-gray-300'
          } rounded-lg p-4 mb-4 flex justify-between items-center cursor-pointer`}
          onClick={() => setSelectedMethod('free')}
        >
          <div>
            <strong>Free</strong>
            <span className="text-gray-500 ml-3">Regular shipment</span>
          </div>
          <span>17 Oct, 2023</span>
        </div>

        <div
          className={`border ${
            selectedMethod === 'fast' ? 'border-green-500' : 'border-gray-300'
          } rounded-lg p-4 mb-4 flex justify-between items-center cursor-pointer`}
          onClick={() => setSelectedMethod('fast')}
        >
          <div>
            <strong>$8.50</strong>
            <span className="text-gray-500 ml-3">Get your delivery as soon as possible</span>
          </div>
          <span>1 Oct, 2023</span>
        </div>

        <div
          className={`border ${
            selectedMethod === 'schedule' ? 'border-green-500' : 'border-gray-300'
          } rounded-lg p-4 flex justify-between items-center cursor-pointer`}
          onClick={() => setSelectedMethod('schedule')}
        >
          <div>
            <strong>Schedule</strong>
            <span className="text-gray-500 ml-3">
              Pick a date when you want to get your delivery
            </span>
          </div>
          <span>Select Date ▼</span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4">
        <button
          className="border border-gray-300 py-2 px-6 rounded-lg bg-white text-base cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <button
          className="bg-green-500 text-white py-2 px-6 rounded-lg text-base cursor-pointer"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShipmentMethod;
