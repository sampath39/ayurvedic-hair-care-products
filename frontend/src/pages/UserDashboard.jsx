import { useSelector } from 'react-redux';

const UserDashboard = () => {
  const { currentUser } = useSelector(state => state.user);

  return (
    <div className="min-h-screen bg-cream pt-28 pb-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-serif text-ayurveda-green mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1 glass-card p-6 h-fit">
            <div className="text-center border-b border-herbal-green/20 pb-6 mb-6">
              <div className="w-20 h-20 bg-gold text-white rounded-full flex items-center justify-center text-3xl font-serif mx-auto mb-4 shadow-lg">
                {currentUser?.email ? currentUser.email[0].toUpperCase() : 'U'}
              </div>
              <p className="font-medium text-ayurveda-green truncate">{currentUser?.email || 'Guest User'}</p>
            </div>
            <ul className="space-y-2 text-earthy-brown">
              <li className="p-3 bg-ayurveda-green text-white rounded-lg cursor-pointer">Orders</li>
              <li className="p-3 hover:bg-white/50 rounded-lg cursor-pointer transition">Profile Settings</li>
              <li className="p-3 hover:bg-white/50 rounded-lg cursor-pointer transition">Saved Addresses</li>
              <li className="p-3 hover:bg-white/50 rounded-lg cursor-pointer transition text-red-500 mt-8">Logout</li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="glass-card p-8">
              <h2 className="text-2xl font-serif text-ayurveda-green mb-6">Recent Orders</h2>
              
              {/* Mock Orders List */}
              <div className="space-y-4">
                {[1, 2].map(order => (
                  <div key={order} className="border border-herbal-green/30 rounded-xl p-6 bg-white/40 hover:bg-white/60 transition">
                    <div className="flex flex-wrap justify-between items-center mb-4 pb-4 border-b border-herbal-green/20">
                      <div>
                        <p className="text-sm text-earthy-brown opacity-80">Order #ORD-{Math.floor(Math.random() * 10000)}</p>
                        <p className="text-sm font-medium text-ayurveda-green">Placed on: {new Date().toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-ayurveda-green">₹1,250</p>
                        <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs font-bold rounded-full border border-gold/50">Processing</span>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-herbal-green/20 rounded-lg flex items-center justify-center text-xs text-ayurveda-green">Item</div>
                      <div>
                        <p className="font-medium text-earthy-brown">Bhringraj Hair Oil & 1 other item</p>
                        <button className="text-sm text-gold hover:underline mt-1 font-medium">Track Order</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
