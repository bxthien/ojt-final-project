import React, { useState } from 'react';

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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const closeModal = () => {
    setSelectedOrder(null);
  };

  if (orders.length === 0) {
    return (
      <div className="text-center text-gray-600">
        <h3 className="text-lg font-semibold">Your Order History is Empty</h3>
        <p className="text-sm">You don't have any orders yet. Please come back later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order.cartId}
          className="border p-4 rounded-md shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="mb-4">
            <p className="text-lg font-semibold">Order #{order.cartId}</p>
            <p className="text-sm text-gray-600">Address: {order.address}</p>
            <p className="text-sm text-gray-600">Date: {order.createdAt}</p>
            <p className="text-sm text-gray-600">Shipping Method: {order.methodShipping}</p>
            <p className="text-sm text-gray-600">Status: {order.status}</p>
            {order.couponCode && (
              <p className="text-sm text-gray-600">Coupon: {order.couponCode}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {order.transactions.map((transaction) => (
              <div
                key={transaction.transactionId}
                className="flex items-center gap-4 border p-4 rounded-md"
              >
                <div className="flex-shrink-0">
                  <img
                    src={transaction.product.url}
                    alt={transaction.product.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </div>

                <div className="flex-1">
                  <p className="font-semibold">{transaction.product.name}</p>
                  <div className="text-sm text-gray-500 mt-1">
                    <p>Quantity: {transaction.quantity}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-green-600 font-semibold">
                        {(transaction.product.price * (1 - order.discount / 100)).toLocaleString()}{' '}
                        VND
                      </p>
                    </div>
                    <p>
                      Total: {(transaction.product.price * transaction.quantity).toLocaleString()}{' '}
                      VND
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-right">
            <p className="text-lg font-semibold text-gray-800">
              Total: {order.price.toLocaleString()} VND
            </p>
          </div>
        </div>
      ))}

      {/* Modal for showing selected order details */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/3 overflow-y-auto max-h-[80vh]">
            <h3 className="text-2xl font-semibold mb-4">Order Details #{selectedOrder.cartId}</h3>
            <div className="mb-4">
              <p className="font-semibold text-lg mb-2">Order Information:</p>
              <p className="text-sm">Address: {selectedOrder.address}</p>
              <p className="text-sm">Date: {selectedOrder.createdAt}</p>
              <p className="text-sm">Total Price: {selectedOrder.price.toLocaleString()} VND</p>
              <p className="text-sm">Status: {selectedOrder.status}</p>
              <p className="text-sm">Shipping Method: {selectedOrder.methodShipping}</p>
              {selectedOrder.couponCode && (
                <p className="text-sm">Coupon: {selectedOrder.couponCode}</p>
              )}
            </div>

            <div className="mb-4">
              <p className="font-semibold text-lg mb-2">Products in this order:</p>
              {selectedOrder.transactions.map((transaction) => (
                <div key={transaction.transactionId} className="flex gap-4 mb-4 border-b pb-4">
                  <div className="flex-shrink-0">
                    <img
                      src={transaction.product.url}
                      alt={transaction.product.name}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{transaction.product.name}</p>
                    <p className="text-sm">
                      Price: {transaction.product.price.toLocaleString()} VND
                    </p>
                    <p className="text-sm">Quantity: {transaction.quantity}</p>
                    <p className="text-sm">
                      Total: {(transaction.quantity * transaction.product.price).toLocaleString()}{' '}
                      VND
                    </p>
                    <p className="text-sm">{transaction.product.info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
