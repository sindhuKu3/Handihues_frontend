import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  
  fetchLoggedInUserOrdersAsync,
  selectUserInfoStatus,
  selectUserOrders,
} from "../userSlice";
import { Grid } from "react-loader-spinner";

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const status = useSelector(selectUserInfoStatus);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch]);

  return (
    <div className="bg-purple-300">
      <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900  pt-4 pl-4">
        YOUR ORDERS
      </h1>
      {orders &&
        orders.map((order) => (
          <div key={order.id}>
            <div>
              <div className="mx-20 mt-12 bg-gray-100 max-w-7xl px-4 sm:px-6 lg:px-8 ">
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <h1 className="lg:text-4xl  sm:text-sm my-5 font-bold tracking-tight  text-gray-900">
                    Order # {order.id}
                  </h1>
                  <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                    Order Status : {order.status}
                  </h3>
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3 className="text-2xl">
                                  <a href={item.product.id}>
                                    {item.product.name}
                                  </a>
                                </h3>
                                <p className="ml-4">{item.product.price} Rs </p>
                              </div>

                           
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Qty :{item.quantity}
                                </label>
                              </div>

                              <div className="flex"></div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p> {order.totalAmount} Rs</p>
                  </div>
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p>Total Items in Cart</p>
                    <p>{order.totalQuantity} items</p>
                  </div>
                  <div className="flex  my-2 text-base font-medium text-gray-900">
                    <p className="text-gray-900 font-bold">
                      Selected Payment Method :
                    </p>
                    <p> {order.paymentMethod}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500 mb-7">
                    Shipping Address :
                  </p>
                  <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                    <div className="flex gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          <span className="text-gray-900 font-bold">
                            Ordered By:
                          </span>
                          {order.selectedAddresses.fullName}
                        </p>
                        <div className="street">
                          <span className="text-gray-900 font-bold">
                            {" "}
                            Street:{" "}
                          </span>{" "}
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {order.selectedAddresses.street}
                          </p>
                        </div>

                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {order.selectedAddresses.pinCode}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        <span className="text-gray-900 font-bold">
                          {" "}
                          Phone:{" "}
                        </span>{" "}
                        {order.selectedAddresses.phone}
                      </p>
                      <p className="text-sm leading-6 text-gray-500">
                        <span className="text-gray-900 font-bold mb-20">City </span>

                        {order.selectedAddresses.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      {status === "loading" ? (
        <Grid
          height="80"
          width="80"
          color="rgb(79, 70, 229) "
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : null}
    </div>
  );
}
