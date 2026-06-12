const AboutPage = () => {
  return (
    <div className="min-h-screen bg-cream pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-serif text-ayurveda-green mb-8 text-center">Our Story</h1>
        
        <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl mb-16">
          <img 
            src="https://images.unsplash.com/photo-1542038520-21a1b181dbb3?q=80&w=1200&auto=format&fit=crop" 
            alt="Ayurvedic herbs" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-lg mx-auto text-earthy-brown opacity-90 leading-relaxed">
          <p className="text-xl font-medium mb-6">
            AyuRoots was born from a simple desire: to bring the ancient, proven science of Ayurveda back to modern hair care.
          </p>
          <p className="mb-6">
            For generations, Indian women have possessed the secret to long, thick, and lustrous hair. The secret wasn't complex chemical formulations cooked up in a lab, but rather the pure, potent herbs provided by nature. Amla, Bhringraj, Shikakai, and Neem have been the cornerstone of hair health for over 5,000 years.
          </p>
          <p className="mb-6">
            However, as the beauty industry evolved, these natural remedies were replaced by quick-fix chemical products that eventually strip the hair of its natural oils and vitality. We decided it was time to go back to our roots.
          </p>
          <p className="mb-6">
            Every bottle of AyuRoots is carefully crafted using cold-pressed oils and sun-dried herbs. We source our ingredients directly from organic farmers in the foothills of the Himalayas, ensuring that you receive the most potent, undiluted benefits of nature.
          </p>
          <p className="font-serif text-2xl text-ayurveda-green text-center mt-12 italic">
            "Nature never hurries, yet everything is accomplished."
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
