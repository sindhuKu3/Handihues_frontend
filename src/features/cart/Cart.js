import { Fragment, useState } from "react";

import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectCartLoaded,
  selectedItems,
  updateCartAsync,
} from "./cartSlice";

const Cart = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const items = useSelector(selectedItems);
  const cartLoaded = useSelector(selectCartLoaded);
  //TO CALCULATE TOTAL AMOUNT
  const totalAmount = items.reduce(
    // (amount, item) => item.price * item.quantity + amount,
    (amount, item) => item.product.price * item.quantity + amount,
    0
  );

  //TO CALCULATE TOTAL PRICE
  const totalQuantity = items.reduce((total, item) => item.quantity + total, 0);

  //FUNCTION TO UPDATE QUANTITY OF ITEM FROM THE CART
  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  //FUNCTION TO REMOVE ITEM FROM THA CART
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <>
      {!items.length && cartLoaded && (
        <Navigate to="/" replace={true}></Navigate>
      )}

      <h1 className="text-4xl  ml-40  mt-10 font-bold tracking-tight text-gray-900">
        Cart
      </h1>
      <div className="mt-8 mx-40 pt-10 pb-10">
        <div className="flow-root mx-40">
          <ul role="list" className="-my-8 divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id} className="flex py-10">
                <div className="h-24 w-24 mb-5 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={item.product.id}>{item.product.name}</a>
                      </h3>
                      <p className="ml-4">{item.product.price}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between  text-sm">
                    <p className="text-gray-500 ml-10">
                      Qty
                      <select
                        onChange={(e) => {
                          handleQuantity(e, item);
                        }}
                        value={item.quantity}
                        className="ml-4 mb-10"
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                      </select>
                    </p>

                    <div className="flex">
                      <button
                        type="button"
                        onClick={(e) => handleRemove(e, item)}
                        className="font-medium text-indigo-600 hover:text-indigo-500 -ml-10"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>{" "}
                {item.product.countInStock <= 8 && (
                  <p className="text-red-700 text-lg mt-5 -ml-7 ">
                    Only {item.product.countInStock} Left
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6 mx-40">
        <div className="mx-40">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>SubTotal</p>
            <p>{totalAmount}Rs</p>
          </div>
          <div className="flex pt-3 justify-between text-base font-medium text-gray-900">
            <p>totalQuantity</p>
            <p>{totalQuantity}item</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
        </div>
        <div className="mt-6">
          <Link
            to={"/checkout"}
            className="flex items-center justify-center mx-40 rounded-md
              border border-transparent bg-purple-600 px-6 py-3 text-base
              font-medium text-white shadow-sm hover:bg-purple-700"
          >
            {" "}
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{" "}
            <Link to={"/"}>
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => setOpen(false)}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Cart;
