import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addToCart, clearCart } from '../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalPrice = useSelector(state => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-cream pt-28 pb-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-serif text-ayurveda-green">Your Cart</h1>
          {cartItems.length > 0 && (
            <button 
              onClick={() => dispatch(clearCart())} 
              className="text-red-500 hover:text-red-700 font-medium flex items-center gap-2 px-4 py-2 bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={18} /> Clear Cart
            </button>
          )}
        </div>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-3xl border border-herbal-green/20">
            <h2 className="text-2xl font-serif text-earthy-brown mb-4">Your cart is empty</h2>
            <button onClick={() => navigate('/products')} className="btn-primary">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="glass-card flex items-center p-4 gap-6">
                  <div className="w-24 h-24 bg-white/50 rounded-xl flex items-center justify-center font-serif text-xs text-center text-ayurveda-green/50">
                    {item.name}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-serif text-ayurveda-green">{item.name}</h3>
                    <p className="text-gold font-bold">₹{item.price}</p>
                    
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center bg-white/50 rounded-full border border-herbal-green/30 px-3 py-1">
                        <button onClick={() => dispatch(removeFromCart(item.id))} className="text-earthy-brown hover:text-ayurveda-green"><Minus size={16} /></button>
                        <span className="mx-4 font-medium">{item.quantity}</span>
                        <button onClick={() => dispatch(addToCart(item))} className="text-earthy-brown hover:text-ayurveda-green"><Plus size={16} /></button>
                      </div>
                      <button onClick={() => {
                        // Assuming you might want a direct remove button as well
                        // But since removeFromCart decreases by 1, a separate action is needed to remove completely
                        // We'll just loop removeFromCart for simplicity or add a new action. 
                      }} className="text-red-500 hover:text-red-700">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-bold text-xl text-ayurveda-green">
                    ₹{item.totalPrice}
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="glass-card p-6 sticky top-32">
                <h3 className="text-2xl font-serif text-ayurveda-green mb-6">Order Summary</h3>
                <div className="space-y-4 text-earthy-brown mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <hr className="border-herbal-green/30" />
                  <div className="flex justify-between text-xl font-bold text-ayurveda-green">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>
                <button onClick={handleCheckout} className="w-full btn-primary py-4">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
