import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

import React from "react"

export type UserSubmitForm = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export const SignUp: React.FC = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters")
      .max(20, "Username must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema),
  })
  const onSubmit = (data: UserSubmitForm) => {
    console.log(JSON.stringify(data, null, 2))
  }
  return (
    <div className="bg-black h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-yellow-500 w-fit max-h-[80%] shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            Username
          </label>
          <input
            type="text"
            {...register("username")}
            className={`shadow appearance-none border rounded w-full py-2 px-3 bg-black  text-yellow-200 leading-tight focus:outline-none focus:shadow-outline`}
          />
          <div className="text-red-700 font-extrabold text-xs italic">
            {errors.username?.message}
          </div>
        </div>
        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            Email
          </label>
          <input
            type="text"
            {...register("email")}
            className={`shadow appearance-none border rounded w-full py-2 px-3 bg-black  text-yellow-200 leading-tight focus:outline-none focus:shadow-outline`}
          />
          <div className="text-red-700 font-extrabold text-xs italic">
            {errors.email?.message}
          </div>
        </div>
        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className={`shadow appearance-none border rounded w-full py-2 px-3 bg-black  text-yellow-200 leading-tight focus:outline-none focus:shadow-outline`}
          />
          <div className="text-red-700 font-extrabold text-xs italic">
            {errors.password?.message}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            className={`shadow appearance-none border rounded w-full py-2 px-3 bg-black  text-yellow-200 leading-tight focus:outline-none focus:shadow-outline`}
          />
          <div className="text-red-700 font-extrabold text-xs italic">
            {errors.confirmPassword?.message}
          </div>
        </div>

        <div className="flex justify-between mt-3">
          <button
            type="submit"
            className="bg-black  hover:text-yellow-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="bg-black  hover:text-yellow-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}
