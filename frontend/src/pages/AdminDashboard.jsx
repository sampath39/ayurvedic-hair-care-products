import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { currentUser } = useSelector(state => state.user);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'add-product', 'inventory', 'customers'
  
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [analytics, setAnalytics] = useState({ totalSales: 0, totalOrders: 0, customers: 0, products: 0 });
  
  const [newProduct, setNewProduct] = useState({
    name: '', description: '', price: '', stock: '', images: '', category_id: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser || !currentUser.access_token) return;
      try {
        // Fetch Analytics
        if (analytics.totalSales === 0) {
          const analyticsRes = await fetch('http://localhost:5000/api/orders/analytics', {
            headers: { 'Authorization': `Bearer ${currentUser.access_token}` }
          });
          if (analyticsRes.ok) setAnalytics(await analyticsRes.json());
        }

        // Fetch Orders
        if (activeTab === 'orders' && orders.length === 0) {
          const ordersRes = await fetch('http://localhost:5000/api/orders', {
            headers: { 'Authorization': `Bearer ${currentUser.access_token}` }
          });
          if (ordersRes.ok) setOrders(await ordersRes.json());
        }

        // Fetch Inventory
        if (activeTab === 'inventory' && products.length === 0) {
          const prodRes = await fetch('http://localhost:5000/api/products');
          if (prodRes.ok) setProducts(await prodRes.json());
        }

        // Fetch Customers
        if (activeTab === 'customers' && customers.length === 0) {
          const custRes = await fetch('http://localhost:5000/api/users', {
            headers: { 'Authorization': `Bearer ${currentUser.access_token}` }
          });
          if (custRes.ok) setCustomers(await custRes.json());
        }

      } catch (err) {
        console.error('Error fetching admin data:', err);
      }
    };
    fetchData();
  }, [currentUser, activeTab]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.access_token}`
        },
        body: JSON.stringify({ order_status: newStatus })
      });
      if (res.ok) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, order_status: newStatus } : o));
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating status');
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newProduct,
        images: newProduct.images.split(',').map(url => url.trim())
      };
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.access_token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        alert('Product added successfully!');
        setNewProduct({ name: '', description: '', price: '', stock: '', images: '', category_id: '' });
        setProducts([]); // reset to force refetch
        setActiveTab('inventory');
      } else {
        alert('Failed to add product');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderMainContent = () => {
    if (activeTab === 'add-product') {
      return (
        <div className="md:col-span-2 glass-card p-8">
          <h3 className="font-serif text-2xl text-ayurveda-green mb-6 border-b border-herbal-green/20 pb-4">Add New Product</h3>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label className="block text-sm text-earthy-brown mb-1">Product Name</label>
              <input type="text" required className="w-full border border-herbal-green/30 rounded-lg p-3 bg-white/50 focus:outline-ayurveda-green" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm text-earthy-brown mb-1">Description</label>
              <textarea required rows="3" className="w-full border border-herbal-green/30 rounded-lg p-3 bg-white/50 focus:outline-ayurveda-green" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-earthy-brown mb-1">Price (₹)</label>
                <input type="number" required className="w-full border border-herbal-green/30 rounded-lg p-3 bg-white/50 focus:outline-ayurveda-green" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-earthy-brown mb-1">Stock</label>
                <input type="number" required className="w-full border border-herbal-green/30 rounded-lg p-3 bg-white/50 focus:outline-ayurveda-green" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="block text-sm text-earthy-brown mb-1">Image URLs (comma separated)</label>
              <input type="text" className="w-full border border-herbal-green/30 rounded-lg p-3 bg-white/50 focus:outline-ayurveda-green" value={newProduct.images} onChange={e => setNewProduct({...newProduct, images: e.target.value})} placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" />
            </div>
            <button type="submit" className="w-full bg-ayurveda-green hover:bg-gold text-white font-bold py-3 rounded-lg transition-colors mt-4">
              Add Product
            </button>
          </form>
        </div>
      );
    }

    if (activeTab === 'inventory') {
      return (
        <div className="md:col-span-2 glass-card p-8">
          <h3 className="font-serif text-2xl text-ayurveda-green mb-6 border-b border-herbal-green/20 pb-4">Inventory Status</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-earthy-brown border-b border-herbal-green/30">
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">Stock</th>
                  <th className="pb-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm text-earthy-brown">
                {products.length === 0 ? (
                  <tr><td colSpan="4" className="py-4 text-center">No products found.</td></tr>
                ) : (
                  products.map(prod => (
                    <tr key={prod.id} className="border-b border-herbal-green/10 hover:bg-white/30 transition">
                      <td className="py-4 font-medium text-ayurveda-green">{prod.name}</td>
                      <td className="py-4">₹{prod.price}</td>
                      <td className="py-4">{prod.stock}</td>
                      <td className="py-4 text-right">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${prod.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {prod.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeTab === 'customers') {
      return (
        <div className="md:col-span-2 glass-card p-8">
          <h3 className="font-serif text-2xl text-ayurveda-green mb-6 border-b border-herbal-green/20 pb-4">Customers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-earthy-brown border-b border-herbal-green/30">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Mobile</th>
                  <th className="pb-3 font-medium">Role</th>
                  <th className="pb-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="text-sm text-earthy-brown">
                {customers.length === 0 ? (
                  <tr><td colSpan="4" className="py-4 text-center">No customers found.</td></tr>
                ) : (
                  customers.map(cust => (
                    <tr key={cust.id} className="border-b border-herbal-green/10 hover:bg-white/30 transition">
                      <td className="py-4 font-medium text-ayurveda-green">{cust.full_name || 'N/A'}</td>
                      <td className="py-4">{cust.mobile || 'N/A'}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${cust.role === 'admin' ? 'bg-gold/20 text-gold' : 'bg-blue-100 text-blue-800'}`}>
                          {cust.role}
                        </span>
                      </td>
                      <td className="py-4">{new Date(cust.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // Default to Orders
    return (
      <div className="md:col-span-2 glass-card p-8">
        <h3 className="font-serif text-2xl text-ayurveda-green mb-6 border-b border-herbal-green/20 pb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-earthy-brown border-b border-herbal-green/30">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-earthy-brown">
              {orders.length === 0 ? (
                <tr><td colSpan="5" className="py-4 text-center">No orders yet.</td></tr>
              ) : (
                orders.map(order => (
                  <tr key={order.id} className="border-b border-herbal-green/10 hover:bg-white/30 transition">
                    <td className="py-4">#ORD-{order.id.split('-')[0]}</td>
                    <td className="py-4">{order.profiles?.full_name || 'Customer'}</td>
                    <td className="py-4">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="py-4 font-bold text-ayurveda-green">₹{order.total_amount}</td>
                    <td className="py-4 text-right">
                      <select 
                        value={order.order_status} 
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        className={`text-sm border rounded p-1 font-bold ${
                          order.order_status === 'Delivered' ? 'border-green-200 text-green-700 bg-green-50' :
                          order.order_status === 'Processing' ? 'border-blue-200 text-blue-700 bg-blue-50' :
                          'border-yellow-200 text-yellow-700 bg-yellow-50'
                        } focus:outline-none`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Completed">Completed</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (!currentUser) return <Navigate to="/login" />;

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
            <p className="text-3xl font-serif text-ayurveda-green mt-2">₹{analytics.totalSales}</p>
          </div>
          <div className="glass-card p-6 border-t-4 border-herbal-green">
            <p className="text-earthy-brown opacity-80 text-sm">Total Orders</p>
            <p className="text-3xl font-serif text-ayurveda-green mt-2">{analytics.totalOrders}</p>
          </div>
          <div className="glass-card p-6 border-t-4 border-gold">
            <p className="text-earthy-brown opacity-80 text-sm">Customers</p>
            <p className="text-3xl font-serif text-ayurveda-green mt-2">{analytics.customers}</p>
          </div>
          <div className="glass-card p-6 border-t-4 border-herbal-green">
            <p className="text-earthy-brown opacity-80 text-sm">Products</p>
            <p className="text-3xl font-serif text-ayurveda-green mt-2">{analytics.products}</p>
          </div>

          {/* Main Area */}
          <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            <div className="glass-card p-6 h-fit sticky top-28">
              <h3 className="font-serif text-xl text-ayurveda-green mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setActiveTab('orders')} 
                  className={`w-full text-left p-3 rounded-lg transition ${activeTab === 'orders' ? 'bg-ayurveda-green text-white shadow-lg' : 'border border-ayurveda-green text-ayurveda-green hover:bg-white/50'}`}
                >Manage Orders</button>
                <button 
                  onClick={() => setActiveTab('add-product')} 
                  className={`w-full text-left p-3 rounded-lg transition ${activeTab === 'add-product' ? 'bg-ayurveda-green text-white shadow-lg' : 'border border-ayurveda-green text-ayurveda-green hover:bg-white/50'}`}
                >Add New Product</button>
                <button 
                  onClick={() => setActiveTab('inventory')} 
                  className={`w-full text-left p-3 rounded-lg transition ${activeTab === 'inventory' ? 'bg-ayurveda-green text-white shadow-lg' : 'border border-ayurveda-green text-ayurveda-green hover:bg-white/50'}`}
                >Inventory Status</button>
                <button 
                  onClick={() => setActiveTab('customers')} 
                  className={`w-full text-left p-3 rounded-lg transition ${activeTab === 'customers' ? 'bg-ayurveda-green text-white shadow-lg' : 'border border-ayurveda-green text-ayurveda-green hover:bg-white/50'}`}
                >Customers</button>
              </div>
            </div>

            {renderMainContent()}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
