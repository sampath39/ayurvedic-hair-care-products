import { supabase } from './config/supabase.js';

async function createAdmin() {
  console.log("Creating admin user...");
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'admin@ayuroots.com',
    password: 'AdminPassword123!',
    email_confirm: true,
    user_metadata: { full_name: 'Super Admin' }
  });
  
  if (error) {
    console.error("Error creating user:", error.message);
    return;
  }
  
  console.log("User created, ID:", data.user.id);
  
  const { error: profileError } = await supabase.from('profiles').upsert({
    id: data.user.id,
    full_name: 'Super Admin',
    mobile: '0000000000',
    role: 'admin'
  });
  
  if (profileError) {
    console.error("Error creating profile:", profileError.message);
  } else {
    console.log("Admin profile created and assigned 'admin' role successfully!");
  }
}

createAdmin();
