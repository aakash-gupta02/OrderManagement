// import { useSelector, useDispatch } from 'react-redux';
// import {
//     fetchOrders,
//     fetchOrderById,
//     deleteOrder,
//     updateOrderQuantity,
//     createOrder,
// } from './slices/orderSlices';

// export const useOrder = () => {
//     const dispatch = useDispatch();
//     const { orders, order, loading, error } = useSelector((state) => state.orders);

//     return {
//         orders,
//         order,
//         isLoading: loading,
//         error,

//         // Actions
//         fetchOrders: () => dispatch(fetchOrders()),
//         fetchOrderById: (id) => dispatch(fetchOrderById(id)),
//         deleteOrder: (id) => dispatch(deleteOrder(id)),
//         updateOrderQuantity: ({ id, quantity }) => dispatch(updateOrderQuantity({ id, quantity })),
//         createOrder: (orderData) => dispatch(createOrder(orderData)),
//     };
// };

import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  fetchOrders,
  fetchOrderById,
  deleteOrder,
  updateOrderQuantity,
  createOrder,
} from './slices/orderSlices';

export const useOrder = () => {
  const dispatch = useDispatch();
  const { orders, order, loading, error } = useSelector((state) => state.orders);

  return {
    orders,
    order,
    isLoading: loading,
    error,

    fetchOrders: useCallback(() => dispatch(fetchOrders()), [dispatch]),
    fetchOrderById: useCallback((id) => dispatch(fetchOrderById(id)), [dispatch]),
    deleteOrder: useCallback((id) => dispatch(deleteOrder(id)), [dispatch]),
    updateOrderQuantity: useCallback(
      ({ id, quantity }) => dispatch(updateOrderQuantity({ id, quantity })),
      [dispatch]
    ),
    createOrder: useCallback((orderData) => dispatch(createOrder(orderData)), [dispatch]),
  };
};
