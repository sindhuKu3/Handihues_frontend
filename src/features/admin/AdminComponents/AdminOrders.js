import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PencilIcon } from "@heroicons/react/24/outline";
import {
  fetchAllOrdersAsync,
  selectTotalOrders,
  selectedOrder,
  updateOrderAsync,
} from "../../order/orderSlice";
import { Pagination } from "../../../Assets/Pagination";

function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectedOrder);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleOrderStatus = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: 10 };
    dispatch(fetchAllOrdersAsync(pagination));
  }, [dispatch, page]);

  return (
    <div className="overflow-x-auto px-4">
      <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="w-full table-auto">
              {/* //TABLE HEADERS */}
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-0 text-left">ItemsId</th>
                  <th className="py-3 px-0 text-left">Items</th>
                  <th className="py-3 px-0 text-center">Product Price</th>
                  <th className="py-3 px-0 text-left">Shipping Address</th>
                  <th className="py-3 px-0 text-center">Order Status</th>
                  <th className="py-3 px-0 text-center">Payment Method</th>
                  <th className="py-3 px-0 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    {/* ORDER ID */}
                    <td className="py-3 px-0 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-0 text-left">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.product.image}
                              alt={item.product.name}
                            />
                          </div>

                          {/* PRODUCT NAME */}
                          <span className="text-ellipsis overflow-hidden truncate w-10 ">
                            {item.product.name}
                          </span>
                          {/* DISCOUNTED PRICE */}
                          <div className="text-green-400">
                            {Math.round(
                              item.product.price *
                                (1 - item.product.discountPercentage / 100)
                            )}
                            Rs
                          </div>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-0 text-center">
                      <div className="flex items-center justify-center">
                        {order.totalAmount}Rs
                      </div>
                    </td>
                    {/* SHIPPING ADDRESS */}
                    <td className="py-3 px-0 text-center">
                      <div className="">
                        <div>
                          <strong>{order.selectedAddresses.name}</strong>,
                        </div>
                        <div>{order.selectedAddresses.street},</div>
                        <div>{order.selectedAddresses.city}, </div>
                        <div>{order.selectedAddresses.state}, </div>
                        <div>{order.selectedAddresses.pinCode}, </div>
                        <div>{order.selectedAddresses.phone}, </div>
                      </div>
                    </td>
                    {/* ORDER STATUS WHICH IS EDITABLE ONLY BY THE ADMIN */}
                    <td className="py-3 px-0 text-center">
                      {order.id === editableOrderId ? (
                        <select onChange={(e) => handleOrderStatus(e, order)}>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>
                    {/* SELECTED PAYMENT METHOD BY THE CUSTOMER */}
                    <td className="py-3 px-0 text-center">
                      <div className="flex items-center justify-center">
                        {order.paymentMethod}
                      </div>
                    </td>

                    {/* ORDER STATUS IS EDITABLE */}
                    <td className="py-3 px-0 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-6 mr-3 transform hover:text-purple-500 hover:scale-120">
                          <PencilIcon
                            className="w-8 h-8 pr-1"
                            onClick={(e) => handleEdit(order)}
                          ></PencilIcon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}
      ></Pagination>
    </div>
  );
}

export default AdminOrders;
