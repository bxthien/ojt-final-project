import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddressCard from './AddressCard';

const SelectAddress = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      title: '2118 Thornridge',
      type: 'HOME',
      address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
      phone: '(209) 555-0104',
    },
    {
      id: 2,
      title: 'Headoffice',
      type: 'OFFICE',
      address: '2715 Ash Dr. San Jose, South Dakota 83475',
      phone: '(704) 555-0127',
    },
  ]);

  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id || null);

  const handleNext = () => {
    if (selectedAddress) {
      navigate('/shipment-method');
    } else {
      alert('Please select an address before proceeding.');
    }
  };

  const handleAddNewAddress = () => {
    const newId = addresses.length + 1;
    const newAddress = {
      id: newId,
      title: `New Address ${newId}`,
      type: 'OTHER',
      address: '1234 New St. City, Country',
      phone: '(123) 456-7890',
    };
    setAddresses([...addresses, newAddress]);
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
          fontSize: '16px',
        }}
      >
        <div>
          <span style={{ fontWeight: 'bold', color: '#000' }}>●</span> Step 1: Address
        </div>
        <div style={{ color: '#ccc' }}>Step 2: Shipping</div>
        <div style={{ color: '#ccc' }}>Step 3: Payment</div>
      </div>

      {/* Select Address */}
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Select Address</h2>
      <div style={{ marginTop: '20px' }}>
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            isSelected={selectedAddress === address.id}
            onSelect={() => setSelectedAddress(address.id)}
            onEdit={() => alert(`Edit address ${address.id}`)}
            onDelete={() => setAddresses(addresses.filter((a) => a.id !== address.id))}
          />
        ))}

        {/* Add New Address Button */}
        <div
          style={{
            textAlign: 'center',
            margin: '20px 0',
            cursor: 'pointer',
            color: 'black',
            fontSize: '16px',
          }}
          onClick={handleAddNewAddress}
        >
          + Add New Address
        </div>
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          marginTop: '40px',
        }}
      >
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

export default SelectAddress;
