import { ShoppingBag, TrendingUp, Clock, Truck, CheckCircle, XCircle, CreditCard, Users, DollarSign, Package } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border-l-4 ${colorClass} relative overflow-hidden group transition-colors duration-300`}
  >
    <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-500 bg-current text-${colorClass.split('-')[2]}-500`}></div>
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl bg-gray-50 dark:bg-gray-700 text-${colorClass.split('-')[2]}-500`}>
        <Icon size={24} />
      </div>
    </div>
  </motion.div>
);

const DashboardOverview = ({ analytics, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-3xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Live Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`₹${analytics.totalSales?.toLocaleString()}`} icon={TrendingUp} colorClass="border-l-emerald-500" />
        <StatCard title="Total Orders" value={analytics.totalOrders} icon={ShoppingBag} colorClass="border-l-blue-500" />
        <StatCard title="Today's Orders" value={analytics.todayOrders} icon={Clock} colorClass="border-l-indigo-500" />
        <StatCard title="Pending Orders" value={analytics.pendingOrders} icon={Clock} colorClass="border-l-yellow-500" />
        <StatCard title="Active Deliveries" value={analytics.activeDeliveries} icon={Truck} colorClass="border-l-orange-500" />
        <StatCard title="Delivered Orders" value={analytics.deliveredOrders} icon={CheckCircle} colorClass="border-l-green-500" />
        <StatCard title="Cancelled Orders" value={analytics.cancelledOrders} icon={XCircle} colorClass="border-l-red-500" />
        <StatCard title="COD Revenue" value={`₹${analytics.codRevenue?.toLocaleString()}`} icon={DollarSign} colorClass="border-l-teal-500" />
        <StatCard title="UPI Revenue" value={`₹${analytics.upiRevenue?.toLocaleString()}`} icon={CreditCard} colorClass="border-l-purple-500" />
        <StatCard title="Total Customers" value={analytics.customers} icon={Users} colorClass="border-l-pink-500" />
        <StatCard title="Total Products" value={analytics.products} icon={Package} colorClass="border-l-cyan-500" />
        <StatCard title="Peak Order Time" value="7:00 PM" icon={Clock} colorClass="border-l-rose-500" />
      </div>
    </div>
  );
};

export default DashboardOverview;
