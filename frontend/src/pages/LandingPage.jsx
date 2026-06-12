import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Leaf, Droplet, Sparkles } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="relative w-full overflow-hidden bg-cream">
      
      {/* Immersive Hero Section - Similar to Login Page but different forest */}
      <section className="relative w-full min-h-screen flex items-center pt-20 overflow-hidden">
        
        {/* Deep Forest Background */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 15, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2000&auto=format&fit=crop" 
            alt="Mystical Forest" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ayurveda-green/50 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-black/40"></div>
        </div>

        {/* Floating Magical Dust */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: window.innerHeight, x: Math.random() * window.innerWidth }}
              animate={{ opacity: [0, 0.6, 0], y: -50, x: Math.random() * window.innerWidth }}
              transition={{ duration: 8 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
              className="absolute w-2 h-2 rounded-full bg-gold/60 blur-[1px]"
            />
          ))}
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 text-center md:text-left flex flex-col md:flex-row items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-3/5"
          >
            <span className="text-gold font-bold tracking-[0.2em] uppercase text-sm mb-6 block drop-shadow-md">
              100% Natural & Chemical Free
            </span>
            <h1 className="text-5xl md:text-8xl font-serif text-white leading-[1.1] mb-6 drop-shadow-lg">
              The Essence of <br/><span className="text-gold italic">True Nature</span>
            </h1>
            <p className="text-xl text-cream mb-10 max-w-lg opacity-90 leading-relaxed font-light drop-shadow-md mx-auto md:mx-0">
              Awaken your roots with ancient Ayurvedic wisdom. Sourced directly from the depths of the forest.
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              <Link to="/products" className="bg-gold text-ayurveda-green hover:bg-white hover:text-ayurveda-green font-bold px-10 py-4 rounded-full text-lg shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300">
                Explore the Magic
              </Link>
            </div>
          </motion.div>

          {/* Floating Glassmorphism Element */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hidden md:block md:w-2/5 relative mt-16 md:mt-0"
          >
             <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[2rem] shadow-2xl ml-auto w-80"
             >
                <div className="flex text-gold mb-4">
                  <Star fill="currentColor" size={24}/><Star fill="currentColor" size={24}/><Star fill="currentColor" size={24}/><Star fill="currentColor" size={24}/><Star fill="currentColor" size={24}/>
                </div>
                <p className="text-white font-serif text-xl italic mb-4 leading-relaxed">
                  "This oil transformed my hair completely. It feels like a walk through a magical forest every time I use it."
                </p>
                <p className="text-gold font-bold uppercase tracking-widest text-sm">— Anjali S.</p>
             </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Star Ingredients - Replaced broken URLs with solid rich CSS / Working Unsplash */}
      <section className="py-24 bg-cream relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-ayurveda-green mb-6">Born from the Earth</h2>
            <p className="text-earthy-brown opacity-80 max-w-2xl mx-auto text-lg">We only use the finest, sustainably sourced herbs and botanicals to craft our highly potent formulations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: 'Bhringraj', icon: <Leaf size={48} className="text-gold" />, desc: 'The "King of Herbs" prevents hair fall and promotes phenomenal hair growth.' },
              { name: 'Amla', icon: <Droplet size={48} className="text-gold" />, desc: 'Rich in Vitamin C, it strengthens hair follicles and prevents premature graying.' },
              { name: 'Neem', icon: <Sparkles size={48} className="text-gold" />, desc: 'Nature\'s miracle that cures dandruff, purifies the scalp, and reduces inflammation.' }
            ].map((ingredient, i) => (
              <div key={i} className="text-center group bg-white p-10 rounded-[3rem] shadow-xl border border-herbal-green/10 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-24 h-24 mx-auto rounded-full bg-ayurveda-green/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  {ingredient.icon}
                </div>
                <h3 className="text-2xl font-serif text-ayurveda-green mb-4">{ingredient.name}</h3>
                <p className="text-earthy-brown opacity-80">{ingredient.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Immersive Banner */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Working deep nature image */}
          <img src="https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?q=80&w=2000&auto=format&fit=crop" alt="Nature background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-ayurveda-green/80 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <h2 className="text-5xl md:text-7xl font-serif text-gold mb-8 drop-shadow-lg">Let Nature Heal You</h2>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 opacity-90 leading-relaxed font-light drop-shadow-md">
            Join thousands of women who have switched to 100% natural Ayurvedic hair care. 
          </p>
          <Link to="/products" className="inline-block bg-white text-ayurveda-green font-bold text-lg px-12 py-5 rounded-full hover:bg-gold hover:text-white transition-colors duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            Start Your Journey
          </Link>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
