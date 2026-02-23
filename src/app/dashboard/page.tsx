export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome back 👋</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-gray-500 text-sm mb-2">Total Users</h3>
          <p className="text-2xl font-bold text-gray-800">1,240</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-gray-500 text-sm mb-2">Projects</h3>
          <p className="text-2xl font-bold text-gray-800">87</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-gray-500 text-sm mb-2">Revenue</h3>
          <p className="text-2xl font-bold text-gray-800">$12,540</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-gray-500 text-sm mb-2">Active Tasks</h3>
          <p className="text-2xl font-bold text-gray-800">23</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Recent Activity
        </h2>

        <ul className="space-y-4">
          <li className="flex justify-between items-center border-b pb-3">
            <span className="text-gray-600">New user registered</span>
            <span className="text-sm text-gray-400">2 minutes ago</span>
          </li>

          <li className="flex justify-between items-center border-b pb-3">
            <span className="text-gray-600">
              Project "MMTRI Website" updated
            </span>
            <span className="text-sm text-gray-400">1 hour ago</span>
          </li>

          <li className="flex justify-between items-center">
            <span className="text-gray-600">Payment received</span>
            <span className="text-sm text-gray-400">Yesterday</span>
          </li>
        </ul>
      </div>
    </main>
  );
}
