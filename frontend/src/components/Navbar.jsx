import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <nav className="fixed w-full z-50 glass-card mx-4 top-4 left-0 right-0 py-4 px-6 md:px-12 flex justify-between items-center" style={{ width: 'calc(100% - 2rem)' }}>
      <div className="flex items-center gap-4">
        <Menu className="md:hidden text-ayurveda-green cursor-pointer" size={24} />
        <Link to="/" className="text-2xl font-serif font-bold text-ayurveda-green flex items-center gap-2">
          <span className="text-gold">Ayu</span>Roots
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8 text-herbal-green font-medium">
        <Link to="/" className="hover:text-ayurveda-green transition-colors">Home</Link>
        <Link to="/products" className="hover:text-ayurveda-green transition-colors">Shop</Link>
        <Link to="/about" className="hover:text-ayurveda-green transition-colors">Our Story</Link>
        <Link to="/contact" className="hover:text-ayurveda-green transition-colors">Contact</Link>
      </div>

      <div className="flex items-center gap-6">
        <Search className="text-ayurveda-green cursor-pointer hover:text-gold transition-colors" size={20} />
        <Link to="/login">
          <User className="text-ayurveda-green hover:text-gold transition-colors" size={20} />
        </Link>
        <Link to="/cart" className="relative">
          <ShoppingCart className="text-ayurveda-green hover:text-gold transition-colors" size={20} />
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-gold text-cream text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalQuantity}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
