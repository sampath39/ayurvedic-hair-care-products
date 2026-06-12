import { supabase } from './config/supabase.js';

async function createAdmin() {
  console.log("Cleaning up old admin...");
  
  // First, find the user
  const { data: users, error: listError } = await supabase.auth.admin.listUsers();
  if (!listError) {
    const oldAdmin = users.users.find(u => u.email === 'admin@ayuroots.com');
    if (oldAdmin) {
      await supabase.auth.admin.deleteUser(oldAdmin.id);
      console.log("Deleted old admin user.");
    }
  }

  console.log("Creating new admin user...");
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'admin@ayuroots.com',
    password: 'admin123',
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
