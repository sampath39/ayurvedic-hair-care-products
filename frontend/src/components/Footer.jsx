import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-ayurveda-green text-cream pt-16 pb-8 px-6 md:px-16 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-herbal-green pb-12 mb-8">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-3xl font-serif font-bold text-gold flex items-center gap-2 mb-4">
            <Leaf size={28} /> AyuRoots
          </h2>
          <p className="text-sm opacity-80 leading-relaxed">
            100% natural, chemical-free Ayurvedic hair care products formulated with ancient wisdom to bring out your true beauty.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-serif text-xl mb-4 text-gold">Quick Links</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href="/" className="hover:text-gold transition-colors">Home</a></li>
            <li><a href="/products" className="hover:text-gold transition-colors">Shop All</a></li>
            <li><a href="/about" className="hover:text-gold transition-colors">Our Story</a></li>
            <li><a href="/contact" className="hover:text-gold transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-serif text-xl mb-4 text-gold">Customer Service</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href="#" className="hover:text-gold transition-colors">Track Order</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-serif text-xl mb-4 text-gold">Newsletter</h3>
          <p className="text-sm opacity-80 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-transparent border border-herbal-green rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gold flex-grow"
            />
            <button className="bg-gold text-ayurveda-green px-6 py-2 rounded-full font-medium hover:bg-cream transition-colors">
              Subscribe
            </button>
          </div>
        </div>

      </div>
      
      <div className="text-center text-sm opacity-60">
        <p>&copy; {new Date().getFullYear()} AyuRoots. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
