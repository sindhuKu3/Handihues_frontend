import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByIdAsync,
  selectProductById,
} from "../productSlice";
import { useParams } from "react-router-dom";

import { addToCartAsync, selectedItems } from "../../cart/cartSlice";
import Rating from "../../../Assets/rating";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const ProductDetails = () => {
  const product = useSelector(selectProductById);
  const dispatch = useDispatch();

  const params = useParams();
  const items = useSelector(selectedItems);
  useEffect(() => {
    // console.log("user of Product details" +user);
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  const handleCart = (e) => {
    e.preventDefault();

    if (items.findIndex((item) => item.product.id === product.id) < 0) {
      const newItem = {
        product: product.id,

        quantity: 1,
      };

      // TO PREVENT PRODUCT ID TO BE EQUAL TO CART ITEM ID WE ARE DELETING THE PRODUCT ID AS IF DIFFERENT USER ORDER SAME PRODUCT WILL THROW ERROR
      dispatch(addToCartAsync(newItem));
    } else {
      alert("item already added");
    }
  };
  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Product Name */}

        <div className="flex items-center">
          <h1 className="text-2xl ml-10 mb-10 font-bold tracking-tight text-gray-900 sm:text-3xl">
            {product.name}
          </h1>
        </div>
        {/* Product Image */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-1 aspect-w-8 hidden   lg:block">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full max-w-2xl object-cover rounded-lg object-center"
            />
          </div>
          <div className="mx-3 max-w-4xl">
            <h3 className="text-3xl tracking-tight mt-10 text-gray-900">
              Description
            </h3>
            <div className="space-y-6">
              <p className="text-xl text-gray-700 mt-5">
                {product.description}
              </p>
            </div>

            <h2 className="text-3xl tracking-tight mt-10 text-gray-900">
              highlights
            </h2>
            <div className="mt-4 space-y-6">
              <p className="text-xl text-gray-600">{product.highlights}</p>
            </div>

            {/* Reviews */}
            <div className="mt-4">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className=" mt-2 Rating text-3xl flex inline-flex justify-between  ">
                  <p>{product.rating}</p>
                  <Rating value={product.rating} />
                  <p className="mt-0  pl-3 text-xl text-gray-700">
                    from {product.numReviews} Reviews
                  </p>
                </div>

                <div className="mt-6 lg:row-span-3 lg:mt-0">
                  <h2 className="sr-only">Product information</h2>
                  <div className="Price align-items flex flex-row ">
                    <h2 className="sr-only">Product Price</h2>
                    <p className="mt-8 text-3xl font-medium text-gray-900">
                      Rs &nbsp;
                      {Math.round(
                        product.price * (1 - product.discountPercentage / 100)
                      )}
                    </p>
                    <p className="mt-8 text-3xl pl-3 font-medium text-gray-500 line-through">
                      {product.price}Rs
                    </p>
                    <p className="mt-8 text-3xl pl-3 font-medium text-green-500 ">
                      {product.discountPercentage}% OFF
                    </p>
                  </div>

                  <div className="handleCartCase">
                    {product.countInStock <= 0 ? (
                      <p className="mt-10 pt-10 text-2xl pl-10 text-red-700">
                        OUT OF STOCK
                      </p>
                    ) : (
                      <div>
                        <button
                          onClick={handleCart}
                          type="submit"
                          className="mt-40 w-4xl flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                        >
                          Add to Cart
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
