import { useState } from 'react';
import { MapPin, CheckCircle, Search, XCircle, Package, Truck, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const OrdersView = ({ orders, isLoading, handleUpdateOrderStatus, handleSendOtp, setSelectedOrder, setShowDeliveryModal, setShowOtpModal }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status) => {
    const config = {
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400',
      'Accepted': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400',
      'Preparing': 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400',
      'Out For Delivery': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400',
      'Delivered': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400',
      'Cancelled': 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400',
    };
    return `px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${config[status] || config['Pending']}`;
  };

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (o.profiles?.full_name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="h-96 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-3xl"></div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Orders Management</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search orders..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-ayurveda-green outline-none w-64"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
              <th className="pb-4 font-medium pl-4">Order Details</th>
              <th className="pb-4 font-medium">Customer</th>
              <th className="pb-4 font-medium">Items</th>
              <th className="pb-4 font-medium">Payment</th>
              <th className="pb-4 font-medium">Status</th>
              <th className="pb-4 font-medium text-right pr-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600 dark:text-gray-300">
            {filteredOrders.length === 0 ? (
              <tr><td colSpan="6" className="py-8 text-center text-gray-400">No orders found</td></tr>
            ) : (
              filteredOrders.map(order => (
                <tr key={order.id} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="py-4 pl-4">
                    <div className="font-bold text-gray-900 dark:text-white">#{order.id.split('-')[0].toUpperCase()}</div>
                    <div className="text-xs text-gray-400">{new Date(order.created_at).toLocaleString()}</div>
                    <div className="font-bold text-ayurveda-green mt-1">₹{order.total_amount}</div>
                  </td>
                  <td className="py-4">
                    <div className="font-medium text-gray-800 dark:text-white">{order.profiles?.full_name || 'Anonymous'}</div>
                    <div className="text-xs text-gray-500">{order.profiles?.mobile || 'No Mobile'}</div>
                    <div className="text-xs text-gray-400 truncate max-w-[150px]" title={JSON.stringify(order.shipping_address)}>
                      {order.shipping_address?.address || 'Address'}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-xs font-bold">
                        {order.order_items ? order.order_items.length : 0}
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="font-bold">{order.payment_method}</div>
                    <div className={`text-xs font-medium ${order.payment_status === 'Paid' || order.order_status === 'Delivered' ? 'text-green-500' : 'text-yellow-500'}`}>
                      {order.payment_method === 'COD' && order.order_status === 'Delivered' ? 'PAYMENT COMPLETED' : order.payment_method === 'COD' ? 'NOT PAID' : 'PAID'}
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={getStatusBadge(order.order_status)}>{order.order_status}</span>
                  </td>
                  <td className="py-4 pr-4 text-right">
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      {order.order_status === 'Pending' && (
                        <>
                          <button onClick={() => handleUpdateOrderStatus(order.id, 'Accepted')} className="p-1.5 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 tooltip" title="Accept"><CheckCircle size={16} /></button>
                          <button onClick={() => handleUpdateOrderStatus(order.id, 'Cancelled')} className="p-1.5 rounded bg-red-100 text-red-700 hover:bg-red-200 tooltip" title="Reject"><XCircle size={16} /></button>
                        </>
                      )}
                      {order.order_status === 'Accepted' && (
                        <button onClick={() => handleUpdateOrderStatus(order.id, 'Preparing')} className="px-2 py-1 text-xs font-bold rounded bg-orange-100 text-orange-700 hover:bg-orange-200">Start Preparing</button>
                      )}
                      {order.order_status === 'Preparing' && (
                        <button onClick={() => handleUpdateOrderStatus(order.id, 'Out For Delivery')} className="px-2 py-1 text-xs font-bold rounded bg-purple-100 text-purple-700 hover:bg-purple-200">Out For Delivery</button>
                      )}
                      {order.order_status === 'Out For Delivery' && (
                        <>
                          <button onClick={() => { setSelectedOrder(order); setShowDeliveryModal(true); }} className="p-1.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 tooltip" title="Tracking"><MapPin size={16} /></button>
                          <button onClick={() => { setSelectedOrder(order); handleSendOtp(order.profiles?.mobile); setShowOtpModal(true); }} className="px-2 py-1 text-xs font-bold rounded bg-green-100 text-green-700 hover:bg-green-200">Send OTP</button>
                        </>
                      )}
                      {order.order_status !== 'Delivered' && order.order_status !== 'Cancelled' && (
                        <button onClick={() => handleUpdateOrderStatus(order.id, 'Cancelled')} className="px-2 py-1 text-xs font-bold rounded border border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30">Cancel</button>
                      )}
                    </div>
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

export default OrdersView;
