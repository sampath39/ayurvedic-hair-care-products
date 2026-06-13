import { Users, Search, Mail, Phone, Calendar } from 'lucide-react';
import { useState } from 'react';

const CustomersView = ({ customers, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) {
    return <div className="h-96 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-3xl"></div>;
  }

  const filteredCustomers = customers.filter(c => 
    (c.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.mobile || '').includes(searchTerm)
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Users className="text-ayurveda-green" /> Customer Database
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search customers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-ayurveda-green outline-none w-64"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
              <th className="pb-4 font-medium pl-4">Customer Details</th>
              <th className="pb-4 font-medium">Contact</th>
              <th className="pb-4 font-medium">Role</th>
              <th className="pb-4 font-medium">Joined Date</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600 dark:text-gray-300">
            {filteredCustomers.length === 0 ? (
              <tr><td colSpan="4" className="py-8 text-center text-gray-400">No customers found</td></tr>
            ) : (
              filteredCustomers.map(customer => (
                <tr key={customer.id} className="border-b border-gray-50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group">
                  <td className="py-4 pl-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/20 text-gold flex items-center justify-center font-bold text-lg">
                      {customer.full_name ? customer.full_name[0].toUpperCase() : 'U'}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">{customer.full_name || 'Anonymous User'}</div>
                      <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                         ID: {customer.id.split('-')[0]}...
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col gap-1">
                      {customer.mobile ? (
                        <span className="flex items-center gap-1 text-xs"><Phone size={12}/> {customer.mobile}</span>
                      ) : (
                        <span className="text-xs text-gray-400 italic">No mobile</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${customer.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {customer.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4">
                     <span className="flex items-center gap-1 text-gray-500 text-xs">
                        <Calendar size={14} />
                        {new Date(customer.created_at).toLocaleDateString()}
                     </span>
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

export default CustomersView;
