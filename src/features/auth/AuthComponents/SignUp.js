
import {Navigate,Link} from 'react-router-dom' ; 
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from 'react-redux';
import { selectLoggedInUser,createUserAsync } from '../authSlice';
const SignUp = () => {
 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const dispatch = useDispatch() ; 
const user = useSelector(selectLoggedInUser)
  // console.log(errors) ;
    return (
      <>
        {user && <Navigate to={"/"} replace={true}></Navigate>}
        <div className="flex min-h-full flex-1 flex-col mt-10  mx-60 border-solid border-l-2 border-r-2 border-purple-900  rounded-lg justify-center px-6 py-8 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="h-10 w-10 ml-40 -mt-3"
              src="/images/logo.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-purple-900">
              Create Your Account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              noValidate
              onSubmit={handleSubmit((data) => {
                dispatch(
                  createUserAsync({
                    email: data.email,
                    password: data.password,
                    addresses: [],
                    role: "user",
                    fullName: data.fullName,
                  })
                );
                // console.log(data);
              })}
            >
              <div>
                {/* FULL NAME OF SIGNUP USER */}
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  fullName
                </label>
                <div className="mt-2">
                  <input
                    id="fullName"
                    {...register("fullName", {
                      required: "fullName is required",
                    })}
                    type="fullName"
                    className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500">{errors.fullName.message}</p>
                )}
              </div>
              <div>
                {/* EMAIL OF SIGNUP USER */}
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
                      pattern: {
                        value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/,
                        message: "email is not valid",
                      },
                    })}
                    type="email"
                    className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email?.message && (
                    <p className="text-red-500">{errors.email?.message}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  {/* PASSWORD OF SIGNUP USER */}
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm"></div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password", {
                      required: "password is required",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                        message: `- at least 8 characters\n
                        - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                        - Can contain special characters`,
                      },
                    })}
                    type="password"
                    className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="text-sm"></div>
              </div>
              {/* //confirem password section */}
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value, formValues) =>
                      value === formValues.password ||
                      "password is not matching",
                  })}
                  type="confirmPassword"
                  className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                >
                  SignUp
                </button>
              </div>
            </form>

            <p className="mt-10 pl-4 text-center text-sm text-gray-500">
              Already have Account?
              <Link
                to={"/login"}
                className="font-semibold leading-6 text-purple-600 hover:text-purple-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </>
    );
}
 
export default SignUp;