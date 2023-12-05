import { FormEvent, useState } from "react";
import { useRegisterUserMutation } from "../redux/services/authSlice";
import { useAppDispatch } from "../store";
import { setAuth } from "../redux/store/authSlice";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  const [registerUser] = useRegisterUserMutation(); 
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFormSubmission = async (e : FormEvent) => {
      e.preventDefault();

      const response = await registerUser({username, email, password});  
      console.log(response);
      
      if ('data' in response && 'access_token' in response.data) {
        // storing returned access token in redux store
        dispatch(setAuth({
            isAuthenticated: true,
            accessToken: response.data.access_token as string,
            user: null, /* user is not returned in the api response */
        }))
        // authenticated => open news feed page
        navigate('/');
    }   
    else {
      // show error message
    }
  }

    return (
      <div className="flex place-items-center" style={{minHeight: "100vh"}}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create a new account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    type="text"
                    value={username}
                    autoComplete="email"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    style={{paddingLeft: 10}}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    autoComplete="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    style={{paddingLeft: 10}}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    autoComplete="current-password"
                    required
                    style={{paddingLeft: 10}}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  onClick={handleFormSubmission}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create Account
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
  
          </div>
        </div>
      </div>
    )
  }
  
  export default RegisterPage;