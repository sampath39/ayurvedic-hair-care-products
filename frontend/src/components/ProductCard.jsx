import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="glass-card overflow-hidden group">
      <div className="relative h-64 overflow-hidden bg-white/50">
        {/* Placeholder for real image */}
        <div className="absolute inset-0 flex items-center justify-center text-ayurveda-green opacity-30 font-serif text-xl">
          {product.name}
        </div>
        {product.discount_price && (
          <div className="absolute top-4 left-4 bg-gold text-white text-xs font-bold px-3 py-1 rounded-full">
            SALE
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-serif text-ayurveda-green mb-2">{product.name}</h3>
        <p className="text-earthy-brown text-sm opacity-80 mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            {product.discount_price ? (
              <>
                <span className="text-lg font-bold text-ayurveda-green">₹{product.discount_price}</span>
                <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-ayurveda-green">₹{product.price}</span>
            )}
          </div>
          <button 
            onClick={handleAddToCart}
            className="btn-primary py-2 px-4 text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
