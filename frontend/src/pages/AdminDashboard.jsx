import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { supabase } from '../config/supabase';
import { motion, AnimatePresence } from 'framer-motion';

import AdminSidebar from '../components/admin/AdminSidebar';
import DashboardOverview from '../components/admin/DashboardOverview';
import AnalyticsView from '../components/admin/AnalyticsView';
import OrdersView from '../components/admin/OrdersView';
import ProductsView from '../components/admin/ProductsView';
import CustomersView from '../components/admin/CustomersView';

const AdminDashboard = () => {
  const { currentUser } = useSelector(state => state.user);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Modals
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Audio ref for notification
  const audioRef = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'));

  useEffect(() => {
    fetchData();

    // Supabase Real-time Subscription for Orders
    const orderSubscription = supabase
      .channel('public:orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, payload => {
        if (payload.eventType === 'INSERT') {
          toast.success(`New Order Received! #${payload.new.id.split('-')[0].toUpperCase()}`, { duration: 5000, icon: '🛎️' });
          audioRef.current.play().catch(e => console.log('Audio play failed:', e));
          fetchData(); // Refresh data
        } else if (payload.eventType === 'UPDATE') {
          setOrders(currentOrders => currentOrders.map(o => o.id === payload.new.id ? { ...o, ...payload.new } : o));
          if (activeTab === 'dashboard' || activeTab === 'analytics') {
            fetchData(); // Re-fetch analytics silently
          }
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(orderSubscription);
    };
  }, [activeTab, currentUser]);

  const fetchData = async () => {
    if (!currentUser || !currentUser.access_token) return;
    setIsLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      if (['dashboard', 'analytics'].includes(activeTab)) {
        const res = await fetch(`${API_URL}/api/orders/analytics`, { headers: { 'Authorization': `Bearer ${currentUser.access_token}` } });
        if (res.ok) setAnalytics(await res.json());
      }
      if (['orders', 'dashboard', 'analytics'].includes(activeTab)) {
        const res = await fetch(`${API_URL}/api/orders`, { headers: { 'Authorization': `Bearer ${currentUser.access_token}` } });
        if (res.ok) setOrders(await res.json());
      }
      if (activeTab === 'products') {
        const res = await fetch(`${API_URL}/api/products`);
        if (res.ok) setProducts(await res.json());
      }
      if (activeTab === 'customers') {
        const res = await fetch(`${API_URL}/api/users`, { headers: { 'Authorization': `Bearer ${currentUser.access_token}` } });
        if (res.ok) setCustomers(await res.json());
      }
    } catch (err) {
      toast.error('Failed to sync realtime data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    const loadingToast = toast.loading('Updating workflow...');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentUser.access_token}` },
        body: JSON.stringify({ order_status: newStatus })
      });
      if (res.ok) {
        setOrders(orders.map(o => o.id === orderId ? { ...o, order_status: newStatus } : o));
        toast.success(`Workflow advanced to: ${newStatus}`, { id: loadingToast });
      } else throw new Error('Failed');
    } catch (err) {
      toast.error('Error updating workflow', { id: loadingToast });
    }
  };

  const handleSendOtp = async (mobile) => {
    const loadingToast = toast.loading('Broadcasting OTP via SMS Network...');
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    try {
      const res = await fetch(`${API_URL}/api/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentUser.access_token}` },
        body: JSON.stringify({ mobile })
      });
      if (res.ok) {
        toast.success('OTP Broadcasted Successfully', { id: loadingToast });
      } else throw new Error('Failed');
    } catch (err) {
      toast.error('OTP Broadcast Failed', { id: loadingToast });
    }
  };

  const handleAddProduct = async (newProduct) => {
    const loadingToast = toast.loading('Adding Product...');
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    try {
      const payload = {
        ...newProduct,
        images: newProduct.images ? newProduct.images.split(',').map(url => url.trim()) : [],
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        category_id: Number(newProduct.category_id)
      };
      const res = await fetch(`${API_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentUser.access_token}` },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const addedProduct = await res.json();
        setProducts([...products, addedProduct]);
        toast.success('Product Added Successfully', { id: loadingToast });
      } else throw new Error('Failed');
    } catch (err) {
      toast.error('Error adding product', { id: loadingToast });
    }
  };

  const handleDeleteProduct = async (productId) => {
    const loadingToast = toast.loading('Deleting Product...');
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    try {
      const res = await fetch(`${API_URL}/api/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${currentUser.access_token}` }
      });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== productId));
        toast.success('Product Deleted', { id: loadingToast });
      } else throw new Error('Failed');
    } catch (err) {
      toast.error('Error deleting product', { id: loadingToast });
    }
  };

  if (!currentUser) return <Navigate to="/login" />;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardOverview analytics={analytics} isLoading={isLoading} />;
      case 'analytics': return <AnalyticsView orders={orders} isLoading={isLoading} />;
      case 'orders': return <OrdersView orders={orders} isLoading={isLoading} handleUpdateOrderStatus={handleUpdateOrderStatus} handleSendOtp={handleSendOtp} setSelectedOrder={setSelectedOrder} setShowDeliveryModal={setShowDeliveryModal} setShowOtpModal={setShowOtpModal} />;
      case 'products': return <ProductsView products={products} isLoading={isLoading} handleAddProduct={handleAddProduct} handleDeleteProduct={handleDeleteProduct} handleUpdateProduct={() => {}} />;
      case 'customers': return <CustomersView customers={customers} isLoading={isLoading} />;
      case 'payments':
      case 'delivery':
      case 'notifications':
      case 'settings':
        return <div className="p-12 text-center text-gray-400 dark:text-gray-500 font-medium">Module in active development for production phase 4.</div>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 pt-28 pb-20 px-4 md:px-8 font-sans transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row gap-6">
        
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex-1 w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
