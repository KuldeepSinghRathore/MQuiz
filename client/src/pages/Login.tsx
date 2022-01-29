import React from "react"

export type UserSubmitForm = {
  email: string
  password: string
}

export const Login: React.FC = () => {
  const [isError, setIsError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState(
    `shadow appearance-none border rounded w-full py-2 px-3 bg-black  text-yellow-200 leading-tight focus:outline-none focus:shadow-outline`
  )
  const [formValue, setFormValue] = React.useState<UserSubmitForm>({
    email: "",
    password: "",
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setFormValue({ ...formValue, [name]: value })
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(JSON.stringify(formValue, null, 2))
  }
  return (
    <div className="bg-black h-screen  flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-yellow-500 w-fit max-w-md max-h-[80%] shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            Email
          </label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={formValue.email}
            autoComplete="false"
            className={`shadow appearance-none border rounded w-full py-2 px-3 bg-black  text-yellow-200 leading-tight focus:outline-none focus:shadow-outline`}
          />
        </div>
        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formValue.password}
            className={`shadow appearance-none border rounded w-full py-2 px-3 bg-black  text-yellow-200 leading-tight focus:outline-none focus:shadow-outline`}
          />
          <div className="text-red-700 font-extrabold text-xs italic">
            {isError ? errorMessage : ""}
          </div>
        </div>

        <div className="flex justify-between mt-3">
          <button
            type="submit"
            className="bg-black  hover:text-yellow-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
          <button
            type="button"
            // onClick={() => reset()}
            className="bg-black  hover:text-yellow-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}
