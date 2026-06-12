import { supabase } from '../config/supabase.js';
import { createNotification } from './notificationController.js';

export const updateDeliveryStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, location_data } = req.body;

    const { data: delivery, error } = await supabase
      .from('delivery_tracking')
      .upsert({ order_id: orderId, status, location_data, updated_at: new Date() })
      .select()
      .single();

    if (error) throw error;

    // Fetch the order to get the user ID for notification
    const { data: order } = await supabase.from('orders').select('user_id').eq('id', orderId).single();
    
    if (order) {
      await createNotification(
        order.user_id,
        "Delivery Update",
        `Your order is now: ${status}`,
        "delivery"
      );
    }

    res.json(delivery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDeliveryStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { data, error } = await supabase
      .from('delivery_tracking')
      .select('*')
      .eq('order_id', orderId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    res.json(data || { status: 'Not Assigned' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
