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
        dispatch(setUserSuccess(data.user));
        navigate('/');
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('Signup successful! Please check your email to verify.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
      
      {/* Immersive Deep Forest Background */}
      <div className="absolute inset-0 z-0">
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

      {/* Floating Leaves / Magical Dust Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              y: -50, 
              x: Math.random() * window.innerWidth 
            }}
            animate={{ 
              opacity: [0, 0.5, 0], 
              y: window.innerHeight + 50, 
              x: Math.random() * window.innerWidth 
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            className="absolute w-2 h-2 rounded-full bg-gold/40 blur-[1px]"
            style={{ 
              top: '-5%', 
              left: `${Math.random() * 100}%` 
            }}
          />
        ))}
      </div>

      {/* Login Box */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, type: "spring", bounce: 0.4 }}
        className="w-full max-w-md p-10 relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-3xl"
      >
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-4xl font-serif text-white mb-2"
          >
            {isLogin ? 'Welcome Back' : 'Join AyuRoots'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-cream opacity-80 text-sm font-light"
          >
            {isLogin ? 'Enter the forest to access your account.' : 'Begin your natural hair journey with us.'}
          </motion.p>
        </div>

        {error && <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-lg mb-6 text-sm backdrop-blur-sm">{error}</div>}

        <form onSubmit={handleAuth} className="space-y-6">
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 1.1 }}
          >
            <label className="block text-sm font-medium text-cream mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold focus:bg-white/20 transition-all"
              placeholder="you@example.com"
            />
          </motion.div>
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 1.2 }}
          >
            <label className="block text-sm font-medium text-cream mb-2 ml-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold focus:bg-white/20 transition-all"
              placeholder="••••••••"
            />
          </motion.div>

          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            type="submit" 
            disabled={loading}
            className="w-full bg-gold hover:bg-cream text-ayurveda-green hover:text-earthy-brown font-bold text-lg py-4 rounded-full shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </motion.button>
        </form>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-8 text-center text-sm text-cream"
        >
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-gold font-bold hover:text-white transition-colors underline underline-offset-4"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
