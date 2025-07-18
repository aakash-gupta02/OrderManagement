"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useOrder } from "@/app/redux/orderHook";
import { useAuth } from "@/app/redux/hooks";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const OrderDetailPage = ({ params }) => {
    const { id } = params;
    const {
        order,
        isLoading,
        error,
        fetchOrderById,
        deleteOrder,
        updateOrderQuantity,
    } = useOrder();

    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const [editing, setEditing] = useState(false);
    const [editQuantity, setEditQuantity] = useState(1);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Fetch order by ID on mount
    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
            toast.error("You must be logged in to access this page");
        } else {
            fetchOrderById(id);
        }
    }, [id, isAuthenticated, fetchOrderById, router]);

    useEffect(() => {
        if (order) setEditQuantity(order.quantity);
    }, [order]);

    const handleUpdate = async () => {
        if (order && editQuantity > 0) {
            await updateOrderQuantity({ id: order._id, quantity: editQuantity });
            setEditing(false);
            toast.success("Order updated!");
            fetchOrderById(id); // Refresh data
        }
    };

    const handleDelete = async () => {
        if (order) {
            await deleteOrder(order._id);
            toast.success("Order deleted!");
            router.push("/dashboard/order");
        }
    };

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    if (!isAuthenticated || isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-xl mx-auto mt-10 p-6 bg-red-100 text-red-700 rounded-lg">
                {error}
            </div>
        );
    }

    if (!order) {
        return (
            <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 text-gray-700 rounded-lg">
                Order not found.
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <div className="mb-4">
                <span className="font-semibold">Order ID:</span> {order._id}
            </div>
            <div className="mb-4">
                <span className="font-semibold">Product:</span> {order.productName}
            </div>
            <div className="mb-4">
                <span className="font-semibold">Customer:</span> {order.customerName}
            </div>
            <div className="mb-4">
                <span className="font-semibold">Email:</span> {order.email}
            </div>
            <div className="mb-4">
                <span className="font-semibold">Contact:</span> {order.contactNumber}
            </div>
            <div className="mb-4">
                <span className="font-semibold">Shipping Address:</span> {order.shippingAddress}
            </div>
            <div className="mb-4">
                <span className="font-semibold">Order Date:</span> {formatDate(order.createdAt)}
            </div>
            <div className="mb-4">
                <span className="font-semibold">Quantity:</span>{" "}
                {editing ? (
                    <input
                        type="number"
                        min="1"
                        max="100"
                        value={editQuantity}
                        onChange={(e) => setEditQuantity(Number(e.target.value))}
                        className="border px-2 py-1 rounded w-20"
                    />
                ) : (
                    order.quantity
                )}
            </div>
            {order.productImageUrl && (
                <div className="mb-4">
                    <img
                        src={order.productImageUrl}
                        alt={order.productName}
                        className="w-full h-40 object-contain rounded border"
                    />
                </div>
            )}
            <div className="flex space-x-3 mt-6">
                {editing ? (
                    <>
                        <button
                            onClick={handleUpdate}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setEditing(false)}
                            className="px-4 py-2 border border-gray-300 rounded"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setEditing(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Edit Quantity
                    </button>
                )}
                <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Delete Order
                </button>
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
                        <p className="mb-4">
                            Are you sure you want to delete this order? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
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

export default OrderDetailPage;
