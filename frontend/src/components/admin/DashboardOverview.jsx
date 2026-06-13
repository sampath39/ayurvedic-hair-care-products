import { ShoppingBag, TrendingUp, Clock, Truck, CheckCircle, XCircle, CreditCard, Users, DollarSign, Package, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, subtitle, icon: Icon, gradientClass }) => (
  <motion.div 
    whileHover={{ y: -8, scale: 1.02 }}
    className={`rounded-3xl p-6 shadow-xl border border-white/20 relative overflow-hidden group transition-all duration-300 ${gradientClass}`}
  >
    {/* Decorative background element */}
    <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-700 ease-out blur-2xl"></div>
    
    <div className="flex justify-between items-start relative z-10">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-white/90 mb-1">
          <Icon size={18} />
          <p className="text-sm font-bold tracking-widest uppercase opacity-90">{title}</p>
        </div>
        <h3 className="text-4xl font-black text-white tracking-tight drop-shadow-md my-2 font-sans">{value}</h3>
        {subtitle && <p className="text-xs text-white/80 font-medium bg-white/10 inline-block px-3 py-1 rounded-full w-max mt-1 backdrop-blur-sm">{subtitle}</p>}
      </div>
      <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-md shadow-inner text-white group-hover:rotate-12 transition-transform duration-300">
        <Activity size={28} />
      </div>
    </div>
  </motion.div>
);

const DashboardOverview = ({ analytics, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="h-40 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-3xl"></div>
        ))}
      </div>
    );
  }

  // Graceful fallbacks for undefined values when backend isn't reachable
  const safeData = {
    totalSales: analytics?.totalSales || 0,
    totalOrders: analytics?.totalOrders || 0,
    todayOrders: analytics?.todayOrders || 0,
    pendingOrders: analytics?.pendingOrders || 0,
    activeDeliveries: analytics?.activeDeliveries || 0,
    deliveredOrders: analytics?.deliveredOrders || 0,
    cancelledOrders: analytics?.cancelledOrders || 0,
    codRevenue: analytics?.codRevenue || 0,
    upiRevenue: analytics?.upiRevenue || 0,
    customers: analytics?.customers || 0,
    products: analytics?.products || 0,
  };

  return (
    <div className="space-y-8 font-sans">
      <div className="flex justify-between items-end mb-10 border-b border-gray-200 dark:border-gray-700 pb-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white tracking-tight">Command Center</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Real-time overview of your AyuRoots business performance.</p>
        </div>
        <span className="hidden md:flex px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-bold shadow-inner items-center gap-2">
           <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span> Live Data Feed
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <StatCard title="Gross Revenue" value={`₹${safeData.totalSales.toLocaleString()}`} subtitle="Lifetime Earnings" icon={TrendingUp} gradientClass="bg-gradient-to-br from-emerald-500 to-teal-700" />
        <StatCard title="Total Orders" value={safeData.totalOrders} subtitle="All time" icon={ShoppingBag} gradientClass="bg-gradient-to-br from-blue-500 to-indigo-700" />
        <StatCard title="Today's Orders" value={safeData.todayOrders} subtitle="Last 24 Hours" icon={Clock} gradientClass="bg-gradient-to-br from-indigo-400 to-purple-600" />
        <StatCard title="Pending Orders" value={safeData.pendingOrders} subtitle="Awaiting Action" icon={Clock} gradientClass="bg-gradient-to-br from-amber-400 to-orange-600" />
        
        <StatCard title="Active Deliveries" value={safeData.activeDeliveries} subtitle="In Transit" icon={Truck} gradientClass="bg-gradient-to-br from-orange-400 to-red-600" />
        <StatCard title="Delivered" value={safeData.deliveredOrders} subtitle="Successfully Shipped" icon={CheckCircle} gradientClass="bg-gradient-to-br from-green-400 to-emerald-600" />
        <StatCard title="Cancelled" value={safeData.cancelledOrders} subtitle="Lost Revenue" icon={XCircle} gradientClass="bg-gradient-to-br from-red-400 to-rose-600" />
        <StatCard title="COD Revenue" value={`₹${safeData.codRevenue.toLocaleString()}`} subtitle="Cash collected" icon={DollarSign} gradientClass="bg-gradient-to-br from-teal-400 to-cyan-600" />
        
        <StatCard title="Online Revenue" value={`₹${safeData.upiRevenue.toLocaleString()}`} subtitle="Prepaid Orders" icon={CreditCard} gradientClass="bg-gradient-to-br from-purple-400 to-fuchsia-600" />
        <StatCard title="Customers" value={safeData.customers} subtitle="Registered Users" icon={Users} gradientClass="bg-gradient-to-br from-pink-400 to-rose-600" />
        <StatCard title="Products" value={safeData.products} subtitle="Active Catalog" icon={Package} gradientClass="bg-gradient-to-br from-cyan-400 to-blue-600" />
        <StatCard title="System Status" value="Online" subtitle="All Systems Operational" icon={Activity} gradientClass="bg-gradient-to-br from-gray-700 to-gray-900" />
      </div>
    </div>
  );
};

export default DashboardOverview;
