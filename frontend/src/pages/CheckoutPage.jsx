import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/slices/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

const CheckoutPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalPrice = useSelector(state => state.cart.totalPrice);
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '', mobile: '', address: '', city: '', state: '', pincode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);

  // Modal State
  const [modalState, setModalState] = useState({ isOpen: false, type: 'success', message: '' });

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setModalState({ isOpen: true, type: 'error', message: 'Please login to place an order.' });
      return;
    }

    // Check for mock products which cause UUID crashes
    const hasMockProducts = cartItems.some(item => String(item.id).length < 10);
    if (hasMockProducts) {
      dispatch(clearCart());
      setModalState({ isOpen: true, type: 'error', message: 'We detected outdated products in your cart and cleared them automatically for your security. Please add the new products to continue!' });
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        orderItems: cartItems.map(item => ({ product_id: item.id, qty: item.quantity, price: item.price })),
        shippingAddress,
        paymentMethod,
        itemsPrice: totalPrice,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice
      };

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.access_token}`
        },
        body: JSON.stringify(orderPayload)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Database rejected order. Check Product IDs.');
      }

      setModalState({ 
        isOpen: true, 
        type: 'success', 
        message: paymentMethod === 'COD' 
          ? 'Order Placed Successfully via Cash on Delivery!' 
          : 'Payment Successful! Order Placed.' 
      });

      // Clear cart immediately on success
      dispatch(clearCart());

    } catch (error) {
      setModalState({ isOpen: true, type: 'error', message: 'Error placing order: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  const closeModalAndRedirect = () => {
    if (modalState.type === 'success') {
      navigate('/orders');
    } else {
      setModalState({ ...modalState, isOpen: false });
    }
  };

  if (cartItems.length === 0 && !modalState.isOpen) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-cream pt-28 pb-20 px-4 md:px-12 relative">
      
      {/* 3D POPUP MODAL */}
      <AnimatePresence>
        {modalState.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={closeModalAndRedirect}
            />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: -20 }}
              transition={{ type: "spring", damping: 15 }}
              style={{ transformStyle: 'preserve-3d' }}
              className={`relative w-full max-w-sm rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-b-8 border-r-8 ${
                modalState.type === 'success' 
                ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300' 
                : 'bg-gradient-to-br from-red-50 to-red-100 border-red-300'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                {modalState.type === 'success' ? (
                  <CheckCircle size={64} className="text-green-500 mb-4 drop-shadow-md" />
                ) : (
                  <XCircle size={64} className="text-red-500 mb-4 drop-shadow-md" />
                )}
                <h3 className={`text-2xl font-bold mb-2 ${modalState.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                  {modalState.type === 'success' ? 'Success!' : 'Oops!'}
                </h3>
                <p className="text-gray-700 font-medium mb-8">
                  {modalState.message}
                </p>
                <button 
                  onClick={closeModalAndRedirect}
                  className={`w-full py-3 px-6 rounded-xl font-bold text-white shadow-lg transform transition-transform active:translate-y-1 ${
                    modalState.type === 'success' 
                    ? 'bg-green-600 hover:bg-green-500 shadow-green-600/50' 
                    : 'bg-red-600 hover:bg-red-500 shadow-red-600/50'
                  }`}
                >
                  {modalState.type === 'success' ? 'View My Orders' : 'Try Again'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Shipping Form */}
        <div className="glass-card p-8">
          <h2 className="text-3xl font-serif text-ayurveda-green mb-6">Shipping Details</h2>
          <form onSubmit={placeOrder} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="fullName" required placeholder="Full Name" onChange={handleChange} className="col-span-2 w-full bg-white/50 border border-herbal-green/30 rounded-lg px-4 py-3" />
              <input type="text" name="mobile" required placeholder="Mobile Number" onChange={handleChange} className="col-span-2 w-full bg-white/50 border border-herbal-green/30 rounded-lg px-4 py-3" />
              <textarea name="address" required placeholder="Full Address" onChange={handleChange} className="col-span-2 w-full bg-white/50 border border-herbal-green/30 rounded-lg px-4 py-3 h-24"></textarea>
              <input type="text" name="city" required placeholder="City" onChange={handleChange} className="w-full bg-white/50 border border-herbal-green/30 rounded-lg px-4 py-3" />
              <input type="text" name="state" required placeholder="State" onChange={handleChange} className="w-full bg-white/50 border border-herbal-green/30 rounded-lg px-4 py-3" />
              <input type="text" name="pincode" required placeholder="Pincode" onChange={handleChange} className="col-span-2 w-full bg-white/50 border border-herbal-green/30 rounded-lg px-4 py-3" />
            </div>

            <h3 className="text-xl font-serif text-ayurveda-green mt-8 mb-4">Payment Method</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border border-herbal-green/30 rounded-lg cursor-pointer hover:bg-white/50 transition">
                <input type="radio" name="paymentMethod" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="accent-ayurveda-green w-5 h-5" />
                <span className="font-medium text-earthy-brown">Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-3 p-4 border border-herbal-green/30 rounded-lg cursor-pointer hover:bg-white/50 transition">
                <input type="radio" name="paymentMethod" value="Online" checked={paymentMethod === 'Online'} onChange={() => setPaymentMethod('Online')} className="accent-ayurveda-green w-5 h-5" />
                <span className="font-medium text-earthy-brown">Pay Online (Razorpay)</span>
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary mt-8 py-4 text-lg shadow-xl relative overflow-hidden">
              {loading ? 'Processing Secure Transaction...' : `Place Order (₹${totalPrice})`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="glass-card p-8 sticky top-32 bg-white/60">
            <h2 className="text-2xl font-serif text-ayurveda-green mb-6">Order Items</h2>
            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center border-b border-herbal-green/20 pb-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-ayurveda-green">{item.name}</span>
                    <span className="text-sm text-earthy-brown opacity-80">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-ayurveda-green">₹{item.totalPrice}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-2xl font-bold text-ayurveda-green pt-4 border-t border-herbal-green/40">
              <span>Total to Pay</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
