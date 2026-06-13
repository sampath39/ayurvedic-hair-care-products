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
  
  // OTP Fields
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSendOtp = async () => {
    if (mobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setOtpLoading(true);
    setError(null);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send OTP');
      
      setOtpSent(true);
      // For testing purposes, alert the simulated OTP
      alert(`[SIMULATED SMS] Your AyuRoots verification code is: ${data.simulated_otp}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError('Please enter the OTP.');
      return;
    }
    setOtpLoading(true);
    setError(null);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, otp })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Invalid OTP');
      
      setIsMobileVerified(true);
      alert('Mobile number verified successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!isLogin && !isMobileVerified) {
      setError('You must verify your mobile number before signing up.');
      return;
    }

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
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/api/users/profile`, {
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
           const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
           await fetch(`${API_URL}/api/users/profile`, {
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
                <div className="flex gap-2">
                  <input 
                    type="tel" required value={mobile} onChange={(e) => { setMobile(e.target.value); setIsMobileVerified(false); setOtpSent(false); }}
                    disabled={isMobileVerified}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold disabled:opacity-50"
                    placeholder="+91 9876543210"
                  />
                  {!isMobileVerified && (
                    <button 
                      type="button" 
                      onClick={handleSendOtp}
                      disabled={otpLoading || mobile.length < 10}
                      className="bg-gold text-ayurveda-green font-bold px-4 rounded-xl hover:bg-cream transition-colors disabled:opacity-70 whitespace-nowrap"
                    >
                      {otpLoading ? '...' : (otpSent ? 'Resend' : 'Send OTP')}
                    </button>
                  )}
                  {isMobileVerified && (
                    <div className="bg-green-500/20 text-green-300 font-bold px-4 rounded-xl flex items-center border border-green-500/50">
                      ✓ Verified
                    </div>
                  )}
                </div>
              </div>

              {otpSent && !isMobileVerified && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <label className="block text-sm font-medium text-cream mb-1 ml-1">Enter OTP</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" value={otp} onChange={(e) => setOtp(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold tracking-widest text-center text-lg"
                      placeholder="• • • • • •"
                      maxLength={6}
                    />
                    <button 
                      type="button" 
                      onClick={handleVerifyOtp}
                      disabled={otpLoading || otp.length < 6}
                      className="bg-ayurveda-green text-white font-bold px-4 rounded-xl hover:bg-herbal-green transition-colors disabled:opacity-70"
                    >
                      Verify
                    </button>
                  </div>
                </motion.div>
              )}

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
            type="submit" disabled={loading || (!isLogin && !isMobileVerified)}
            className="w-full bg-gold hover:bg-cream text-ayurveda-green hover:text-earthy-brown font-bold text-lg py-3.5 rounded-full shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
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
