import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({

    email: "",

    password: "",

    api: ""
  });

  const [loading, setLoading] = useState(

    false
  );

  const handleLogin = async (

    e: React.FormEvent

  ) => {

    e.preventDefault();

    const newErrors = {

      email: "",

      password: "",

      api: ""
    };

    if (!email) {

      newErrors.email =

        "Email required";
    }

    if (!password) {

      newErrors.password =

        "Password required";
    }

    setErrors(

      newErrors
    );

    if (

      newErrors.email ||

      newErrors.password

    ) {

      return;
    }

    try {

      setLoading(

        true
      );

      setErrors({

        email: "",

        password: "",

        api: ""
      });

      const response = await api.post(

        "/auth/login",

        {

          email,

          password
        }
      );

      localStorage.setItem(

        "token",

        response.data.token
      );

      const user = await api.get(

        "/auth/me"
      );

      localStorage.setItem(

        "role",

        user.data.role
      );

      alert(

        "Login Success"
      );

      navigate(

        "/dashboard"
      );

    } catch {

      setErrors({

        email: "",

        password: "",

        api: "Invalid credentials"
      });

    } finally {

      setLoading(

        false
      );
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">

        <h1 className="text-2xl sm:text-3xl font-bold text-center">

          Welcome Back

        </h1>

        <p className="text-center text-gray-500 mt-2">

          Login to continue

        </p>

        <form

          onSubmit={handleLogin}

          className="mt-6 flex flex-col gap-4"
        >

          <div>

            <input

              type="email"

              placeholder="Enter Email"

              value={email}

              onChange={(e) =>

                setEmail(

                  e.target.value
                )
              }

              className="border rounded-lg p-3 w-full focus:outline-none"

            />

            {

              errors.email && (

                <p className="text-red-500 text-sm mt-1">

                  {errors.email}

                </p>
              )
            }

          </div>

          <div>

            <input

              type="password"

              placeholder="Enter Password"

              value={password}

              onChange={(e) =>

                setPassword(

                  e.target.value
                )
              }

              className="border rounded-lg p-3 w-full focus:outline-none"

            />

            {

              errors.password && (

                <p className="text-red-500 text-sm mt-1">

                  {errors.password}

                </p>
              )
            }

          </div>

          {

            errors.api && (

              <p className="text-red-500 text-center">

                {errors.api}

              </p>
            )
          }

          <button

            type="submit"

            disabled={loading}

            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 w-full"

          >

            {

              loading

                ? "Logging in..."

                : "Login"
            }

          </button>

        </form>

        <p className="text-center mt-5 text-sm">

          Don't have an account?

          <Link

            to="/register"

            className="text-blue-600 ml-1 font-semibold"

          >

            Register

          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;