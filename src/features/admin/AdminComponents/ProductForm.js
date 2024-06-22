import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearSelectedProduct, createProductAsync, fetchProductByIdAsync, selectProductById, updateProductAsync } from "../../product-list/productSlice";
import { useEffect, useState } from "react";
import Success from "../../../Assets/success";
import Alert from "../../../Assets/alert";

const ProductForm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const selectedProduct = useSelector(selectProductById);

  //WE ARE NOT ACTUALLY DELETING THE BUT ADDING FUNCTION THE PRODUCT WHICH IS DELETED CLICK IS NOT VISIBLE TO THE USER

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [dispatch, params.id]);
  //,
  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("name", selectedProduct.name);
      setValue("description", selectedProduct.description);
      setValue("highlights", selectedProduct.highlights);
      setValue("price", selectedProduct.price);
      setValue("image",selectedProduct.image);
      setValue("rating",selectedProduct.rating)
      setValue("category",selectedProduct.category)
      setValue("countInStock", selectedProduct.countInStock);
      setValue("discountPercentage", selectedProduct.discountPercentage);
    }
  }, [selectedProduct, setValue]);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = "true";
    dispatch(updateProductAsync(product));
  };
  return (
    <div className="ProductForm">
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          console.log(data);
          const product = { ...data };
          // product.rating = 0;
          product.price = +product.price;
          product.rating = +product.rating;
          product.countInStock = +product.countInStock;
          console.log(product);
          if (params.id) {
            product.id = params.id;
            dispatch(updateProductAsync(product));
            reset();
          } else {
            dispatch(createProductAsync(product));
            reset();
          }
        })}
      >
        <div class="space-y-12">
          <div class="border-b border-gray-900/10 pb-12 px-10 mt-9 mx-20">
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              Add Product
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">
              Adding new product
            </p>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-4">
                {/* //PRODUCT NAME */}
                <label
                  for="productname"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div class="mt-2">
                  <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      {...register("name", {
                        required: "product name is required",
                      })}
                      id="name"
                      class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 "
                    />
                  </div>
                  {errors.name?.message && (
                    <p className="text-red-500">{errors.name?.message}</p>
                  )}
                </div>
              </div>

              <div class="col-span-full">
                <label
                  for="description"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div class="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "product description is required",
                    })}
                    rows="3"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
                <p class="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about product.
                </p>
                {errors.description?.message && (
                  <p className="text-red-500">{errors.description?.message}</p>
                )}
              </div>
              <div class="col-span-full">
                <label
                  for="highlights"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  HighLights
                </label>
                <div class="mt-2">
                  <textarea
                    id="highlights"
                    {...register("highlights", {
                      required: "product highlights is required",
                    })}
                    rows="3"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>

                {errors.highlights?.message && (
                  <p className="text-red-500">{errors.highlights?.message}</p>
                )}
              </div>

              <div class="col-span-full">
                <label
                  for="cover-photo"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                {/* <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"> */}
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    {...register("image", {
                      required: "product image is required",
                    })}
                    id="image"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 "
                  />
                  {errors.image?.message && (
                    <p className="text-red-500">{errors.image?.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="category"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div class="mt-2">
                <select
                  id="category"
                  {...register("category", {
                    required: "product category need to be selected",
                  })}
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>select</option>
                  <option>Wooden</option>
                  <option>MacrameArt</option>
                  <option>Clay Item</option>
                  <option>Accessories</option>
                  <option>Bags</option>
                </select>
                {errors.category?.message && (
                  <p className="text-red-500">{errors.category?.message}</p>
                )}
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-2 sm:col-start-1">
                <label
                  for="price"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    id="price"
                    {...register("price", {
                      required: "product price is required",
                      min: 1,
                      max: 10000,
                    })}
                    class="block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.price?.message && (
                    <p className="text-red-500">{errors.price?.message}</p>
                  )}
                </div>
              </div>

              <div class="sm:col-span-2">
                <label
                  for="countInStock"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    {...register("countInStock", {
                      required: "product stock is required",
                      min: 0,
                      max: 10000,
                    })}
                    id="countInStock"
                    autocomplete="address-level1"
                    class="block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.countInStock?.message && (
                    <p className="text-red-500">{errors.email?.countInStock}</p>
                  )}
                </div>
              </div>

              <div class="sm:col-span-1">
                <label
                  for="discountPercentage"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  discount Percentage
                </label>
                <div class="mt-2">
                  <input
                    type="text"
                    {...register("discountPercentage", {
                      required: "product stock is required",
                      min: 0,
                      max: 100,
                    })}
                    id="discountPercentage"
                    class="block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.discountPercentage?.message && (
                  <p className="text-red-500">
                    {errors.email?.discountPercentage}
                  </p>
                )}
              </div>
            </div>
            <div class="mt-2">
              <label
                for="discountPercentage"
                class="block text-sm font-medium leading-6 text-gray-900"
              >
                Rating
              </label>
              <input
                type="text"
                {...register("rating", {
                  required: "product stock is required",
                  min: 0,
                  max: 100,
                })}
                id="rating"
                class="block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.rating?.message && (
              <p className="text-red-500">{errors.email?.rating}</p>
            )}
          </div>
        </div>

        <div class="my-6 flex items-center justify-end gap-x-6">
          <Link
            to={"/admin"}
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
          >
            Cancel
          </Link>
          {selectedProduct && !selectedProduct.deleted && (
            <button
              type="button"
              class="rounded-md my-5 bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}

          <button
            type="submit"
            class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400  mr-4"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
 
export default ProductForm;