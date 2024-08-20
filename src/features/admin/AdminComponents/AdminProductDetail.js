import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByIdAsync,
  selectProductById,
} from "../../product-list/productSlice";
import { useParams } from "react-router-dom";

import { addToCartAsync } from "../../cart/cartSlice";
import Rating from "../../../Assets/rating";


const AdminProductDetails = () => {
  const product = useSelector(selectProductById);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  const handleCart = (e) => {
    e.preventDefault();
    const newItem = { product: product.id, quantity: 1 };
    //user: user.id
    // delete[newItem]
    // TO PREVENT PRODUCT ID TO BE EQUAL TO CART ITEM ID WE ARE DELETING THE PRODUCT ID AS IF DIFFERENT USER ORDER SAME PRODUCT WILL THROW ERROR LATER WHEN THING ARE MANGED BY THE SERVER WE REMOVE THIS LOGICE
    dispatch(addToCartAsync(newItem));
  };
  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Product Name */}
        <div className="flex items-center">
          <h1 className="text-2xl ml-10 font-bold tracking-tight text-gray-900 sm:text-3xl">
            {product.name}
          </h1>
        </div>
        {/* Product Image */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden  rounded-lg lg:block">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full max-w-2xl object-cover object-center"
            />
          </div>
          {/* PRODUCT DESCRIPTION */}
          <div className="mx-3 max-w-4xl">
            <h3 className="text-3xl tracking-tight mt-10 text-gray-900">
              Description
            </h3>
            <div className="space-y-6">
              <p className="text-base text-gray-900 mt-5">
                {product.description}
              </p>
            </div>
            {/* PRODUCT HIGHLIGHTS */}
            <h2 className="text-3xl tracking-tight mt-10 text-gray-900">
              Highlights
            </h2>
            <div className="mt-4 space-y-6">
              <p className="text-sm text-gray-600">{product.highlights}</p>
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight mt-10 text-gray-900">
                Price: {product.price}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className=" mt-2 Rating text-3xl flex inline-flex justify-between  ">
                    <p>{product.rating}</p>
                    <Rating value={product.rating} />
                    <p className="mt-0  pl-3 text-xl text-gray-700">
                      from {product.numReviews} Reviews
                    </p>
                  </div>
                  <button
                    onClick={handleCart}
                    type="submit"
                    className="mt-20 w-4xl flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductDetails;
