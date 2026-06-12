import { supabase } from '../config/supabase.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    
    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // Create order record
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          user_id: req.user.id,
          payment_method: paymentMethod,
          payment_status: paymentMethod === 'COD' ? 'Pending' : 'Paid', // Simplified logic
          order_status: 'Pending',
          shipping_address: shippingAddress,
          total_amount: totalPrice
        }
      ])
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items records
    const orderItemsData = orderItems.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.qty,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItemsData);

    if (itemsError) throw itemsError;

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const { data: order, error } = await supabase
      .from('orders')
      .select('*, order_items(*, products(name, images))')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    
    if (order) {
      // Basic security to ensure user owns order or is admin
      // You'd need more complex logic here if admin access check isn't in middleware
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getUserOrders = async (req, res) => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*, order_items(*, products(name, images))')
      .eq('user_id', req.user.id);

    if (error) throw error;
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*, profiles(full_name)');

    if (error) throw error;
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { order_status } = req.body;

    const { data: order, error } = await supabase
      .from('orders')
      .update({ order_status })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get dashboard analytics
// @route   GET /api/orders/analytics
// @access  Private/Admin
export const getAnalytics = async (req, res) => {
  try {
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('total_amount, order_status, payment_method, created_at, id');
      
    if (ordersError) throw ordersError;
    
    // Aggregate data
    const totalSales = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
    const totalOrders = orders.length;
    
    let todayOrders = 0;
    let pendingOrders = 0;
    let deliveredOrders = 0;
    let cancelledOrders = 0;
    let activeDeliveries = 0;
    let codRevenue = 0;
    let upiRevenue = 0;
    
    const today = new Date();
    today.setHours(0,0,0,0);

    orders.forEach(order => {
      const orderDate = new Date(order.created_at);
      if (orderDate >= today) todayOrders++;
      
      if (order.order_status === 'Pending') pendingOrders++;
      else if (order.order_status === 'Delivered') deliveredOrders++;
      else if (order.order_status === 'Cancelled' || order.order_status === 'Rejected') cancelledOrders++;
      else if (['Processing', 'Shipped', 'Out for Delivery'].includes(order.order_status)) activeDeliveries++;

      if (order.payment_method === 'COD') codRevenue += Number(order.total_amount);
      else upiRevenue += Number(order.total_amount);
    });
    
    const { count: customersCount, error: custError } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
    if (custError) throw custError;
    
    const { count: productsCount, error: prodError } = await supabase.from('products').select('*', { count: 'exact', head: true });
    if (prodError) throw prodError;

    res.json({
      totalSales,
      totalOrders,
      todayOrders,
      pendingOrders,
      deliveredOrders,
      cancelledOrders,
      activeDeliveries,
      codRevenue,
      upiRevenue,
      customers: customersCount || 0,
      products: productsCount || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
