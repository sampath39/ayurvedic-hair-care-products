import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="relative w-full overflow-hidden bg-cream pt-28">
      {/* Decorative Particles */}
      <div className="particle w-32 h-32 top-20 left-10 opacity-20"></div>
      <div className="particle w-48 h-48 top-60 right-20 opacity-10 bg-gold"></div>
      
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center min-h-[85vh]">
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 z-10 pr-4"
        >
          <span className="text-sandalwood font-medium tracking-widest uppercase text-sm mb-6 block">
            100% Natural & Chemical Free
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-ayurveda-green leading-tight mb-6">
            Revive Your Hair with <span className="text-gold italic">Nature's Essence</span>
          </h1>
          <p className="text-lg text-earthy-brown mb-10 max-w-md opacity-80 leading-relaxed">
            Experience the luxury of ancient Ayurvedic wisdom. Infused with pure herbs and botanical oils for naturally radiant, strong, and voluminous hair.
          </p>
          
          <div className="flex flex-wrap gap-6">
            <Link to="/products" className="btn-primary px-8 py-3.5 text-lg shadow-xl shadow-ayurveda-green/20">Shop Collection</Link>
            <Link to="/about" className="btn-secondary px-8 py-3.5 text-lg">Our Story</Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="md:w-1/2 relative mt-16 md:mt-0"
        >
          {/* Main Hero Image */}
          <div className="relative w-full aspect-[4/5] md:aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src="https://images.unsplash.com/photo-1608248593842-8d76d4fb0e89?q=80&w=1000&auto=format&fit=crop" 
              alt="Ayurvedic Hair Care" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-ayurveda-green/30 to-transparent mix-blend-multiply"></div>
          </div>
          
          {/* Floating Element */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-5 flex items-center gap-5 border border-white"
          >
            <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center text-gold">
              <Star fill="currentColor" size={24} />
            </div>
            <div>
              <p className="text-lg font-bold text-ayurveda-green">4.9/5 Rating</p>
              <p className="text-sm text-earthy-brown opacity-80">10,000+ Happy Customers</p>
            </div>
          </motion.div>
        </motion.div>

      </section>

      {/* Star Ingredients Section */}
      <section className="py-24 bg-white mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-ayurveda-green mb-4">The Power of Ayurveda</h2>
            <p className="text-earthy-brown opacity-80 max-w-2xl mx-auto">We use only the finest, sustainably sourced herbs and botanicals to craft our highly potent formulations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: 'Bhringraj', desc: 'The "King of Herbs" prevents hair fall and promotes phenomenal hair growth.', img: 'https://images.unsplash.com/photo-1628157731776-e822cd0e40dd?q=80&w=600&auto=format&fit=crop' },
              { name: 'Amla', desc: 'Rich in Vitamin C, it strengthens hair follicles and prevents premature graying.', img: 'https://images.unsplash.com/photo-1596647209770-ce6dc49673de?q=80&w=600&auto=format&fit=crop' },
              { name: 'Neem', desc: 'Nature\'s antibacterial miracle that cures dandruff and cleanses the scalp.', img: 'https://images.unsplash.com/photo-1621804240751-229eeecac1ce?q=80&w=600&auto=format&fit=crop' }
            ].map((ingredient, i) => (
              <div key={i} className="text-center group">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 shadow-xl border-8 border-cream group-hover:scale-105 transition-transform duration-500">
                  <img src={ingredient.img} alt={ingredient.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-serif text-ayurveda-green mb-3">{ingredient.name}</h3>
                <p className="text-earthy-brown opacity-80 px-4">{ingredient.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Banner */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2000&auto=format&fit=crop" alt="Nature background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-ayurveda-green/90"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-serif text-gold mb-8">Transform Your Hair Today</h2>
          <p className="text-xl max-w-2xl mx-auto mb-10 opacity-90 leading-relaxed">
            Join thousands of women who have switched to 100% natural Ayurvedic hair care. Free shipping on your first order.
          </p>
          <Link to="/products" className="inline-block bg-gold text-ayurveda-green font-bold text-lg px-10 py-4 rounded-full hover:bg-cream transition-colors duration-300 shadow-xl">
            Explore the Collection
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-cream py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-16 text-ayurveda-green">The AyuRoots Promise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white/60 backdrop-blur-sm p-10 rounded-3xl border border-herbal-green/20 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-ayurveda-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🌿</span>
              </div>
              <h3 className="text-2xl font-serif mb-4 text-ayurveda-green">Pure Ingredients</h3>
              <p className="text-earthy-brown opacity-80 leading-relaxed">Sourced directly from the lush valleys of the Himalayas. Cold-pressed and unrefined.</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-10 rounded-3xl border border-herbal-green/20 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-ayurveda-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🐰</span>
              </div>
              <h3 className="text-2xl font-serif mb-4 text-ayurveda-green">Cruelty Free</h3>
              <p className="text-earthy-brown opacity-80 leading-relaxed">Never tested on animals. 100% vegan formulations honoring all living beings.</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-10 rounded-3xl border border-herbal-green/20 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-ayurveda-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-2xl font-serif mb-4 text-ayurveda-green">Proven Results</h3>
              <p className="text-earthy-brown opacity-80 leading-relaxed">Visible hair growth, reduced shedding, and immense shine in just 4 weeks of regular use.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
