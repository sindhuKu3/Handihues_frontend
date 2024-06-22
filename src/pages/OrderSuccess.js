import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetOrder, selectCurrentOrder } from "../features/order/orderSlice";
import { useEffect } from "react";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { resetCartAsync } from "../features/cart/cartSlice";
import { selectUserInfo } from "../features/user/userSlice";

const OrderSuccess = () => {
    const dispatch = useDispatch() ; 
    const currentOrder = useSelector(selectCurrentOrder);
    const user = useSelector(selectLoggedInUser)
    const params = useParams() ; 
    useEffect(()=>{
        dispatch(resetCartAsync())
        dispatch(resetOrder());
    },[dispatch])
  return (
    <div className="NotFound">
      {!params.id && (
     
        <Navigate
          to={'/'}
          replace={true}
        ></Navigate>
      )}
      <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div class="text-center">
          <p class="text-4xl font-bold  text-indigo-600">
            Order successfully placed
          </p>
          <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Order No ###{params?.id}
          </h1>
          <p class="mt-6 text-base leading-7 text-gray-600">
            You Can check your order in My Account
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={"/my-orders"}
              class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              your orders
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderSuccess;
