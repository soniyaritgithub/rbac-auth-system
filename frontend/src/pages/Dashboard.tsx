import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import api from "../services/api";

type User = {

  name: string;

  email: string;

  role: string;
};

function Dashboard() {

  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(

    true
  );

  useEffect(() => {

    const fetchUser = async () => {

      try {

        setLoading(

          true
        );

        const response = await api.get(

          "/auth/me"
        );

        setUser(

          response.data
        );

      } catch {

        alert(

          "Failed to load user"
        );

      } finally {

        setLoading(

          false
        );
      }
    };

    fetchUser();

  }, []);

  if (loading) {

    return (

      <div className="min-h-screen flex justify-center items-center">

        <h1 className="text-2xl font-semibold">

          Loading user...

        </h1>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar

        role={user?.role}

      />

      <div className="p-4 sm:p-6 md:p-10">

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">

          Dashboard

        </h1>

        <p className="mt-2 text-gray-600">

          Welcome,

          {user?.name}

          👋

        </p>

        <p className="text-gray-500">

          Today:

          {

            new Date().toLocaleDateString()
          }

        </p>

        {

          user && (

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

              <div className="bg-yellow-100 p-5 rounded-xl shadow">

                <h2 className="font-bold">

                  Status

                </h2>

                <p>

                  Active User

                </p>

              </div>

              <div className="bg-purple-100 p-5 rounded-xl shadow">

                <h2 className="font-bold">

                  Access

                </h2>

                <p>

                  {user.role}

                </p>

              </div>

              <div className="bg-white p-5 rounded-xl shadow">

                <h2 className="font-semibold">

                  Name

                </h2>

                <p>

                  {user.name}

                </p>

              </div>

              <div className="bg-white p-5 rounded-xl shadow">

                <h2 className="font-semibold">

                  Email

                </h2>

                <p className="break-words">

                  {user.email}

                </p>

              </div>

              <div className="bg-white p-5 rounded-xl shadow">

                <h2 className="font-semibold">

                  Role

                </h2>

                <p>

                  {user.role}

                </p>

              </div>

              {

                user.role === "ADMIN" && (

                  <div className="bg-blue-100 p-5 rounded-xl shadow">

                    <h2 className="font-bold text-lg">

                      Admin Panel

                    </h2>

                    <p>

                      Manage Users

                    </p>

                  </div>
                )
              }

              {

                user.role === "USER" && (

                  <div className="bg-green-100 p-5 rounded-xl shadow">

                    <h2 className="font-bold text-lg">

                      User Panel

                    </h2>

                    <p>

                      Welcome User

                    </p>

                  </div>
                )
              }

            </div>
          )
        }

      </div>

    </div>
  );
}

export default Dashboard;