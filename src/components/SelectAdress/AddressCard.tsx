import { Card, Typography, Space, Radio, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

const AddressCard = ({
  address = { title: '', type: '', address: '', phone: '' },
  isSelected = false,
  onSelect = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const { t } = useTranslation();

  return (
    <Card
      className={`mb-4 shadow-md cursor-pointer ${
        isSelected ? 'border-2 border-[#52c41a]' : 'border border-gray-300'
      }`}
      bordered={isSelected}
    >
      <Space direction="horizontal" size="large" className="w-full justify-between">
        {/* Address Details */}
        <div className="flex-1">
          <div className="mb-2">
            <Text strong>
              {address.title}{' '}
              <span className="px-2 py-1 bg-black text-white rounded text-xs">{address.type}</span>
            </Text>
          </div>
          <Text className="block text-gray-600">{address.address}</Text>
          <Text className="block text-gray-600">{address.phone}</Text>
        </div>

        {/* Radio Button */}
        <Radio
          checked={isSelected}
          onChange={onSelect}
          className="cursor-pointer"
          style={{ marginRight: '20px' }}
        />

        {/* Edit/Delete Icons */}
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={onEdit}
            className="hover:text-blue-500"
            aria-label={t('address.edit')}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            danger
            onClick={onDelete}
            aria-label={t('address.delete')}
          />
        </Space>
      </Space>
    </Card>
  );
};

export default AddressCard;
