import { supabase } from '../config/supabase.js';

// Simulated OTP sending
export const sendOtp = async (req, res) => {
  try {
    const { mobile } = req.body;
    // Generate a simple 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires_at = new Date(Date.now() + 10 * 60000); // 10 mins expiry

    // In a real app, send OTP via Twilio/MSG91 here
    console.log(`[SIMULATED SMS] OTP for ${mobile} is ${otp}`);

    const { data, error } = await supabase
      .from('otp_verifications')
      .insert([{ mobile, otp_hash: otp, expires_at }])
      .select()
      .single();

    if (error) throw error;
    // Return OTP in response only for testing since there is no real SMS gateway
    res.json({ message: 'OTP sent successfully', id: data.id, simulated_otp: otp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    const { data, error } = await supabase
      .from('otp_verifications')
      .select('*')
      .eq('mobile', mobile)
      .eq('otp_hash', otp)
      .eq('status', 'Pending')
      .gte('expires_at', new Date().toISOString())
      .single();

    if (error || !data) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Mark as verified
    await supabase.from('otp_verifications').update({ status: 'Verified' }).eq('id', data.id);

    res.json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
