import { useState } from "react";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";
import axios from "axios";

const cookie = new Cookie();

export default function Auth() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const initState = {
    username: "",
    password: "",
  };
  const [authInput, setAuthInput] = useState(initState);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAuthInput({ ...authInput, [name]: value });
  };

  const login = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/jwt/create/`,
        authInput,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const options = { path: "/" };
      cookie.set("access_token", res.data.access, options);
      router.push("/main-page");
    } catch (error) {
      console.log(error);
    }
  };

  const authUser = async (e) => {
    e.preventDefault();
    if (isLogin) {
      login();
    } else {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/register/`,
          authInput,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        login();
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {isLogin ? "Login" : "Sign up"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={authUser}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={authInput.username}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={authInput.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-sm">
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="cursor-pointer font-medium text-white hover:text-indigo-500"
              >
                change mode ?
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {isLogin ? "Login with JWT" : "Create new user"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
