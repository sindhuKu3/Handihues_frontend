import {useEffect, useState } from "react";
import {
  Menu,
  Transition,
} from "@headlessui/react";
import {
  FunnelIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllProducts,
  fetchAllProductByFilterAsync,
  selectTotalItems,
  selectProductListStatus,
} from "../productSlice";
import { Pagination } from "../../../Assets/Pagination";
import { MobileFilter } from "../../../Assets/MobileFilter";
import { DesktopFilter } from "../../../Assets/DesktopFilter";
import Rating from "../../../Assets/rating";
import { ThreeDots } from "react-loader-spinner";


const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "wooden", label: "wooden", checked: false },
      { value: "Accessories", label: "Accessories", checked: false },
      { value: "bags", label: "bags", checked: true },
      { value: "clayMadeItem", label: "clayMadeItem", checked: false },
      { value: "MacrameART", label: "MacrameART", checked: false },     
    ],
  },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductList = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const totalItems = useSelector(selectTotalItems);
  const status = useSelector(selectProductListStatus);

  //  FUNCTION TO FILTER PRODUCT LIST
  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    if (e.target.checked) {
      newFilter[section.id] = option.value;
    } else {
      delete newFilter[section.id];
    }
    setFilter(newFilter);
  
  };


  //FUNCTION FOR ADDING PAGINATION FUNCTIONALITY
  const handlePage = (page) => {
    // console.log({ page });
    setPage(page);
  };
  useEffect(() => {
    const pagination = { _page: page, _limit: 10 };
    dispatch(fetchAllProductByFilterAsync({ filter,  pagination }));
  }, [dispatch, filter, page]);


  useEffect(() => {
    setPage(1);
  }, [totalItems,]);
  return (
    <div className="bg-white">
      <div>
        {/* MOBILE FILTER DIALOG*/}
        <MobileFilter
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          handleFilter={handleFilter}
          filters={filters}
        />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/*DESKTOP FILTER*/}
              <DesktopFilter handleFilter={handleFilter} filters={filters} />
              {/*PRODUCT GRID */}
              <div className="lg:col-span-3">
                <ProductGrid products={products} status={status} />
              </div>
            </div>
            <Pagination
              handlePage={handlePage}
              page={page}
              setPage={setPage}
              totalItems={totalItems}
            />
          </section>
        </main>
      </div>
    </div>
  );
};
export default ProductList;

//PRODUCTGRID
const ProductGrid = ({ products, status }) => {
  return (
    <div className="lg:col-span-3">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
            {status === "loading" ? (
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="rgb(79,70,229)"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : null}
            {products.map((product) => (
              <Link
                to={`/productDetail/${product.id}`}
                key={product.id}
                className="group"
              >
                {!product.deleted && (
                  <div className="pro">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">
                      {product.name}
                    </h3>
                    <div className="Price align-items flex flex-row ">
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        Rs
                        {Math.round(
                          product.price * (1 - product.discountPercentage / 100)
                        )}
                      </p>
                      <p className="mt-1 text-lg pl-3 font-medium text-gray-500 line-through">
                        {product.price}Rs
                      </p>
                      <p className="mt-1 text-lg pl-3 font-medium text-green-500 ">
                        {product.discountPercentage}%
                      </p>
                    </div>

                    <div className=" mt-2 Rating flex inline-flex justify-between  ">
                      <p>{product.rating} </p>
                      <Rating value={product.rating} />
                      <p className="mt-0  pl-3 text-sm text-gray-700">
                        from {product.numReviews} Reviews
                      </p>
                    </div>
                    <div className="outOfStock">
                      {product.countInStock <= 0 && (
                        <p className="mt-0  pt-4 text-lg text-red-700">
                          Out Of Stock
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
