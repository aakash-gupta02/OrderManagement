// components/admin/OrderTable.jsx
'use client'
import { useState } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';

const OrderTable = ({ orders, onDelete, onUpdateQuantity }) => {
  const [editingId, setEditingId] = useState(null);
  const [editQuantity, setEditQuantity] = useState(0);

  const handleEditClick = (order) => {
    setEditingId(order._id);
    setEditQuantity(order.quantity);
  };

  const handleQuantityUpdate = async (id) => {
    await onUpdateQuantity({ id, quantity: editQuantity });
    setEditingId(null);
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No orders found</td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                  <div className="text-sm text-gray-500">{order.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{order.productName}</div>
                  <div className="text-sm text-gray-500">{order.shippingAddress}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.productImageUrl && (
                    <Image
                      src={order.productImageUrl}
                      alt={order.productName}
                      width={50}
                      height={50}
                      className="rounded"
                        unoptimized={true}

                    />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === order._id ? (
                    <div className="flex items-center">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={editQuantity}
                        onChange={(e) => setEditQuantity(Number(e.target.value))}
                        className="w-20 mr-2 rounded-md border-gray-300 shadow-sm"
                      />
                      <button
                        onClick={() => handleQuantityUpdate(order._id)}
                        className="text-sm bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <span 
                      className="text-sm text-gray-900 cursor-pointer hover:text-blue-500"
                      onClick={() => handleEditClick(order)}
                    >
                      {order.quantity}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(order.createdAt), 'MMM dd, yyyy HH:mm')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onDelete(order._id)}
                    className="text-red-600 hover:text-red-900 mr-4"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;