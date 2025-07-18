// components/admin/DashboardStats.jsx
'use client'
const DashboardStats = ({ orders }) => {
  const today = new Date();
  const todaysOrders = orders.filter(order => {
    const orderDate = new Date(order.createdAt);
    return orderDate.toDateString() === today.toDateString();
  });

  const stats = [
    { name: 'Total Orders', value: orders.length },
    { name: "Today's Orders", value: todaysOrders.length },
    { name: 'Pending Shipment', value: orders.filter(o => !o.shipped).length },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                {/* Icon would go here */}
              </div>
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                </dd>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;