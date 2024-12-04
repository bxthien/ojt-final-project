import React, { useEffect, useState } from 'react';
import { useCheckout } from '../CheckoutContext';
import { fetchLocationData, Province } from '../../constants/locationData';
import { Form, Input, Select } from 'antd';

const { Option } = Select;

const ShippingAddress: React.FC = () => {
  const { shippingAddress, setShippingAddress } = useCheckout();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState(shippingAddress.province || '');
  const [selectedDistrict, setSelectedDistrict] = useState(shippingAddress.district || '');
  const [selectedWard, setSelectedWard] = useState(shippingAddress.city || '');

  useEffect(() => {
    const loadLocationData = async () => {
      try {
        const data = await fetchLocationData();
        setProvinces(data);
      } catch (error) {
        console.error('Failed to load location data:', error);
      }
    };

    loadLocationData();
  }, []);

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    setSelectedDistrict('');
    setSelectedWard('');
    setShippingAddress({ ...shippingAddress, province, district: '', city: '' });
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    setSelectedWard('');
    setShippingAddress({ ...shippingAddress, district, city: '' });
  };

  const handleWardChange = (ward: string) => {
    setSelectedWard(ward);
    setShippingAddress({ ...shippingAddress, city: ward });
  };

  const availableDistricts =
    provinces.find((prov) => prov.name === selectedProvince)?.districts || [];
  const availableWards =
    availableDistricts.find((dist) => dist.name === selectedDistrict)?.wards || [];

  return (
    <div className="mt-4">
      <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
      <Form layout="vertical">
        <Form.Item label="First Name" required>
          <Input
            placeholder="First Name"
            value={shippingAddress.name || ''}
            onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Last Name" required>
          <Input
            placeholder="Last Name"
            value={shippingAddress.secondName || ''}
            onChange={(e) => setShippingAddress({ ...shippingAddress, secondName: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Address" required>
          <Input
            placeholder="Address"
            value={shippingAddress.address || ''}
            onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Postal Code" required>
          <Input
            placeholder="Postal Code"
            value={shippingAddress.postalCode || ''}
            onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Province" required>
          <Select
            value={selectedProvince}
            onChange={handleProvinceChange}
            placeholder="Select Province"
          >
            {provinces.map((prov) => (
              <Option key={prov.code} value={prov.name}>
                {prov.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {selectedProvince && (
          <Form.Item label="District" required>
            <Select
              value={selectedDistrict}
              onChange={handleDistrictChange}
              placeholder="Select District"
            >
              {availableDistricts.map((dist) => (
                <Option key={dist.code} value={dist.name}>
                  {dist.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        {selectedDistrict && (
          <Form.Item label="Ward" required>
            <Select value={selectedWard} onChange={handleWardChange} placeholder="Select Ward">
              {availableWards.map((ward) => (
                <Option key={ward.code} value={ward.name}>
                  {ward.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};

export default ShippingAddress;
