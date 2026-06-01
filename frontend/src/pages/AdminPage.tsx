function AdminPage() {

  return (

    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl sm:text-4xl font-bold">

          Admin Dashboard

        </h1>

        <p className="text-gray-500 mt-2">

          Manage users and system controls

        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="font-bold text-lg">

              Total Users

            </h2>

            <p className="text-3xl mt-3">

              0

            </p>

            <p className="text-gray-500 mt-2">

              Placeholder value

            </p>

          </div>

          <div className="bg-blue-100 rounded-xl shadow p-6">

            <h2 className="font-bold text-lg">

              Admin Controls

            </h2>

            <p className="mt-2">

              Manage Roles

            </p>

            <p>

              Control Access

            </p>

          </div>

          <div className="bg-green-100 rounded-xl shadow p-6">

            <h2 className="font-bold text-lg">

              System Status

            </h2>

            <p className="mt-2">

              Running

            </p>

          </div>

        </div>

        <div className="mt-8 bg-white rounded-xl shadow p-6">

          <h2 className="font-bold text-xl">

            User Management

          </h2>

          <p className="text-gray-500 mt-2">

            User list and controls can be added here later.

          </p>

        </div>

      </div>

    </div>
  );
}

export default AdminPage;