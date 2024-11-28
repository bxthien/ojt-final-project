import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Steps, Card, Typography, Button, Space, Modal } from 'antd';

const { Step } = Steps;
const { Title, Text } = Typography;

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
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id || null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedAddress) {
      navigate('/shipment-method');
    } else {
      Modal.warning({
        title: 'No Address Selected',
        content: 'Please select an address before proceeding.',
      });
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
    <div className="p-10 max-w-3xl mx-auto">
      {/* Steps */}
      <Steps current={0} className="mb-10">
        <Step title="Address" />
        <Step title="Shipping" />
        <Step title="Payment" />
      </Steps>

      {/* Select Address */}
      <Title level={3} className="mb-5">
        Select Address
      </Title>
      <Space direction="vertical" size="large" className="w-full">
        {addresses.map((address) => (
          <Card
            key={address.id}
            className={`cursor-pointer ${
              selectedAddress === address.id
                ? 'border-2 border-[#52c41a]'
                : 'border border-gray-300'
            }`}
            onClick={() => setSelectedAddress(address.id)}
          >
            <Space direction="vertical" className="w-full">
              <Title level={5} className="mb-0">
                {address.title}{' '}
                <span className="bg-black text-white px-2 py-1 rounded text-xs">
                  {address.type}
                </span>
              </Title>
              <Text className="text-gray-600">{address.address}</Text>
              <Text className="text-gray-600">{address.phone}</Text>
            </Space>
          </Card>
        ))}

        {/* Add New Address Button */}
        <Button
          type="link"
          onClick={handleAddNewAddress}
          className="text-lg text-black hover:text-[#52c41a]"
        >
          + Add New Address
        </Button>
      </Space>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-3 mt-10">
        <Button
          onClick={() => navigate(-1)}
          className="border border-[#499125] text-[#52c41a] hover:bg-[#52c41a] hover:text-white"
        >
          Back
        </Button>
        <Button
          type="primary"
          onClick={handleNext}
          className="bg-[#56B280] border-[#56B280] hover:bg-[#3D8F64] text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default SelectAddress;
