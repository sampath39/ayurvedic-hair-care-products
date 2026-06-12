import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { useMemo } from 'react';

const COLORS = ['#3d6c56', '#bfa75d', '#8b5cf6', '#f97316', '#ef4444', '#3b82f6'];

const AnalyticsView = ({ orders, isLoading }) => {
  
  // Aggregate data from orders
  const { dailyRevenue, paymentMethods, orderStatuses } = useMemo(() => {
    const daily = {};
    const payments = { COD: 0, UPI: 0 };
    const statuses = {};

    orders.forEach(order => {
      // Daily Revenue
      const date = new Date(order.created_at).toLocaleDateString('en-US', { weekday: 'short' });
      daily[date] = (daily[date] || 0) + Number(order.total_amount);

      // Payments
      if (order.payment_method === 'COD') payments.COD++;
      else payments.UPI++;

      // Statuses
      statuses[order.order_status] = (statuses[order.order_status] || 0) + 1;
    });

    const dailyRevenueArray = Object.keys(daily).map(key => ({ name: key, revenue: daily[key] }));
    const paymentMethodsArray = [
      { name: 'COD', value: payments.COD },
      { name: 'Online/UPI', value: payments.UPI }
    ];
    const orderStatusesArray = Object.keys(statuses).map(key => ({ name: key, count: statuses[key] }));

    return { dailyRevenue: dailyRevenueArray, paymentMethods: paymentMethodsArray, orderStatuses: orderStatusesArray };
  }, [orders]);

  if (isLoading) {
    return <div className="h-96 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-3xl"></div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Advanced Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Revenue Area Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Daily Revenue Graph</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyRevenue.length ? dailyRevenue : [{name: 'Mon', revenue: 0}]}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3d6c56" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3d6c56" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Area type="monotone" dataKey="revenue" stroke="#3d6c56" fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Methods Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Payment Method Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={paymentMethods} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {paymentMethods.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Bar Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Order Status Statistics</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderStatuses}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Bar dataKey="count" fill="#bfa75d" radius={[6, 6, 0, 0]}>
                  {orderStatuses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
