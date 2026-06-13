import { useState } from 'react';
import { supabase } from '../config/supabase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserSuccess } from '../store/slices/userSlice';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // New Signup Fields
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        // Fetch profile to get role, use maybeSingle to prevent crashing if missing
        let { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .maybeSingle();

        // Fallback: If profile was never created during signup, create it now
        if (!profile) {
          try {
            const res = await fetch('http://localhost:5000/api/users/profile', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: data.user.id, full_name: 'Customer', mobile: '' })
            });
            if (res.ok) profile = await res.json();
          } catch (e) {
            console.error("Fallback profile creation failed", e);
          }
        }

        dispatch(setUserSuccess({ ...data.user, profile, access_token: data.session.access_token }));

        if (profile && profile.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/products');
        }
      } else {
        // Collect extra fields via metadata
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              mobile: mobile,
              address: address
            }
          }
        });
        if (error) throw error;

        // Force creation of profile row in backend so foreign keys (orders) work
        if (data.user) {
           await fetch('http://localhost:5000/api/users/profile', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({
               id: data.user.id,
               full_name: fullName,
               mobile: mobile
             })
           });
        }
        
        alert('Signup successful! You can now log in.');
        setIsLogin(true); // Switch to login view
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden pt-20 pb-10">
      
      {/* Deep Forest Background */}
      <div className="absolute inset-0 z-0 fixed">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2000&auto=format&fit=crop" 
          alt="Deep Forest" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ayurveda-green/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
        className="w-full max-w-md p-8 relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-3xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-serif text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Join AyuRoots'}
          </h2>
          <p className="text-cream opacity-80 text-sm font-light">
            {isLogin ? 'Enter the forest to access your account.' : 'Begin your natural hair journey with us.'}
          </p>
        </div>

        {error && <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-lg mb-6 text-sm">{error}</div>}

        <form onSubmit={handleAuth} className="space-y-4">
          
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-cream mb-1 ml-1">Full Name</label>
                <input 
                  type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-cream mb-1 ml-1">Mobile Number</label>
                <input 
                  type="tel" required value={mobile} onChange={(e) => setMobile(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="+91 9876543210"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-cream mb-1 ml-1">Full Address</label>
                <textarea 
                  required rows="2" value={address} onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="Street, City, State, Zip"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-cream mb-1 ml-1">Email Address</label>
            <input 
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-cream mb-1 ml-1">Password</label>
            <input 
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-gold hover:bg-cream text-ayurveda-green hover:text-earthy-brown font-bold text-lg py-3.5 rounded-full shadow-lg transition-all duration-300 disabled:opacity-70 mt-4"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-cream">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-gold font-bold hover:text-white transition-colors underline underline-offset-4">
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
