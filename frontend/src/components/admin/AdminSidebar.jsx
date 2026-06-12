import { 
  LayoutDashboard, ShoppingBag, Package, Users, 
  CreditCard, TrendingUp, Truck, Bell, Settings, LogOut, Sun, Moon
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/slices/userSlice';
import { supabase } from '../../config/supabase';

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard Overview' },
  { id: 'orders', icon: ShoppingBag, label: 'Orders' },
  { id: 'products', icon: Package, label: 'Products' },
  { id: 'customers', icon: Users, label: 'Customers' },
  { id: 'payments', icon: CreditCard, label: 'Payments' },
  { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
  { id: 'delivery', icon: Truck, label: 'Delivery Tracking' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    dispatch(logoutUser());
  };

  return (
    <div className="w-full md:w-64 shrink-0">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl sticky top-28 transition-colors duration-300">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-ayurveda-green flex items-center justify-center text-white font-serif font-bold text-xl shadow-md">
              A
            </div>
            <div>
              <h2 className="font-bold text-gray-800 dark:text-white">Admin Panel</h2>
              <p className="text-xs text-green-600 dark:text-green-400 font-medium">Production Active</p>
            </div>
          </div>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <nav className="space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${activeTab === item.id ? 'bg-ayurveda-green text-white shadow-md transform scale-105' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'}`}
            >
              <item.icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 mt-8"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
