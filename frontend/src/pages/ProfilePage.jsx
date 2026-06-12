import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { MapPin, User, Mail, Phone } from 'lucide-react';

const ProfilePage = () => {
  const { currentUser } = useSelector(state => state.user);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const meta = currentUser.user_metadata || {};

  return (
    <div className="min-h-screen bg-cream pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-ayurveda-green mb-10 text-center">Your Profile</h1>
        
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-herbal-green/20 p-8 md:p-12">
          
          <div className="flex flex-col items-center mb-10 pb-10 border-b border-herbal-green/10">
            <div className="w-24 h-24 bg-gold text-white rounded-full flex items-center justify-center text-4xl font-serif mb-4 shadow-lg">
              {meta.full_name ? meta.full_name[0].toUpperCase() : currentUser.email[0].toUpperCase()}
            </div>
            <h2 className="text-2xl font-bold text-ayurveda-green">{meta.full_name || 'Valued Customer'}</h2>
            <p className="text-earthy-brown opacity-80">Joined {new Date(currentUser.created_at).toLocaleDateString()}</p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-ayurveda-green/10 flex items-center justify-center text-ayurveda-green shrink-0">
                <User size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-earthy-brown opacity-60">Full Name</p>
                <p className="text-lg font-medium text-ayurveda-green">{meta.full_name || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-ayurveda-green/10 flex items-center justify-center text-ayurveda-green shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-earthy-brown opacity-60">Email Address</p>
                <p className="text-lg font-medium text-ayurveda-green">{currentUser.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-ayurveda-green/10 flex items-center justify-center text-ayurveda-green shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-earthy-brown opacity-60">Mobile Number</p>
                <p className="text-lg font-medium text-ayurveda-green">{meta.mobile || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-ayurveda-green/10 flex items-center justify-center text-ayurveda-green shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-earthy-brown opacity-60">Saved Address</p>
                <p className="text-lg font-medium text-ayurveda-green">{meta.address || 'Not provided'}</p>
              </div>
            </div>
            <div className="pt-6 border-t border-herbal-green/10 mt-6">
              <Link 
                to="/orders" 
                className="w-full flex items-center justify-center gap-2 bg-ayurveda-green hover:bg-gold text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-md"
              >
                View Order History
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
