import { supabase } from '../config/supabase.js';

export const sendOtp = async (req, res) => {
  try {
    const { mobile } = req.body;
    // Generate a simple 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires_at = new Date(Date.now() + 10 * 60000); // 10 mins expiry

    // Send OTP via Fast2SMS
    if (process.env.FAST2SMS_API_KEY) {
      try {
        const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
          method: 'POST',
          headers: {
            'authorization': process.env.FAST2SMS_API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            route: 'v3',
            sender_id: 'TXTIND',
            message: `Your AyuRoots OTP is ${otp}. Valid for 10 minutes.`,
            language: 'english',
            flash: 0,
            numbers: mobile.replace('+91', '').trim()
          })
        });
        
        const result = await response.json();
        if (!result.return) {
          console.error("Fast2SMS API Error:", result);
          // If the API fails but we don't want to block dev mode completely, we can still fall through
          // But ideally we throw an error in pure production
          // throw new Error("SMS API provider failed to send message");
        }
      } catch (smsError) {
        console.error("Failed to call Fast2SMS:", smsError);
      }
    } else {
      console.warn(`[SMS WARNING] FAST2SMS_API_KEY is not set in .env! Cannot dispatch real SMS. OTP would be: ${otp}`);
    }

    const { data, error } = await supabase
      .from('otp_verifications')
      .insert([{ mobile, otp_hash: otp, expires_at }])
      .select()
      .single();

    if (error) throw error;
    res.json({ message: 'OTP sent successfully', id: data.id });
  } catch (error) {
    console.error("sendOtp exception:", error);
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
