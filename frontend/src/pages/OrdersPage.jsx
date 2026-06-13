import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const OrdersPage = () => {
  const { currentUser } = useSelector(state => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${API_URL}/api/orders/myorders`, {
          headers: {
            'Authorization': `Bearer ${currentUser.access_token}` // Assuming access token is stored here, or fetch from supabase session
          }
        });
        const data = await response.json();
        if (response.ok) {
          setOrders(data);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-cream pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-ayurveda-green mb-10 text-center">Order History</h1>
        
        {loading ? (
          <div className="text-center text-earthy-brown">Loading your orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-herbal-green/20 p-12">
            <h2 className="text-2xl font-serif text-ayurveda-green mb-4">No Orders Yet</h2>
            <p className="text-earthy-brown opacity-80">You haven't placed any orders with us yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order.id} className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-xl transition-shadow border border-herbal-green/20 overflow-hidden">
                {/* Header Strip */}
                <div className="bg-cream/50 px-8 py-5 border-b border-herbal-green/10 flex flex-wrap justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-earthy-brown opacity-60 uppercase tracking-widest mb-1">Order #{order.id.split('-')[0]}</p>
                    <p className="text-lg font-medium text-ayurveda-green">{new Date(order.created_at).toLocaleString()}</p>
                  </div>
                  <div className="text-right mt-4 md:mt-0 flex flex-col items-end">
                    <p className="text-2xl font-bold text-gold mb-2">₹{order.total_amount}</p>
                    <span className={`inline-flex px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                      order.order_status === 'Delivered' ? 'bg-green-100 text-green-700 border border-green-200' : 
                      order.order_status === 'Processing' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 
                      order.order_status === 'Cancelled' ? 'bg-red-100 text-red-700 border border-red-200' : 
                      'bg-amber-100 text-amber-700 border border-amber-200'
                    }`}>
                      • {order.order_status}
                    </span>
                  </div>
                </div>
                
                {/* Order Details Body */}
                <div className="p-8">
                  <div className="space-y-5 mb-8">
                    {order.order_items && order.order_items.length > 0 ? (
                      order.order_items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center group">
                          <div className="flex gap-5 items-center">
                            <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center overflow-hidden border border-herbal-green/20 shadow-sm group-hover:scale-105 transition-transform">
                              {item.products && item.products.images && item.products.images[0] ? (
                                <img src={item.products.images[0]} alt={item.products.name} className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-2xl">🌿</span>
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-ayurveda-green text-lg">
                                {item.products ? item.products.name : 'Ayurvedic Product'} 
                              </p>
                              <p className="text-sm font-medium text-earthy-brown opacity-70">Quantity: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-bold text-earthy-brown text-lg">₹{item.price}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-earthy-brown italic">No items found for this order.</p>
                    )}
                  </div>
                  
                  {/* Footer Meta */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-herbal-green/10">
                    <div className="bg-cream/30 p-4 rounded-2xl border border-herbal-green/10">
                      <p className="text-xs uppercase font-bold text-earthy-brown opacity-60 mb-2">Shipping Details</p>
                      <p className="font-medium text-ayurveda-green text-sm">{order.shipping_address?.fullName || 'N/A'}</p>
                      <p className="text-earthy-brown text-sm mt-1">{order.shipping_address?.address}, {order.shipping_address?.city}</p>
                    </div>
                    <div className="bg-cream/30 p-4 rounded-2xl border border-herbal-green/10">
                      <p className="text-xs uppercase font-bold text-earthy-brown opacity-60 mb-2">Payment Info</p>
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-ayurveda-green text-sm">Method: <span className="font-bold text-gold">{order.payment_method}</span></p>
                        <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                          order.payment_status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {order.payment_status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
