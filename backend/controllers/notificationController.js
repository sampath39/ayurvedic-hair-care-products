import { supabase } from '../config/supabase.js';

export const getUserNotifications = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Internal service function, not exposed as route directly
export const createNotification = async (userId, title, message, type) => {
  try {
    await supabase.from('notifications').insert([{
      user_id: userId,
      title,
      message,
      type
    }]);
  } catch (error) {
    console.error("Failed to create notification:", error);
  }
};
