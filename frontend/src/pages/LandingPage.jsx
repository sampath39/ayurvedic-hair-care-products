import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="relative w-full overflow-hidden bg-cream pt-28">
      {/* Decorative Particles */}
      <div className="particle w-32 h-32 top-20 left-10 opacity-20"></div>
      <div className="particle w-48 h-48 top-60 right-20 opacity-10 bg-gold"></div>
      
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center min-h-[80vh]">
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 z-10"
        >
          <span className="text-sandalwood font-medium tracking-widest uppercase text-sm mb-4 block">
            100% Natural & Chemical Free
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-ayurveda-green leading-tight mb-6">
            Revive Your Hair with <span className="text-gold italic">Nature's Essence</span>
          </h1>
          <p className="text-lg text-earthy-brown mb-8 max-w-md opacity-80">
            Experience the luxury of ancient Ayurvedic wisdom. Infused with pure herbs and botanical oils for naturally radiant, strong hair.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary">Shop Collection</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="md:w-1/2 relative mt-16 md:mt-0"
        >
          {/* Main Hero Image Placeholder - using a luxurious color block or shape for now */}
          <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/50">
            <div className="absolute inset-0 bg-gradient-to-tr from-ayurveda-green via-herbal-green to-gold opacity-90 mix-blend-multiply"></div>
            {/* The user can upload a real image here later, adding a fallback visual */}
            <div className="absolute inset-0 flex items-center justify-center text-cream/30 text-2xl font-serif">
               Product Visual
            </div>
          </div>
          
          {/* Floating Element */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -bottom-8 -left-8 glass-card p-4 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-ayurveda-green font-bold">
              ★
            </div>
            <div>
              <p className="text-sm font-bold text-ayurveda-green">4.9/5 Rating</p>
              <p className="text-xs text-earthy-brown">10k+ Happy Customers</p>
            </div>
          </motion.div>
        </motion.div>

      </section>

      {/* Benefits Section Placeholder */}
      <section className="bg-ayurveda-green text-cream py-20 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif mb-12 text-gold">The AyuRoots Promise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <h3 className="text-xl font-serif mb-4">Pure Ingredients</h3>
              <p className="opacity-80">Sourced directly from the lush valleys of the Himalayas.</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-serif mb-4">Cruelty Free</h3>
              <p className="opacity-80">Never tested on animals. 100% vegan formulations.</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-serif mb-4">Proven Results</h3>
              <p className="opacity-80">Visible hair growth and strength in just 4 weeks.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
