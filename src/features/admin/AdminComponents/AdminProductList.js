import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllProducts,
  fetchAllProductByFilterAsync,
  selectTotalItems,
  selectProductListStatus,
} from "../../product-list/productSlice";
import { ITEMS_PER_PAGE } from "../../../Assets/constants";
import Rating from "../../../Assets/rating";
import { ThreeDots } from "react-loader-spinner";
// import { fetchProductsByFilter } from "../productAPI";

const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "wooden", label: "wooden", checked: false },
      { value: "accessories", label: "accessories", checked: false },
      { value: "bags", label: "bags", checked: true },
      { value: "clayMadeItem", label: "clayMadeitem", checked: false },
      { value: "MacrameART", label: "MacrameART", checked: false },
    ],
  },
];
const sortOptions = [
  { name: "Best Rating", sort: "-rating", current: false },
  {
    name: "Price: Low to High",
    sort: "price",
    current: false,
  },
  {
    name: "Price: High to Low",
    sort: "-price",
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AdminProductList = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const totalItems = useSelector(selectTotalItems);
  const status = useSelector(selectProductListStatus);

  //  FUNCTION TO FILTER PRODUCT LIST
  const handleFilter = (e, section, option) => {
    // console.log(e.target.checked);
    const newFilter = { ...filter };
    if (e.target.checked) {
      newFilter[section.id] = option.value;
    } else {
      delete newFilter[section.id];
    }
    setFilter(newFilter);
    // console.log(section.id, option.value);
  };

  //FUNCTION TO HANDLE THE SORTING OF DATA
  const handleSort = (e, option) => {
    const sort = { _sort: option.sort };
    // console.log({ sort });
    setSort(sort);
  };

  //FUNCTION FOR ADDING PAGINATION FUNCTIONALITY
  const handlePage = (page) => {
    // console.log({ page });
    setPage(page);
  };
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };

    dispatch(
      fetchAllProductByFilterAsync({ filter, sort, pagination, admin: true })
    );
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);
  return (
    <div className="bg-white">
      <div>
        {/* MOBILE FILTER DIALOG*/}
        <MobileFliter
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
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          {({ focus }) => (
                            <p
                              onClick={(e) => handleSort(e, option)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                focus ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
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
export default AdminProductList;

//MOBILE FILTER
const MobileFliter = ({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
}) => {
  return (
    <Transition show={mobileFiltersOpen}>
      <Dialog
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <TransitionChild
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 z-40 flex">
          <TransitionChild
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  onChange={(e) => {
                                    handleFilter(e, section, option);
                                  }}
                                  type="radio"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

//DESKTOP FILTER
const DesktopFilter = ({ handleFilter, filters }) => {
  return (
    <form className="hidden lg:block">
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </DisclosureButton>
              </h3>
              <DisclosurePanel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        onChange={(e) => {
                          handleFilter(e, section, option);
                        }}
                        type="radio"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
};

//PAGINATION
const Pagination = ({ handlePage, page, setPage, totalItems }) => {
  const totalPage = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </div>
        <div
          onClick={(e) => handlePage(page < totalPage ? page + 1 : page)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing{" "}
            <span class="font-medium">{(page - 1) * ITEMS_PER_PAGE + 1}</span>
            to{" "}
            <span class="font-medium">
              {page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : page * ITEMS_PER_PAGE}
            </span>
            of
            <span class="font-medium">{totalItems}</span>
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>

            {Array.from({ length: totalPage }).map((el, index) => (
              <div
                onClick={(e) => handlePage(index + 1)}
                aria-current="page"
                className={`relative cursor-pointer z-10 inline-flex items-center ${
                  index + 1 === page
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400"
                } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {index + 1}
              </div>
            ))}

            <div
              onClick={(e) => handlePage(page < totalPage ? page + 1 : page)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

//PRODUCTGRID
const ProductGrid = ({ products, status }) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
            {status === "loading" ? (
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#55555"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : null}
            {products.map((product) => (
              <div>
                <Link
                  to={`/productDetail/${product.id}`}
                  key={product.id}
                  className="group "
                >
                  <div className="aspect-h-1 aspect-w-1 w-full  overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7  ">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <div className="Price align-items flex flex-row ">
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
                  </div>

                  <div className=" mt-2 Rating flex inline-flex justify-between  ">
                    <p>{product.rating}</p>
                    <Rating value={product.rating} />
                    <p className="mt-0 mb-6  pl-3 text-sm text-gray-700">
                      from {product.numReviews} Reviews
                    </p>
                  </div>
                </Link>
                <div>
                  <Link
                    to={`/admin/product-form/edit/${product.id}`}
                    type="submit"
                    className="rounded-md  bg-green-600 px-3  py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {" "}
                    Edit Product
                  </Link>
                  {product.deleted && (
                    <p className="text-sm text-red-900 ">product deleted</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
