import { Link } from "react-router-dom";

type Props = {

  role?: string;
};

function Navbar(

  { role }: Props

) {

  const logout = () => {

    localStorage.removeItem(

      "token"
    );

    localStorage.removeItem(

      "role"
    );

    window.location.href =

      "/login";
  };

  return (

    <nav className="bg-white shadow px-4 py-4">

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

        <Link

          to="/dashboard"

          className="text-xl font-bold"

        >

          RBAC System

        </Link>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">

          <Link

            to="/dashboard"

            className="px-4 py-2 rounded-lg hover:bg-gray-100 w-full sm:w-auto text-center"

          >

            Dashboard

          </Link>

          {

            role === "ADMIN" && (

              <Link

                to="/admin"

                className="px-4 py-2 rounded-lg hover:bg-gray-100 w-full sm:w-auto text-center"

              >

                Admin

              </Link>
            )
          }

          <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">

            {role}

          </span>

          <button

            onClick={logout}

            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto"

          >

            Logout

          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;