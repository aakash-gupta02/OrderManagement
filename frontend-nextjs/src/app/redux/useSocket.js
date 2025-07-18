import { useEffect } from "react";
import { io } from "socket.io-client";
import { useOrder } from "./orderHook";
import { toast } from "react-toastify";

const socket = io("https://order-management-dxob.onrender.com"); // backend URL

export const useSocket = () => {
  const { fetchOrders, updateOrderQuantity, deleteOrder, fetchOrderById } =
    useOrder();

  useEffect(() => {
    socket.on("orderCreated", () => {
      fetchOrders();
      toast.success("New order Received!");
    });

    socket.on("orderDeleted", () => {
      fetchOrders();
      toast.success("Order deleted successfully!");
    });

    socket.on("orderUpdated", () => {
      fetchOrders();
      toast.success("Order updated successfully!");
    });

    return () => {
      socket.off("orderCreated");
      socket.off("orderDeleted");
      socket.off("orderUpdated");
    };
  }, []);
};
