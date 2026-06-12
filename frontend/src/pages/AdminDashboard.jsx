const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-cream pt-28 pb-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif text-ayurveda-green mb-8 flex items-center justify-between">
          <span>Admin Control Panel</span>
          <span className="text-sm bg-ayurveda-green text-white px-4 py-2 rounded-full font-sans">Admin Active</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Stats */}
          <div className="glass-card p-6 border-t-4 border-gold">
            <p className="text-earthy-brown opacity-80 text-sm">Total Sales</p>
            <p className="text-3xl font-serif text-ayurveda-green mt-2">₹1,45,000</p>
          </div>
          <div className="glass-card p-6 border-t-4 border-herbal-green">
            <p className="text-earthy-brown opacity-80 text-sm">Total Orders</p>
            <p className="text-3xl font-serif text-ayurveda-green mt-2">342</p>
          </div>
          <div className="glass-card p-6 border-t-4 border-gold">
            <p className="text-earthy-brown opacity-80 text-sm">Customers</p>
            <p className="text-3xl font-serif text-ayurveda-green mt-2">1,204</p>
          </div>
          <div className="glass-card p-6 border-t-4 border-herbal-green">
            <p className="text-earthy-brown opacity-80 text-sm">Products</p>
            <p className="text-3xl font-serif text-ayurveda-green mt-2">24</p>
          </div>

          {/* Main Area */}
          <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            <div className="glass-card p-6 h-fit sticky top-28">
              <h3 className="font-serif text-xl text-ayurveda-green mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg bg-ayurveda-green text-white transition hover:shadow-lg">Manage Orders</button>
                <button className="w-full text-left p-3 rounded-lg border border-ayurveda-green text-ayurveda-green hover:bg-white/50 transition">Add New Product</button>
                <button className="w-full text-left p-3 rounded-lg border border-ayurveda-green text-ayurveda-green hover:bg-white/50 transition">Inventory Status</button>
                <button className="w-full text-left p-3 rounded-lg border border-ayurveda-green text-ayurveda-green hover:bg-white/50 transition">Customers</button>
              </div>
            </div>

            <div className="md:col-span-2 glass-card p-8">
              <div className="flex justify-between items-center mb-6 border-b border-herbal-green/20 pb-4">
                <h3 className="font-serif text-2xl text-ayurveda-green">Recent Orders</h3>
                <button className="text-sm text-gold hover:underline">View All</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-earthy-brown border-b border-herbal-green/30">
                      <th className="pb-3 font-medium">Order ID</th>
                      <th className="pb-3 font-medium">Customer</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-earthy-brown">
                    {[1,2,3,4,5].map(row => (
                      <tr key={row} className="border-b border-herbal-green/10 hover:bg-white/30 transition">
                        <td className="py-4">#ORD-902{row}</td>
                        <td className="py-4">Anjali Sharma</td>
                        <td className="py-4">Today, 10:4{row} AM</td>
                        <td className="py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-200">
                            Pending
                          </span>
                        </td>
                        <td className="py-4 font-bold text-ayurveda-green">₹899</td>
                        <td className="py-4 text-right">
                          <button className="text-ayurveda-green hover:text-gold font-medium">Update</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
