import React, { useEffect, useState } from 'react';
import { useCheckout } from '../CheckoutContext';
import { Form, Input, Select } from 'antd';

const { Option } = Select;

interface District {
  name: string;
  code: number;
}

interface Province {
  name: string;
  code: number;
  districts: District[];
}

const ShippingAddress: React.FC = () => {
  const { shippingAddress, setShippingAddress } = useCheckout();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState(shippingAddress.province || '');
  const [selectedDistrict, setSelectedDistrict] = useState(shippingAddress.district || '');

  // Fetch provinces from API
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch('https://provinces.open-api.vn/api/?depth=2');
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error('Failed to fetch provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    setSelectedDistrict('');
    setShippingAddress({ ...shippingAddress, province, district: '', city: '' });
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    setShippingAddress({ ...shippingAddress, district, city: '' });
  };

  const availableDistricts =
    provinces.find((prov) => prov.name === selectedProvince)?.districts || [];

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
      </Form>
    </div>
  );
};

export default ShippingAddress;
