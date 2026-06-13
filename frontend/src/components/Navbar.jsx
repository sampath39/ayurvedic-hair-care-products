import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-cream/95 backdrop-blur-md shadow-sm border-b border-herbal-green/20 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center gap-4">
        <Menu className="md:hidden text-ayurveda-green cursor-pointer" size={26} />
        <Link to="/" className="text-3xl font-serif font-bold text-ayurveda-green flex items-center tracking-wide">
          <span className="text-gold mr-1">Ayu</span>Roots
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-10 text-ayurveda-green font-medium tracking-wide">
        <Link to="/" className="hover:text-gold transition-colors">Home</Link>
        <Link to="/products" className="hover:text-gold transition-colors">Products</Link>
        <Link to="/about" className="hover:text-gold transition-colors">Our Story</Link>
        <Link to="/contact" className="hover:text-gold transition-colors">Contact</Link>
        <Link to="/orders" className="hover:text-gold transition-colors">Orders</Link>
      </div>

      <div className="flex items-center gap-6">
        <button className="hidden md:block text-ayurveda-green hover:text-gold transition-colors">
          <Search size={22} />
        </button>
        <Link to="/profile" className="text-ayurveda-green hover:text-gold transition-colors">
          <User size={22} />
        </Link>
        <Link to="/cart" className="relative text-ayurveda-green hover:text-gold transition-colors">
          <ShoppingCart size={22} />
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-gold text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
              {totalQuantity}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
