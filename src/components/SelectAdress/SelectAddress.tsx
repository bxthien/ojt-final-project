import { useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import {
  Steps,
  Card,
  Typography,
  Button,
  Space,
  Modal,
  Image,
  Form,
  Input,
  Select,
  notification,
} from 'antd';
import { createAddress, getAllAddress } from '../../api/payment';
import { fromStoredData } from '../../services/storage';
import AddIC from '../../assets/svgs/Plus.svg';
import axios from 'axios';
import { DeleteOutlined } from '@ant-design/icons';

const { Step } = Steps;
const { Title, Text } = Typography;

export interface AddressProps {
  addressId?: string;
  phone?: string;
  province?: string;
  district?: string;
  ward?: string;
  detailedAddress?: string;
  userId?: string;
  email?: string;
  recipientName?: string;
}

interface Province {
  id: string;
  name: string;
  typeText: string;
}

interface District {
  id: string;
  name: string;
  typeText: string;
}

interface Ward {
  id: string;
  name: string;
  typeText: string;
}

export interface CreateAddress {
  id: string;
  name: string;
  typeText: string;
}

const { Option } = Select;

const SelectAddress = () => {
  const [addresses, setAddresses] = useState<AddressProps[]>([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string | undefined>('');
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>('');
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedWards, setSelectedWards] = useState<string | undefined>('');

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('https://open.oapi.vn/location/provinces');
        setProvinces(response.data.data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  const fetchDistricts = async (provinceId: string) => {
    try {
      const response = await axios.get(`https://open.oapi.vn/location/districts/${provinceId}`);
      console.log('districts', response.data.data);
      if (response.data.data) {
        setDistricts(response.data.data);
      } else {
        console.error('Invalid districts data:', response.data);
      }
    } catch (error) {
      console.error('Error fetching districts:', error);
    } finally {
      // setLoadingDistricts(false);
    }
  };

  const fetchWard = async (districtId: string) => {
    try {
      const response = await axios.get(`https://open.oapi.vn/location/wards/${districtId}`);
      if (response.data.data) {
        setWards(response.data.data);
      } else {
        console.error('Invalid wards data:', response.data);
      }
    } catch (error) {
      console.error('Error fetching wards:', error);
    } finally {
      // setLoadingDistricts(false);
    }
  };

  const handleProvinceChange = (value: string) => {
    const selected = provinces.find((province) => province.id === value);
    setSelectedProvince(selected?.name);
    console.log('Selected province:', selected?.id);
    fetchDistricts(value);
  };

  const handleDistrictChange = (value: string) => {
    const selected = districts.find((district) => district.id === value);
    setSelectedDistrict(selected?.name);
    fetchWard(value);
  };

  const handleWardChange = (value: string) => {
    const selected = wards.find((ward) => ward.id === value);
    setSelectedWards(selected?.name);
  };

  const handleAddNewAddress = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        const res = await createAddress({
          ...values,
          userId: fromStoredData(userId),
          province: selectedProvince,
          district: selectedDistrict,
          ward: selectedWards,
        });
        if (res) {
          fetchCategories();
          notification.success({
            message: 'Create Success',
            description: `Create Address Success`,
          });
          setIsModalVisible(false);
          form.resetFields();
        }
      })
      .catch((info) => {
        console.error('Validation Failed:', info);
        notification.error({
          message: info.message,
          // description: error.response.data.message,
        });
      });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const fetchCategories = async () => {
    try {
      const data = await getAllAddress(fromStoredData(userId));
      setAddresses(data); // Save data to state
      if (data.length > 0) {
        setSelectedAddress(data?.[0].addressId);
      }
      // setLoading(false); // Set loading to false
    } catch (err) {
      // setError(err); // Save the error
      // setLoading(false);
      console.log('object', err);
    }
  };

  useEffect(() => {
    fetchCategories(); // Call the async function
  }, []);

  const handleNext = () => {
    if (selectedAddress) {
      const params = {
        address: selectedAddress,
      };
      navigate({
        pathname: '/shipment-method',
        search: `?${createSearchParams(params)}`,
      });
    } else {
      Modal.warning({
        title: 'No Address Selected',
        content: 'Please select an address before proceeding.',
      });
    }
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
            key={address.addressId}
            className={`cursor-pointer shadow-lg ${
              selectedAddress === address.addressId
                ? 'border-2 border-[#52c41a]'
                : 'border border-gray-300'
            }`}
            onClick={() => setSelectedAddress(address.addressId || '')}
          >
            <Space
              direction="vertical"
              className="w-full flex flex-row items-center justify-between"
            >
              <div className="flex-col flex">
                <Title level={5} className="mb-0">
                  {address.detailedAddress}
                  <span className="bg-black text-white px-2 py-1 rounded text-xs ml-2">Home</span>
                </Title>
                <Text className="text-gray-600">
                  {address.detailedAddress}, {address.ward}, {address.district}, {address.province}
                </Text>
                <Text className="text-gray-600">
                  {address.email} | {address.phone}
                </Text>
              </div>
              <div>
                <DeleteOutlined className="hover:text-red-500 scale-125" />
              </div>
            </Space>
          </Card>
        ))}

        {/* Add New Address Button */}
        <div className="flex flex-row justify-center items-center">
          <Button
            type="link"
            onClick={handleAddNewAddress}
            className="text-md text-black hover:text-[#52c41a]"
          >
            <Image src={AddIC} preview={false} />
            Add New Address
          </Button>
        </div>
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

      <Modal
        title="Add New Address"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" className="grid grid-cols-2 gap-3">
          <Form.Item
            name="recipientName"
            label="Recipient Name"
            rules={[{ required: true, message: 'Please input your Recipient Name!' }]}
          >
            <Input placeholder="Enter your Recipient Name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            name="detailedAddress"
            label="detailedAddress"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input placeholder="Enter your address" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone number"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input placeholder="Enter your zip code" />
          </Form.Item>

          <Form.Item
            className="col-span-2"
            name="province"
            label="Province"
            rules={[{ required: true, message: 'Please input your province!' }]}
          >
            <Select
              placeholder="Choose a province"
              style={{ width: '100%' }}
              onChange={handleProvinceChange}
            >
              {provinces.map((province) => (
                <Option key={province.id} value={province.id}>
                  {province.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="district"
            label="District"
            rules={[{ required: true, message: 'Please input your district!' }]}
          >
            <Select
              placeholder={selectedProvince ? 'Choose a district' : 'Select a province first'}
              style={{ width: '100%' }}
              disabled={!selectedProvince}
              onChange={handleDistrictChange}
            >
              {districts.map((district) => (
                <Option key={district.id} value={district.id}>
                  {district.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="ward"
            label="Ward"
            rules={[{ required: true, message: 'Please input your ward!' }]}
          >
            <Select
              placeholder={selectedDistrict ? 'Choose a ward' : 'Select a district first'}
              style={{ width: '100%' }}
              disabled={!selectedDistrict}
              onChange={handleWardChange}
            >
              {wards.map((district) => (
                <Option key={district.id} value={district.id}>
                  {district.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SelectAddress;
