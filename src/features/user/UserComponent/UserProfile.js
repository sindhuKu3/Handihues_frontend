import { useDispatch, useSelector } from "react-redux";
// import { selectLoggedInUser, updateUserAsync } from "../../auth/authSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { selectUserInfo, updateUserAsync } from "../userSlice";

const UserProfile = () => {

   //state to target particular address with given index to determine which address to be changed

    const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
    } = useForm();
  const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);

    //FUNCTION TO REMOVE THE SELECTED ADDRESSES

     const handleRemove = (e,index) => {
   const newUser = {...user,addresses:[...user.addresses]}
   newUser.addresses.splice(index,1) ; 
   dispatch(updateUserAsync(newUser))
     };
   const [selectEditIndex, setSelectEditIndex] = useState(-1);
   const [showAddAddressForm,setShowAddAddressForm] =useState(false)
     //FUNCTION TO EDIT THE EXISTING ADDRESS INFOR
     const handleEdit=(addressUpdate,index)=>{
      //TO PREVENT SHALLOW COPY
       const newUser ={...user,addresses:[...user.addresses]}
       newUser.addresses.splice(index , 1,addressUpdate);
       dispatch(updateUserAsync(newUser));
       setSelectEditIndex(-1);
    
     }

     //
     const handleAdd=(address)=>{
      const newUser = {...user,addresses:[...user.addresses,address]}
      dispatch(updateUserAsync(newUser))
      setShowAddAddressForm(false)
     }

     //FORM IS OPEN FOR ADDITION ,IT WILL SET THE INTITAL VALUE IN THE FORM 
     const handleEditForm=(index)=>{
      setSelectEditIndex(index) ; 
      const address = user.addresses[index]
      setValue('name',address.name)
      setValue("street", address.street);
      setValue("state", address.state);
      setValue("city", address.city);
      setValue("email",address.email)
      setValue("pinCode", address.pinCode);
      setValue("phone", address.phone);
     }
    return (
      <>
        <div key={user.id}>
          <div className="bg-purple-800 -mt-12">
            <div className="mx-auto mt-12 bg-white max-w-4xl px-4 sm:px-6 lg:px-8">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <h1 className="text-4xl my-5 font-bold  tracking-tight text-gray-900">
                  Name :  {user.fullName ? user.fullName : "New User"}
                </h1>
                <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                  Email Address: {user.email}
                </h3>
                {user.role === "admin" && (
                  <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                    role: {user.role}
                  </h3>
                )}
                {/* //BUTTON TO ADD NEW ADDRESS */}

                <button
                  type="submit"
                  onClick={(e) => {
                    setShowAddAddressForm(true);
                    setSelectEditIndex(-1);
                  }}
                  className="rounded-md my-5 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {" "}
                  Add New Address
                </button>
                {/* ADDRESS EDIT FORM  */}
                {showAddAddressForm ? (
                  <form
                    className="bg-white px-5 py-12 mt-12"
                    noValidate
                    onSubmit={handleSubmit((data) => {
                      // console.log(data);
                      handleAdd(data);
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
                              htmlFor="fullName"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                             fullName
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                {...register("fullName", {
                                  required: "fullName is required",
                                })}
                                id="fullName"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors.name && (
                                <p className="text-red-500">
                                  {errors.name.message}
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
                                <p className="text-red-500">
                                  {errors.email.message}
                                </p>
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
                                <p className="text-red-500">
                                  {errors.phone.message}
                                </p>
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
                                <p className="text-red-500">
                                  {errors.city.message}
                                </p>
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
                                <p className="text-red-500">
                                  {errors.state.message}
                                </p>
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
                           onClick={(e)=>setSelectEditIndex(-1)}
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Edit Address
                        </button>
                      </div>
                    </div>
                  </form>
                ) : null}
                <p className="mt-0.5 py-3 text-sm text-gray-500">
                  Shipping Address :
                </p>

                {user.addresses.map((address, index) => (
                  <div key={index}>
                    {selectEditIndex === index ? (
                      <form
                        className="bg-white px-5 py-12 mt-12"
                        noValidate
                        onSubmit={handleSubmit((data) => {
                          // console.log(data);
                          handleEdit(data, index);
                          reset();
                        })}
                      >
                        <div className="space-y-12">
                          <div className="border-b border-gray-900/10 pb-12 ">
                            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                              Personal Information
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                              Use a permanent address where you can receive
                              mail.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              {/* NAME INPUT FIELD */}
                              <div className="sm:col-span-4">
                                <label
                                  htmlFor="fullName"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Full Name
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    {...register("fullName", {
                                      required: "fullName is required",
                                    })}
                                    id="fullName"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                  {errors.name && (
                                    <p className="text-red-500">
                                      {errors.name.message}
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
                                    <p className="text-red-500">
                                      {errors.email.message}
                                    </p>
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
                                    <p className="text-red-500">
                                      {errors.phone.message}
                                    </p>
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
                                    <p className="text-red-500">
                                      {errors.city.message}
                                    </p>
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
                                    <p className="text-red-500">
                                      {errors.state.message}
                                    </p>
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
                              onClick={(e) => setSelectEditIndex(-1)}
                              className="text-sm font-semibold leading-6 text-gray-900"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Edit Address
                            </button>
                          </div>
                        </div>
                      </form>
                    ) : null}
                    <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200 mb-10">
                      <div className="flex gap-x-4">
                        <div className="">
                          <div className="min-w-0 flex-auto">
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
                        <div className="hidden sm:flex sm:flex-col ml-40 sm:items-end">
                          <p className="text-sm leading-6 text-gray-1000">
                            Phone: <span>{address.phone}</span>
                          </p>
                          <p className="text-sm leading-6 text-gray-500">
                            {address.city}
                          </p>
                        </div>
                        <div className="flex hidden sm:flex sm:flex-col mb-20 ml-40 sm:items-end">
                          <button
                            type="button"
                            onClick={(e) => handleEditForm(index)}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleRemove(e, index)}
                            className="font-medium text-indigo-600  hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
 
export default UserProfile;