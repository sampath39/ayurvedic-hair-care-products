import { useState } from 'react';
import ProductCard from '../components/ProductCard';

// Mock data with realistic Unsplash images for Ayurvedic products
export const mockProducts = [
  { id: '1', name: 'Bhringraj Hair Oil', description: 'Ancient formulation for hair growth and stopping hair fall. Pure and natural cold-pressed oil.', price: 599, discount_price: 499, images: ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop'] },
  { id: '2', name: 'Amla & Shikakai Cleanser', description: 'Gentle sulfate-free cleanser that strengthens roots and adds incredible shine.', price: 450, discount_price: null, images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop'] },
  { id: '3', name: 'Neem Scalp Serum', description: 'Treats dandruff and itchy scalp with the power of Neem, Tea Tree, and Aloe Vera.', price: 899, discount_price: 750, images: ['https://images.unsplash.com/photo-1615397323281-224424ddf316?q=80&w=800&auto=format&fit=crop'] },
  { id: '4', name: 'Hibiscus Hair Mask', description: 'Deep conditioning treatment for dry, frizzy, and damaged hair. Restores moisture instantly.', price: 650, discount_price: 599, images: ['https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop'] },
  { id: '5', name: 'Sandalwood Hair Mist', description: 'Aromatic mist that hydrates the scalp and leaves hair smelling divine all day long.', price: 399, discount_price: null, images: ['https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800&auto=format&fit=crop'] },
  { id: '6', name: 'Brahmi Brain Tonic Oil', description: 'Cooling massage oil that relieves stress, promotes sound sleep, and deeply nourishes hair follicles.', price: 750, discount_price: 600, images: ['https://images.unsplash.com/photo-1556228720-192a6af4e915?q=80&w=800&auto=format&fit=crop'] },
];

const ProductsPage = () => {
  const [products, setProducts] = useState(mockProducts);
  const [filter, setFilter] = useState('all');

  return (
    <div className="bg-cream min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif text-ayurveda-green mb-6">Our Luxury Collection</h1>
          <p className="text-earthy-brown opacity-80 max-w-2xl mx-auto text-lg">
            Discover our range of 100% natural, Ayurvedic formulations crafted to perfection for your hair's ultimate health and beauty.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button className={`px-8 py-2.5 rounded-full border border-ayurveda-green transition-all duration-300 font-medium ${filter === 'all' ? 'bg-ayurveda-green text-cream shadow-lg' : 'text-ayurveda-green hover:bg-ayurveda-green hover:text-cream'}`} onClick={() => setFilter('all')}>All Products</button>
          <button className={`px-8 py-2.5 rounded-full border border-ayurveda-green transition-all duration-300 font-medium ${filter === 'oils' ? 'bg-ayurveda-green text-cream shadow-lg' : 'text-ayurveda-green hover:bg-ayurveda-green hover:text-cream'}`} onClick={() => setFilter('oils')}>Hair Oils</button>
          <button className={`px-8 py-2.5 rounded-full border border-ayurveda-green transition-all duration-300 font-medium ${filter === 'shampoos' ? 'bg-ayurveda-green text-cream shadow-lg' : 'text-ayurveda-green hover:bg-ayurveda-green hover:text-cream'}`} onClick={() => setFilter('shampoos')}>Cleansers</button>
          <button className={`px-8 py-2.5 rounded-full border border-ayurveda-green transition-all duration-300 font-medium ${filter === 'masks' ? 'bg-ayurveda-green text-cream shadow-lg' : 'text-ayurveda-green hover:bg-ayurveda-green hover:text-cream'}`} onClick={() => setFilter('masks')}>Treatments</button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductsPage;
