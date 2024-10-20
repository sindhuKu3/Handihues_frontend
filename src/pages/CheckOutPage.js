import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { deleteItemFromCartAsync, selectedItems, updateCartAsync } from "../features/cart/cartSlice";
// import { selectLoggedInUser, updateUserAsync } from "../features/auth/authSlice";
import { createOrderAsync, selectCurrentOrder } from "../features/order/orderSlice";
import { selectUserInfo, updateUserAsync, } from "../features/user/userSlice";

function Checkout() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
 

     const dispatch = useDispatch();
     const items = useSelector(selectedItems);
     const user = useSelector(selectUserInfo);
     const currentOrder = useSelector(selectCurrentOrder);
     //STATE FOR PASSING THE ADDRESS AND PAYMENT METHOD OPTION TO ORDER OBJECT
     const [selectedAddresses ,setSelectedAddresses] = useState(null) ; 
     const [paymentMethod , setPaymentMethod] = useState(null);
     //TO CALCULATE TOTAL AMOUNT
     const totalAmount = items.reduce(
       (amount, item) => item.product.price * item.quantity + amount,
       0
     );
     //TO CALCULATE TOTAL PRICE
     const totalQuantity = items.reduce(
       (total, item) => item.quantity + total,
       0
     );

    
     //FUNCTION TO UPDATE QUANTITY OF ITEM FROM THE CART
     const handleQuantity = (e, item) => {
       dispatch(updateCartAsync({id:item.id, quantity: +e.target.value }));
     };
     //FUNCTION TO REMOVE ITEM FROM THA CART
     const handleRemove = (e, id) => {
       dispatch(deleteItemFromCartAsync(id));
     };

     //FUNCTION CALLED FOR HANDLING THE ADDRESSES
     const handleAddress=(e)=>{
      // console.log(e.target.value) ; 
      setSelectedAddresses(user.addresses[e.target.value])
     }

     const handlePaymentMethod = (e) => {
       setPaymentMethod(e.target.value); // Update the state when user selects a payment method
     };

     //FUNCTION CALLED ON CLICKING ORDER NOW BUTTON
     const handleOrder=(e)=>{
      if(selectedAddresses && paymentMethod){
         const order = {
           items,
           totalAmount,
           totalQuantity,
           user:user.id,
           paymentMethod,
           selectedAddresses,
           status: "pending",
         };
         dispatch(createOrderAsync(order));
      }else{alert("Enter Address And Payment Method")}
     
     }

     
  return (
    <>
      {/*NAVIGATE TO HOMEPAGE AS SOON AS AS CART BECOME EMPTY  */}
      {items.length === 0 && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder && (
        <Navigate
          to={`/orderSuccess/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-40  gap-y-10 lg:grid-cols-4 ">
          <div className="lg:col-span-2">
            {/* //2// */}
            {/* This form is for address */}
            <form
              className="bg-white px-5 py-12 mt-12"
              noValidate
              onSubmit={handleSubmit((data) => {
                // console.log(data);
                dispatch(
                  updateUserAsync({
                    ...user,
                    addresses: [...user.addresses, data],
                  })
                );
                reset();
              })}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* NAME INPUT FIELD */}
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        fullName
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("fullName", {
                            required: "name is required",
                          })}
                          id="fullName"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.fullName && (
                          <p className="text-red-500">
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* EMAIL INPUT FIELD */}
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required",
                          })}
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    {/* PHONE NUMBER INPUT FIELD */}
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "phone is required",
                          })}
                          type="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.phone && (
                          <p className="text-red-500">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>
                    {/* ADDRESS INPUT BY THE USER */}
                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "street is required",
                          })}
                          id="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.street && (
                          <p className="text-red-500">
                            {errors.street.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "city is required",
                          })}
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.city && (
                          <p className="text-red-500">{errors.city.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "state is required",
                          })}
                          id="state"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.state && (
                          <p className="text-red-500">{errors.state.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pinCode", {
                            required: "pinCode is required",
                          })}
                          id="pinCode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.pinCode && (
                          <p className="text-red-500">
                            {errors.pinCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </form>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Addresses
              </h2>
              <p className="mt-1 text-sm leading-6 pb-5 text-gray-600">
                Choose from Existing addresses
              </p>
              <ul>
                {user.addresses.map((address, index) => (
                  <li
                    key={index}
                    className="flex justify-between gap-x-2 px-5 py-5 border-solid border-2 border-gray-200"
                  >
                    <div className="flex gap-x-4 ">
                      <input
                        onChange={handleAddress}
                        name="address"
                        type="radio"
                        value={index}
                        className="h-4 w-4 mt-2 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="min-w-0 flex-auto ">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {address.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.street}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.pinCode}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-1000">
                        Phone: <span>{address.phone}</span>
                      </p>
                      <p className="text-sm leading-6 text-gray-500">
                        {address.city}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

         
              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Payment Methods
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose One
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        checked={paymentMethod === "cash"}
                        onChange={handlePaymentMethod} // Handle change event
                        id="cash"
                        name="payments"
                        value="cash"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="cash"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cash
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="card"
                        checked={paymentMethod === "card"}
                        onChange={handlePaymentMethod} // Handle change event
                        name="payments"
                        value="card"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="card"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Card Payment
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>


            </div>
          </div>
          <div className="lg:col-span-2 ">
            <div className="mx-auto mt-12   max-w-7xl px-2 sm:px-2 lg:px-4">
              <div className="  px-0 py-6 sm:px-0 bg-purple-700">
                {/* CART SECTION */}
                <h1 className="text-4xl  ml-9  mt-10 font-bold tracking-tight text-white">
                  Cart
                </h1>
                <div className="mt-12 my-20 ">
                  <div className="flow-root  mx-10 ">
                    <ul role="list" className="-my-8 divide-y divide-gray-200">
                      {items.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              // src={product.imageSrc}
                              src={item.product.image}
                              // alt={product.imageAlt}
                              alt={item.product.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-2 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-white">
                                <h3>
                                  <a href={item.product.id}>
                                    {item.product.name}
                                  </a>
                                </h3>
                                <p className="ml-4 text bold">
                                  {item.product.price} Rs
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.product.color}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between mt-10 text-sm">
                              <p className="text-white ml-10">
                                Qty
                                <select
                                  onChange={(e) => {
                                    handleQuantity(e, item);
                                  }}
                                  value={item.quantity}
                                  className="ml-4 text-gray-900 mb-10"
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
                                  onClick={(e) => handleRemove(e, item.id)}
                                  className="font-bold text-white hover:text-gray-300"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6 mx-50">
                  <div className="flex justify-between  text-base font-medium text-gray-900">
                    <p>SubTotal</p>
                    <p>{totalAmount}Rs</p>
                  </div>
                  <div className="flex pt-3 justify-between text-base font-medium text-gray-900">
                    <p>totalQuantity</p>
                    <p>{totalQuantity}item</p>
                  </div>
                  <p className="mt-0.5 text-sm text-white-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                </div>

                <div className="mt-6">
                  <div
                    onClick={handleOrder}
                    className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-gray-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900 mx-7"
                  >
                    Order Now
                  </div>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-white-500">
                  <p>
                    or
                    <Link to="/">
                      <button
                        type="button"
                        className="font-medium  text-white-600 hover:text-white-200"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
