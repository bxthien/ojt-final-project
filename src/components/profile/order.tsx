import React from 'react';
import { useTranslation } from 'react-i18next';

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
  cartId: string;
  couponCode: string | null;
  discount: number;
  isDelete: boolean;
  price: number;
  status: string;
  address: string;
  createdAt: string;
  methodShipping: string;
  transactions: Transaction[];
}

interface MyOrdersProps {
  orders: Order[];
}

const MyOrders: React.FC<MyOrdersProps> = ({ orders }) => {
  const { t } = useTranslation();

  if (orders.length === 0) {
    return (
      <div className="text-center text-gray-600">
        <h3 className="text-lg font-semibold">{t('myOrders.emptyOrderHistory')}</h3>
        <p className="text-sm">{t('myOrders.noOrdersMessage')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {orders.map((order) => (
        <div key={order.cartId} className="border p-4 rounded-md shadow-md">
          <div className="mb-2">
            <p className="text-lg font-semibold">
              {t('myOrders.orderId', { orderId: order.cartId })}
            </p>
            <p className="text-sm text-gray-600">
              {t('myOrders.shippingMethod', { method: order.methodShipping })}
            </p>
            <p className="text-sm text-gray-600">
              {t('myOrders.status', { status: order.status })}
            </p>
          </div>

          <div className="space-y-4">
            {order.transactions.map((transaction) => (
              <div key={transaction.transactionId} className="flex gap-4 items-center">
                <img
                  src={transaction.product.url}
                  alt={transaction.product.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <p className="font-semibold">{transaction.product.name}</p>
                  <p className="text-sm text-gray-600">
                    {t('myOrders.category', { category: transaction.product.info.description })}
                  </p>
                  <p className="text-sm">
                    {t('myOrders.quantityPrice', {
                      quantity: transaction.quantity,
                      price: (
                        transaction.product.price *
                        (1 - order.discount / 100)
                      ).toLocaleString(),
                    })}
                  </p>
                  <p className="text-sm">
                    {t('myOrders.total', {
                      total: (transaction.product.price * transaction.quantity).toLocaleString(),
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-right">
            <p className="text-lg font-semibold text-gray-800">
              {t('myOrders.totalPrice', { price: order.price.toLocaleString() })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
