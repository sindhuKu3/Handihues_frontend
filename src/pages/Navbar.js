import { Fragment } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectLoggedInUser } from "../features/auth/authSlice";
import { selectedItems } from "../features/cart/cartSlice";
import { selectUserInfo } from "../features/user/userSlice";

const navigation = [
  { name: "HandiHues", link: "/", user: true },
  { name: "About Us", link: "/about", user: true },
  { name: "Admin", link: "/admin", admin: true },
  { name: "Add Product", link: "/admin/product-form/", admin: true },
  { name: "Orders", link: "/admin/orders", admin: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar({ children }) {
  const items = useSelector(selectedItems);
  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);
  return (
    <>
     {userInfo && (
        <div className="max-h-full ">
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="logo">
                        <Link to="/">
                          <img
                            className="h-10 w-10 ml-5 -mt-3"
                            src="/images/logo.png"
                            alt="Your Company"
                          />
                        </Link>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {navigation.map((item) =>
                            item[userInfo.role] ? (
                              <Link
                                key={item.name}
                                to={item.link}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                  "rounded-md px-3 py-2 text-sm font-medium"
                                )}
                                aria-current={item.current ? "page" : undefined}
                              >
                                {item.name}
                              </Link>
                            ) : null
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                       <Link to="/cart">
                          <button
                            type="button"
                            className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="sr-only">View notifications</span>
                            <ShoppingCartIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </Link>
                        { items.length > 0 && (
                          <span className="inline-flex items-center rounded-md mb-7 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            {items.length}
                          </span>
                        )}

                        {/* Profile dropdown */}
                      {<Menu as="div" className="relative ml-3">
                          <div>
                            <MenuButton className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-10 w-10 rounded-full"
                                src="./images/user.png"
                                alt=""
                              />
                            </MenuButton>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 cursor-pointer ring-black ring-opacity-5 focus:outline-none">
                              <ul>
                                <div>
                                  <li className="hover:bg-purple-600 w-full">
                                    <Link
                                      className="pl-4 leading-8 "
                                      to={"/profile"}
                                    >
                                      My Profile
                                    </Link>
                                  </li>
                                  <li className="hover:bg-purple-600 w-full">
                                    <Link
                                      className="pl-4 leading-8 "
                                      to={"/userOrders"}
                                    >
                                      My Orders
                                    </Link>
                                  </li>
                                  <li className="hover:bg-purple-600 w-full ">
                                    <Link
                                      className="pl-4 leading-8 "
                                      to={"/logOut"}
                                    >
                                      Logout
                                    </Link>
                                  </li>
                                </div>
                              </ul>
                            </MenuItems>
                          </Transition>
                        </Menu>}
                      </div>
                    </div>
                    <div className=" flex md:hidden">
                      {/* Mobile menu button */}
                      <DisclosureButton className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6 mr-10"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </DisclosureButton>
                    </div>
                  </div>
                </div>

                <DisclosurePanel className="md:hidden bg-gray-800 ">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0 bg-white">
                        <img
                          className="h-5 w-5 rounded-full"
                          // src={userInfo.imageUrl}
                          src="images/user.png"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white pb-1">
                          {/* this should come from userInfo */}
                          {userInfo.role}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {userInfo.email}
                        </div>
                      </div>
                      <Link to="/cart">
                        <button
                          type="button"
                          className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <ShoppingCartIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </Link>
                      {items.length > 0 && (
                        <span className="inline-flex items-center rounded-md bg-red-50 mb-7 -ml-3 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                          {items.length}
                        </span>
                      )}
                    </div>

                    <div className="UserNavigation ">
                      <div className="Profile">
                        <Link
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                          to={"/profile"}
                        >
                          MY Profile
                        </Link>
                      </div>
                      <div className="Orders">
                        <Link
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                          to={"/userOrders"}
                        >
                          My Orders
                        </Link>
                      </div>
                      <div className="Orders">
                        <Link
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                          to={"/signout"}
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  </div>
                </DisclosurePanel>
              </>
            )}
          </Disclosure>

          <header className="bg-white shadow"></header>
        </div>
      )}
    </>
  );
}

export default NavBar;
