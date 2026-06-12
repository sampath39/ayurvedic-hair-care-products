import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
// Mock data since we aren't fetching from API just yet
const mockProducts = [
  { id: '1', name: 'Bhringraj Hair Oil', description: 'Ancient formulation for hair growth and stopping hair fall. Pure and natural.', price: 599, discount_price: 499 },
  { id: '2', name: 'Amla & Shikakai Shampoo', description: 'Gentle cleanser that strengthens roots and adds shine.', price: 450, discount_price: null },
  { id: '3', name: 'Neem Scalp Serum', description: 'Treats dandruff and itchy scalp with the power of Neem and Tea Tree.', price: 899, discount_price: 750 },
  { id: '4', name: 'Hibiscus Hair Mask', description: 'Deep conditioning treatment for dry and damaged hair.', price: 650, discount_price: 599 },
  { id: '5', name: 'Sandalwood Hair Mist', description: 'Aromatic mist that hydrates and leaves hair smelling divine.', price: 399, discount_price: null },
  { id: '6', name: 'Brahmi Brain Tonic Oil', description: 'Cooling oil that relieves stress and promotes sound sleep while nourishing hair.', price: 750, discount_price: 600 },
];

const ProductsPage = () => {
  const [products, setProducts] = useState(mockProducts);
  const [filter, setFilter] = useState('all');

  return (
    <div className="bg-cream min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-ayurveda-green mb-4">Our Luxury Collection</h1>
          <p className="text-earthy-brown opacity-80 max-w-2xl mx-auto">
            Discover our range of 100% natural, Ayurvedic formulations crafted to perfection for your hair's ultimate health and beauty.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className={`px-6 py-2 rounded-full border border-ayurveda-green transition-colors ${filter === 'all' ? 'bg-ayurveda-green text-cream' : 'text-ayurveda-green hover:bg-ayurveda-green hover:text-cream'}`} onClick={() => setFilter('all')}>All Products</button>
          <button className={`px-6 py-2 rounded-full border border-ayurveda-green transition-colors ${filter === 'oils' ? 'bg-ayurveda-green text-cream' : 'text-ayurveda-green hover:bg-ayurveda-green hover:text-cream'}`} onClick={() => setFilter('oils')}>Hair Oils</button>
          <button className={`px-6 py-2 rounded-full border border-ayurveda-green transition-colors ${filter === 'shampoos' ? 'bg-ayurveda-green text-cream' : 'text-ayurveda-green hover:bg-ayurveda-green hover:text-cream'}`} onClick={() => setFilter('shampoos')}>Cleansers</button>
          <button className={`px-6 py-2 rounded-full border border-ayurveda-green transition-colors ${filter === 'masks' ? 'bg-ayurveda-green text-cream' : 'text-ayurveda-green hover:bg-ayurveda-green hover:text-cream'}`} onClick={() => setFilter('masks')}>Treatments</button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductsPage;
