import React, { useState } from 'react';
import { useCheckout } from '../CheckoutContext';
import { provinces } from '../../constants/locationData';

const ShippingAddress: React.FC = () => {
  const { shippingAddress, setShippingAddress } = useCheckout();
  const [selectedProvince, setSelectedProvince] = useState(shippingAddress.province || '');
  const [selectedDistrict, setSelectedDistrict] = useState(shippingAddress.district || '');

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    setSelectedDistrict('');
    setShippingAddress({ ...shippingAddress, province, district: '', city: '' });
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    setShippingAddress({ ...shippingAddress, district, city: '' });
  };

  const handleCityChange = (city: string) => {
    setShippingAddress({ ...shippingAddress, city });
  };

  const availableDistricts =
    provinces.find((prov) => prov.name === selectedProvince)?.districts || [];
  const availableCities =
    availableDistricts.find((dist) => dist.name === selectedDistrict)?.cities || [];

  return (
    <div className="mt-4">
      <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
      <input
        type="text"
        placeholder="First Name"
        value={shippingAddress.name || ''}
        onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
        className="w-full p-2 border rounded-md mb-2"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={shippingAddress.secondName || ''}
        onChange={(e) => setShippingAddress({ ...shippingAddress, secondName: e.target.value })}
        className="w-full p-2 border rounded-md mb-2"
      />
      <input
        type="text"
        placeholder="Address"
        value={shippingAddress.address || ''}
        onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
        className="w-full p-2 border rounded-md mb-2"
      />
      <input
        type="text"
        placeholder="Postal Code"
        value={shippingAddress.postalCode || ''}
        onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
        className="w-full p-2 border rounded-md mb-2"
      />
      <div className="mt-4">
        <label className="block mb-2 font-medium">Province</label>
        <select
          value={selectedProvince}
          onChange={(e) => handleProvinceChange(e.target.value)}
          className="w-full p-2 border rounded-md mb-2"
        >
          <option value="">Select Province</option>
          {provinces.map((prov) => (
            <option key={prov.name} value={prov.name}>
              {prov.name}
            </option>
          ))}
        </select>
      </div>
      {selectedProvince && (
        <div>
          <label className="block mb-2 font-medium">District</label>
          <select
            value={selectedDistrict}
            onChange={(e) => handleDistrictChange(e.target.value)}
            className="w-full p-2 border rounded-md mb-2"
          >
            <option value="">Select District</option>
            {availableDistricts.map((dist) => (
              <option key={dist.name} value={dist.name}>
                {dist.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedDistrict && (
        <div>
          <label className="block mb-2 font-medium">City</label>
          <select
            value={shippingAddress.city || ''}
            onChange={(e) => handleCityChange(e.target.value)}
            className="w-full p-2 border rounded-md mb-2"
          >
            <option value="">Select City</option>
            {availableCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default ShippingAddress;
