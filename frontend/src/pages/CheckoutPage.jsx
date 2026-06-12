import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/slices/cartSlice';

const CheckoutPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalPrice = useSelector(state => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '', mobile: '', address: '', city: '', state: '', pincode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (paymentMethod === 'COD') {
        // Mocking API call
        setTimeout(() => {
          alert('Order Placed Successfully via Cash on Delivery!');
          dispatch(clearCart());
          navigate('/');
        }, 1500);
      } else {
        // Placeholder for Razorpay Integration logic
        alert('Initiating Razorpay payment...');
        setTimeout(() => {
          alert('Payment Successful! Order Placed.');
          dispatch(clearCart());
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      alert('Error placing order');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-cream pt-28 pb-20 px-4 md:px-12">
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

            <button type="submit" disabled={loading} className="w-full btn-primary mt-8 py-4 text-lg shadow-xl">
              {loading ? 'Processing...' : `Place Order (₹${totalPrice})`}
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
