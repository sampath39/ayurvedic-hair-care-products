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

const realProducts = [
  { name: 'Kesh Raksha Ayurvedic Hair Oil', description: 'A potent blend of 21 Ayurvedic herbs including Bhringraj, Amla, and Brahmi. Clinically proven to reduce hair fall and promote new hair growth. Cold-pressed in pure sesame oil.', price: 599, discount_price: 450, images: ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop'], category_id: 1, stock: 150 },
  { name: 'Shikakai & Reetha Anti-Hairfall Shampoo', description: 'A gentle, sulfate-free cleanser that uses traditional Indian herbs (Shikakai and Reetha) to naturally clean the scalp without stripping natural oils.', price: 450, discount_price: 380, images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop'], category_id: 2, stock: 200 },
  { name: 'Bringadi Intensive Hair Treatment Oil', description: 'An intensive, 100% natural hair treatment that prevents dandruff, premature graying, and hair loss. Earthy scent with a dark rich color.', price: 950, discount_price: 890, images: ['https://images.unsplash.com/photo-1615397323281-224424ddf316?q=80&w=800&auto=format&fit=crop'], category_id: 1, stock: 75 },
  { name: 'Rosemary & Hibiscus Hair Growth Serum', description: 'A lightweight, non-greasy scalp serum enriched with Rosemary essential oil and Hibiscus extract to stimulate hair follicles and improve hair density.', price: 650, discount_price: 550, images: ['https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800&auto=format&fit=crop'], category_id: 4, stock: 120 },
  { name: 'Methi & Curry Leaves Hair Mask', description: 'A deep conditioning protein mask for dry, damaged, and chemically treated hair. Fenugreek (Methi) seeds strengthen hair shafts from within.', price: 450, discount_price: 350, images: ['https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop'], category_id: 3, stock: 90 },
  { name: 'Neem Wood Wide Tooth Comb', description: '100% natural Neem wood comb. Controls static, reduces hair breakage, and naturally distributes sebum across the hair strands while preventing dandruff.', price: 300, discount_price: 250, images: ['https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop'], category_id: 4, stock: 300 },
  { name: 'Japapatti & Brahmi Hair Cleanser', description: 'An Ayurvedic daily wash for thinning hair. Infused with Japapatti (Hibiscus) to rejuvenate the scalp and restore natural volume.', price: 550, discount_price: 420, images: ['https://images.unsplash.com/photo-1615397323281-224424ddf316?q=80&w=800&auto=format&fit=crop'], category_id: 2, stock: 110 },
  { name: 'Onion Black Seed Hair Oil', description: 'Powered by Red Onion extract and Black Seed oil. Formulated to tame frizz, repair damage, and provide a brilliant shine to dull hair.', price: 599, discount_price: 499, images: ['https://images.unsplash.com/photo-1556228720-192a6af4e915?q=80&w=800&auto=format&fit=crop'], category_id: 1, stock: 250 }
];

async function seedRealProducts() {
  try {
    console.log("Wiping existing products...");
    // Attempt to delete all existing products to clear the demo data
    const deleteRes = await fetch(`${supabaseUrl}/rest/v1/products?id=gt.0`, {
      method: 'DELETE',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    if (!deleteRes.ok) {
      console.log("Warning: Could not delete all products (maybe due to existing orders/foreign key constraints). We will just add the new ones!");
    } else {
      console.log("Deleted old demo products.");
    }

    console.log("Inserting real Ayurvedic products...");
    const res = await fetch(`${supabaseUrl}/rest/v1/products`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(realProducts)
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error inserting real products:", res.status, errorText);
    } else {
      console.log(`Successfully seeded ${realProducts.length} REAL Ayurvedic products!`);
    }
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

seedRealProducts();
