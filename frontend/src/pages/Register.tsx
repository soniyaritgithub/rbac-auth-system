import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    name: "",

    email: "",

    password: "",

    role: "USER"
  });

  const [errors, setErrors] = useState({

    name: "",

    email: "",

    password: ""
  });

  const [loading, setLoading] = useState(

    false
  );

  const registerUser = async (

    e: React.FormEvent

  ) => {

    e.preventDefault();

    const newErrors = {

      name: "",

      email: "",

      password: ""
    };

    if (!form.name) {

      newErrors.name =

        "Name required";
    }

    if (!form.email) {

      newErrors.email =

        "Email required";
    }

    if (!form.password) {

      newErrors.password =

        "Password required";
    }

    if (

      form.password &&

      form.password.length < 6

    ) {

      newErrors.password =

        "Minimum 6 characters";
    }

    setErrors(

      newErrors
    );

    if (

      newErrors.name ||

      newErrors.email ||

      newErrors.password

    ) {

      return;
    }

    try {

      setLoading(

        true
      );

      await api.post(

        "/auth/register",

        form
      );

      alert(

        "Registered Successfully"
      );

      navigate(

        "/login"
      );

    } catch {

      alert(

        "Register Failed"
      );

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

          Create Account

        </h1>

        <p className="text-center text-gray-500 mt-2">

          Register to continue

        </p>

        <form

          onSubmit={registerUser}

          className="mt-6 flex flex-col gap-4"
        >

          <div>

            <input

              name="name"

              placeholder="Full Name"

              value={form.name}

              onChange={(e) =>

                setForm({

                  ...form,

                  name: e.target.value
                })
              }

              className="border rounded-lg p-3 w-full"

            />

            {

              errors.name && (

                <p className="text-red-500 text-sm mt-1">

                  {errors.name}

                </p>
              )
            }

          </div>

          <div>

            <input

              type="email"

              placeholder="Email"

              value={form.email}

              onChange={(e) =>

                setForm({

                  ...form,

                  email: e.target.value
                })
              }

              className="border rounded-lg p-3 w-full"

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

              placeholder="Password"

              value={form.password}

              onChange={(e) =>

                setForm({

                  ...form,

                  password: e.target.value
                })
              }

              className="border rounded-lg p-3 w-full"

            />

            {

              errors.password && (

                <p className="text-red-500 text-sm mt-1">

                  {errors.password}

                </p>
              )
            }

          </div>

          <select

            value={form.role}

            onChange={(e) =>

              setForm({

                ...form,

                role: e.target.value
              })
            }

            className="border rounded-lg p-3"

          >

            <option value="USER">

              USER

            </option>

            <option value="ADMIN">

              ADMIN

            </option>

          </select>

          <button

            type="submit"

            disabled={loading}

            className="bg-green-600 hover:bg-green-700 text-white rounded-lg py-3"

          >

            {

              loading

                ? "Registering..."

                : "Register"
            }

          </button>

        </form>

        <p className="text-center mt-5 text-sm">

          Already have account?

          <Link

            to="/login"

            className="text-blue-600 ml-1 font-semibold"

          >

            Login

          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;