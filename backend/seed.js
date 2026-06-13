import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const mockProducts = [
  { name: 'Bhringraj Hair Oil', description: 'Ancient formulation for hair growth and stopping hair fall. Pure and natural cold-pressed oil.', price: 599, discount_price: 499, images: ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop'], category_id: 1, stock: 100 },
  { name: 'Amla & Shikakai Cleanser', description: 'Gentle sulfate-free cleanser that strengthens roots and adds incredible shine.', price: 450, discount_price: null, images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop'], category_id: 2, stock: 100 },
  { name: 'Neem Scalp Serum', description: 'Treats dandruff and itchy scalp with the power of Neem, Tea Tree, and Aloe Vera.', price: 899, discount_price: 750, images: ['https://images.unsplash.com/photo-1615397323281-224424ddf316?q=80&w=800&auto=format&fit=crop'], category_id: 4, stock: 100 },
  { name: 'Hibiscus Hair Mask', description: 'Deep conditioning treatment for dry, frizzy, and damaged hair. Restores moisture instantly.', price: 650, discount_price: 599, images: ['https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop'], category_id: 3, stock: 100 },
  { name: 'Sandalwood Hair Mist', description: 'Aromatic mist that hydrates the scalp and leaves hair smelling divine all day long.', price: 399, discount_price: null, images: ['https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800&auto=format&fit=crop'], category_id: 4, stock: 100 },
  { name: 'Brahmi Brain Tonic Oil', description: 'Cooling massage oil that relieves stress, promotes sound sleep, and deeply nourishes hair follicles.', price: 750, discount_price: 600, images: ['https://images.unsplash.com/photo-1556228720-192a6af4e915?q=80&w=800&auto=format&fit=crop'], category_id: 1, stock: 100 },
];

async function seed() {
  console.log("Seeding categories...");
  try {
    const categories = [
      { id: 1, name: 'Hair Oils' },
      { id: 2, name: 'Shampoos' },
      { id: 3, name: 'Conditioners' },
      { id: 4, name: 'Supplements' }
    ];
    
    // UPSERT categories so it doesn't fail if they exist
    await fetch(`${supabaseUrl}/rest/v1/categories`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(categories)
    });

    console.log("Seeding products...");
    const res = await fetch(`${supabaseUrl}/rest/v1/products`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(mockProducts)
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error inserting products:", res.status, errorText);
    } else {
      console.log("Successfully seeded 6 products!");
    }
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

seed();
