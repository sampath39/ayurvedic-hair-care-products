import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from './config/supabase';
import { setUserSuccess } from './store/slices/userSlice';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function App() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && session.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          dispatch(setUserSuccess({ 
            ...session.user, 
            profile, 
            access_token: session.access_token 
          }));
        }
      } catch (err) {
        console.error("Auth verification failed", err);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkUser();
  }, [dispatch]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-ayurveda-green"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
          <Toaster position="top-right" />
          <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  </ThemeProvider>
  );
}

export default App;
