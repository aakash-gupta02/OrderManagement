"use client";
import { useState, useEffect } from "react";
import { useOrder } from "@/app/redux/orderHook";
import { useAuth } from "@/app/redux/hooks";
import { useRouter } from "next/navigation";
import { useSocket } from "../redux/useSocket";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const {
    orders,
    isLoading,
    error,
    fetchOrders,
    deleteOrder,
    updateOrderQuantity,
  } = useOrder();

  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [editingOrder, setEditingOrder] = useState(null);
  const [editQuantity, setEditQuantity] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  // Filtering states
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useSocket();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      toast.error("You must be logged in to access the dashboard");
    } else {
      fetchOrders();
    }
  }, [isAuthenticated, fetchOrders]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setEditQuantity(order.quantity);
  };

  const handleUpdate = async () => {
    if (editingOrder) {
      await updateOrderQuantity({
        id: editingOrder._id,
        quantity: editQuantity,
      });
      setEditingOrder(null);
    }
  };

  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (orderToDelete) {
      await deleteOrder(orderToDelete._id);
      setIsDeleteModalOpen(false);
      setOrderToDelete(null);
    }
  };

  // Filtering logic
  const filteredOrders = orders.filter((order) => {
    const searchMatch =
      order.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id?.toLowerCase().includes(searchTerm.toLowerCase());

    let dateMatch = true;
    if (startDate) {
      dateMatch =
        dateMatch &&
        new Date(order.createdAt) >= new Date(startDate + "T00:00:00");
    }
    if (endDate) {
      dateMatch =
        dateMatch &&
        new Date(order.createdAt) <= new Date(endDate + "T23:59:59");
    }

    return searchMatch && dateMatch;
  });

  if (!isAuthenticated || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Total Orders: {orders.length}
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            placeholder="Search by product, customer, email, or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        {(searchTerm || startDate || endDate) && (
          <button
            onClick={() => {
              setSearchTerm("");
              setStartDate("");
              setEndDate("");
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm mt-6 md:mt-0"
          >
            Clear Filters
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No orders found</div>
          <div className="text-gray-400 text-sm mt-2">
            {orders.length === 0
              ? "Create your first order to get started"
              : "No orders match your filters"}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                {/* Order Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {order.productName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      #{order._id.slice(-6)}
                    </p>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">
                    Customer Details
                  </h4>
                  <p className="text-sm text-gray-900">{order.customerName}</p>
                  <p className="text-sm text-gray-600">{order.email}</p>
                  <p className="text-sm text-gray-600">{order.contactNumber}</p>
                </div>

                {/* Shipping Info */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">
                    Shipping Address
                  </h4>
                  <p className="text-sm text-gray-600">
                    {order.shippingAddress}
                  </p>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Quantity
                    </p>
                    <p className="text-sm text-gray-900">{order.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Order Date
                    </p>
                    <p className="text-sm text-gray-900">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Product Image */}
                {order.productImageUrl && (
                  <div className="mb-4">
                    <img
                      src={order.productImageUrl}
                      alt={order.productName}
                      className="w-full h-32 object-contain rounded border"
                    />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => handleEdit(order)}
                    className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(order)}
                    className="px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Edit Order Quantity</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity (1-100)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={editQuantity}
                onChange={(e) => setEditQuantity(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setEditingOrder(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
            <p className="mb-4">
              Are you sure you want to delete this order? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
              >
                Delete Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
