import { supabase } from '../config/supabase.js';

export const createOrUpdateProfile = async (req, res) => {
  try {
    const { id, full_name, mobile } = req.body;
    
    // Upsert the profile row so the user can place orders
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id, full_name, mobile, role: 'user' })
      .select()
      .single();

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    console.error("Profile Upsert Error:", error);
    res.status(500).json({ error: error.message });
  }
};
