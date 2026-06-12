import { useState } from 'react';
import { Package, Search, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

const ProductsView = ({ products, isLoading, handleAddProduct, handleDeleteProduct, handleUpdateProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', description: '', price: '', stock: '', images: '', category_id: 1, is_available: true
  });

  const categories = [
    { id: 1, name: 'Hair Oils' },
    { id: 2, name: 'Shampoos' },
    { id: 3, name: 'Conditioners' },
    { id: 4, name: 'Supplements' }
  ];

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const onSubmit = (e) => {
    e.preventDefault();
    handleAddProduct(newProduct);
    setShowAddForm(false);
    setNewProduct({ name: '', description: '', price: '', stock: '', images: '', category_id: 1, is_available: true });
  };

  if (isLoading) {
    return <div className="h-96 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-3xl"></div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Product Control System</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-ayurveda-green outline-none"
            />
          </div>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-ayurveda-green hover:bg-gold text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors"
          >
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      {showAddForm && (
        <form onSubmit={onSubmit} className="mb-8 bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4">Add New Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Product Name</label>
              <input type="text" required className="w-full border rounded-lg p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Category</label>
              <select className="w-full border rounded-lg p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white" value={newProduct.category_id} onChange={e => setNewProduct({...newProduct, category_id: e.target.value})}>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 mb-1">Description</label>
              <textarea required className="w-full border rounded-lg p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white" rows="2" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Price (₹)</label>
              <input type="number" required className="w-full border rounded-lg p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Stock Quantity</label>
              <input type="number" required className="w-full border rounded-lg p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 mb-1">Image URLs (comma separated)</label>
              <input type="text" className="w-full border rounded-lg p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white" value={newProduct.images} onChange={e => setNewProduct({...newProduct, images: e.target.value})} />
            </div>
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">Save Product</button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
              <th className="pb-4 font-medium pl-4">Product Info</th>
              <th className="pb-4 font-medium">Category</th>
              <th className="pb-4 font-medium">Price</th>
              <th className="pb-4 font-medium">Stock</th>
              <th className="pb-4 font-medium text-right pr-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600 dark:text-gray-300">
            {filteredProducts.length === 0 ? (
              <tr><td colSpan="5" className="py-8 text-center text-gray-400">No products found</td></tr>
            ) : (
              filteredProducts.map(prod => (
                <tr key={prod.id} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group">
                  <td className="py-4 pl-4 flex items-center gap-3">
                    {prod.images && prod.images[0] ? (
                      <img src={prod.images[0]} alt={prod.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center"><Package size={20} className="text-gray-400" /></div>
                    )}
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">{prod.name}</div>
                      <div className="text-xs text-gray-400 truncate w-48">{prod.description}</div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-medium">{categories.find(c => c.id === prod.category_id)?.name || 'Misc'}</span>
                  </td>
                  <td className="py-4 font-bold text-ayurveda-green dark:text-green-400">₹{prod.price}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${prod.stock > 10 ? 'bg-green-100 text-green-700' : prod.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {prod.stock} Units
                      </span>
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><Edit size={16} /></button>
                      <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsView;
