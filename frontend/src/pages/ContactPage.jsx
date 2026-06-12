import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-cream pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Contact Info */}
        <div>
          <h1 className="text-5xl font-serif text-ayurveda-green mb-6">Get in Touch</h1>
          <p className="text-earthy-brown opacity-80 mb-12 text-lg">
            Have questions about our Ayurvedic formulations? Our experts are here to help you find the perfect routine for your hair type.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-ayurveda-green shadow-md shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-serif text-xl text-ayurveda-green mb-1">Email Us</h3>
                <p className="text-earthy-brown opacity-80">smapath777yt@gmail.com</p>
                <p className="text-sm text-earthy-brown opacity-60 mt-1">We aim to respond within 24 hours.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-ayurveda-green shadow-md shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-serif text-xl text-ayurveda-green mb-1">Call Us</h3>
                <p className="text-earthy-brown opacity-80">+91 6304258160</p>
                <p className="text-sm text-earthy-brown opacity-60 mt-1">Mon-Fri, 9:00 AM - 6:00 PM IST</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-ayurveda-green shadow-md shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-serif text-xl text-ayurveda-green mb-1">Visit Us</h3>
                <p className="text-earthy-brown opacity-80 leading-relaxed">
                  Sampath<br />
                  Guntur, AP<br />
                  India 522001
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/60 backdrop-blur-md p-10 rounded-3xl border border-herbal-green/20 shadow-xl">
          <h2 className="text-2xl font-serif text-ayurveda-green mb-6">Send us a Message</h2>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
            <div>
              <label className="block text-sm font-medium text-ayurveda-green mb-2">Full Name</label>
              <input type="text" required className="w-full bg-white border border-herbal-green/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Jane Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ayurveda-green mb-2">Email Address</label>
              <input type="email" required className="w-full bg-white border border-herbal-green/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold" placeholder="jane@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ayurveda-green mb-2">Message</label>
              <textarea required rows="5" className="w-full bg-white border border-herbal-green/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gold" placeholder="How can we help you?"></textarea>
            </div>
            <button type="submit" className="w-full btn-primary py-4 text-lg">Send Message</button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
