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
        const response = await fetch('http://localhost:5000/api/orders/myorders', {
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
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white/80 backdrop-blur-md rounded-3xl shadow-md border border-herbal-green/20 p-8">
                <div className="flex flex-wrap justify-between items-center border-b border-herbal-green/10 pb-6 mb-6">
                  <div>
                    <p className="text-sm font-bold text-earthy-brown opacity-60 uppercase tracking-widest mb-1">Order #{order.id.split('-')[0]}</p>
                    <p className="text-lg font-medium text-ayurveda-green">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right mt-4 md:mt-0">
                    <p className="text-2xl font-bold text-gold">₹{order.total_amount}</p>
                    <span className={`inline-block px-4 py-1.5 mt-2 rounded-full text-xs font-bold uppercase tracking-wider ${
                      order.order_status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                      order.order_status === 'Processing' ? 'bg-blue-100 text-blue-700' : 
                      'bg-gold/20 text-gold'
                    }`}>
                      {order.order_status}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Since order_items are relational, assuming the backend populates them, otherwise generic fallback */}
                  {order.order_items && order.order_items.length > 0 ? (
                    order.order_items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 bg-cream rounded-xl flex items-center justify-center">
                            🌿
                          </div>
                          <p className="font-medium text-ayurveda-green">
                            {item.products ? item.products.name : 'Ayurvedic Product'} 
                            <span className="text-earthy-brown opacity-60 ml-2">x{item.quantity}</span>
                          </p>
                        </div>
                        <p className="font-medium text-earthy-brown">₹{item.price}</p>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-between items-center text-ayurveda-green">
                      <p>Payment Method: {order.payment_method}</p>
                      <p>Status: {order.payment_status}</p>
                    </div>
                  )}
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
