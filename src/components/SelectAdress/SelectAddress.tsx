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
    <div className="p-10 font-sans max-w-3xl mx-auto">
      {/* Steps */}
      <div className="flex justify-between items-center text-base mb-8">
        <div>
          <span className="font-bold text-black">●</span> Step 1: Address
        </div>
        <div className="text-gray-400">Step 2: Shipping</div>
        <div className="text-gray-400">Step 3: Payment</div>
      </div>

      {/* Select Address */}
      <h2 className="text-2xl mb-5">Select Address</h2>
      <div className="mt-5">
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
          className="text-center text-lg cursor-pointer text-black mt-5"
          onClick={handleAddNewAddress}
        >
          + Add New Address
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-3 mt-10">
        <button
          className="border border-gray-300 py-3 px-6 rounded-md bg-white text-base cursor-pointer"
          onClick={() => navigate(-1)} // Back to previous page
        >
          Back
        </button>
        <button
          className="bg-green-500 text-white py-3 px-6 rounded-md text-base cursor-pointer"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectAddress;
