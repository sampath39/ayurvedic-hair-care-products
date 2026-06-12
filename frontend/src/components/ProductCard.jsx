import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-herbal-green/20 rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
      <div className="relative h-72 overflow-hidden bg-cream">
        <img 
          src={product.images && product.images.length > 0 ? product.images[0] : "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600&auto=format&fit=crop"} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.discount_price && (
          <div className="absolute top-4 left-4 bg-gold/90 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg tracking-wider">
            SALE
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-serif text-ayurveda-green mb-2">{product.name}</h3>
        <p className="text-earthy-brown text-sm opacity-80 mb-4 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-6">
          <div className="flex flex-col">
            {product.discount_price ? (
              <>
                <span className="text-xl font-bold text-ayurveda-green">₹{product.discount_price}</span>
                <span className="text-sm text-gray-400 line-through">₹{product.price}</span>
              </>
            ) : (
              <span className="text-xl font-bold text-ayurveda-green">₹{product.price}</span>
            )}
          </div>
          <button 
            onClick={handleAddToCart}
            className="bg-ayurveda-green text-white hover:bg-gold px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 shadow-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
