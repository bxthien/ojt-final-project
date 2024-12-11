import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tag, Tooltip, Collapse } from 'antd';
import useCurrencyFormatter from '../../redux/useCurrencyFormatter';

const { Panel } = Collapse;

interface Product {
  id: string;
  name: string;
  price: number;
  url: string;
  info: {
    description: string;
    color: string[];
    size: string[];
    policy: string;
  };
  quantity: number;
}

interface Transaction {
  transactionId: string;
  isDelete: boolean;
  quantity: number;
  price: number;
  createdAt: string;
  updateAt: string;
  product: Product;
}

interface Order {
  price: number;
  orderId: string;
  methodShipping: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  transactions: Transaction[];
}

interface MyOrdersProps {
  orders: Order[];
}

const MyOrders: React.FC<MyOrdersProps> = ({ orders }) => {
  const { t } = useTranslation();
  const [activeKey, setActiveKey] = useState<string | string[]>('');

  const { formatCurrency } = useCurrencyFormatter();

  const formatDate = (dateString: string) => {
    if (!dateString) return t('myOrders.invalidDate');
    const timestamp = Date.parse(dateString);
    if (isNaN(timestamp)) return t('myOrders.invalidDate');

    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'done':
        return <Tag color="green">{t('myOrders.statusDone')}</Tag>;
      case 'finish_order':
        return <Tag color="blue">{t('myOrders.statusFinish')}</Tag>;
      default:
        return <Tag color="orange">{t('myOrders.statusPending')}</Tag>;
    }
  };

  const handleCollapseChange = (key: string | string[]) => {
    setActiveKey(key);
  };

  if (orders.length === 0) {
    return (
      <div className="text-center text-gray-600">
        <h3 className="text-lg font-semibold">{t('myOrders.emptyOrderHistory')}</h3>
        <p className="text-sm">{t('myOrders.noOrdersMessage')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <Collapse activeKey={activeKey} onChange={handleCollapseChange} className="custom-collapse">
        {orders.map((order) => (
          <Panel
            key={order.orderId}
            extra={<span className="collapse-arrow"></span>}
            header={
              <div className="flex flex-wrap justify-between items-center">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                    {t('myOrders.orderId', { orderId: order.orderId })}
                  </span>
                  <Tag color="orange" className="text-xs uppercase">
                    {order.methodShipping}
                  </Tag>
                  {getStatusTag(order.status)}
                  <Tooltip title={formatDate(order.createdAt)}>
                    <Tag color="cyan" className="text-xs">
                      {formatDate(order.createdAt)}
                    </Tag>
                  </Tooltip>
                </div>

                <div className="text-right mt-2 sm:mt-0">
                  <p className="text-lg font-semibold text-gray-800">
                    {t('myOrders.totalPrice', {
                      total: formatCurrency(order.price),
                    })}
                  </p>
                </div>
              </div>
            }
          >
            <div className="space-y-4">
              {order.transactions.map((transaction) => (
                <div key={transaction.transactionId} className="flex gap-4 items-center flex-wrap">
                  <img
                    src={transaction.product.url}
                    alt={transaction.product.name}
                    className="w-24 h-24 object-cover rounded-md sm:w-32 sm:h-32"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{transaction.product.name}</p>
                    <p className="text-sm text-gray-600">
                      {t('myOrders.description', {
                        description: transaction.product.info.description,
                      })}
                    </p>
                    <p className="text-sm">
                      {t('myOrders.quantityPrice', {
                        quantity: transaction.quantity,
                        price: formatCurrency(transaction.product.price),
                      })}
                    </p>
                    <p className="text-sm">
                      {t('myOrders.total', {
                        total: formatCurrency(transaction.product.price * transaction.quantity),
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default MyOrders;
