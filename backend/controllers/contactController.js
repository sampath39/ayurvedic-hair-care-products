import { supabase } from '../config/supabase.js';
import nodemailer from 'nodemailer';

export const handleContactSubmission = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Store in Supabase Database
    const { data, error: dbError } = await supabase
      .from('contact_messages')
      .insert([{ name, email, subject, message }])
      .select()
      .single();

    if (dbError) {
      console.error('Supabase Error storing contact message:', dbError);
      return res.status(500).json({ message: 'Database error while saving message' });
    }

    // 2. Send Email via Nodemailer
    // Using environment variables. User must set SMTP_EMAIL and SMTP_PASSWORD in .env
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL, // Should be sampath777yt@gmail.com
        pass: process.env.SMTP_PASSWORD // Should be a Gmail App Password
      }
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL || 'noreply@ayuroots.com',
      to: 'sampath777yt@gmail.com', // Explicitly hardcoded per user request
      subject: `New Contact Form Message: ${subject}`,
      html: `
        <h2>New Message from AyuRoots Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <h3>Message:</h3>
        <p>${message}</p>
      `
    };

    try {
      if (process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
        await transporter.sendMail(mailOptions);
        console.log('Email sent to sampath777yt@gmail.com');
      } else {
        console.warn('SMTP credentials not found in .env. Skipping email delivery.');
      }
    } catch (emailError) {
      console.error('Nodemailer Error:', emailError);
      // We don't fail the request if email fails, since it's already in DB
    }

    res.status(200).json({ message: 'Message received successfully!', data });

  } catch (error) {
    console.error('Contact Submission Error:', error);
    res.status(500).json({ message: 'Failed to process contact form submission' });
  }
};
