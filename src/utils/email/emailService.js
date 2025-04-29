import nodemailer from 'nodemailer';

// Create a transporter object with SMTP configuration
const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true' || false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // Use app password if 2FA is enabled
    },
    // Improve deliverability with TLS
    requireTLS: true,
    // Add DKIM if available
    ...(process.env.DKIM_PRIVATE_KEY && process.env.DKIM_KEY_SELECTOR && {
      dkim: {
        domainName: process.env.EMAIL_DOMAIN,
        keySelector: process.env.DKIM_KEY_SELECTOR,
        privateKey: process.env.DKIM_PRIVATE_KEY,
      },
    }),
  });
  
  return transporter;
};

// Send email function
export const sendEmail = async ({ to, subject, html, text, attachments = [] }) => {
  try {
    const transporter = createTransporter();
    
    // Get the domain from the EMAIL_USER or use a default
    const emailDomain = process.env.EMAIL_DOMAIN || process.env.EMAIL_USER.split('@')[1];
    const fromName = process.env.EMAIL_FROM_NAME || 'CampusConnect';
    
    const mailOptions = {
      from: `"${fromName}" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: text || '',
      html: html || '',
      attachments,
      // Add critical headers to avoid spam
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'High',
        'X-Mailer': 'CampusConnect Mailer',
        // Message ID with proper domain to improve deliverability
        'Message-ID': `<${Date.now()}.${Math.random().toString(36).substring(2)}@${emailDomain}>`,
      },
      // Return path for bounces
      envelope: {
        from: `bounces@${emailDomain}`,
        to,
      },
    };
    
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

// Send email to admin with user inquiry
export const notifyAdmin = async (userDetails) => {
  const { name, email, message, institution, subject: userSubject, inquiryType = 'contact', resumeLink = '' } = userDetails;
  
  // Create a subject line based on inquiry type
  let subjectLine = userSubject || 'New User Inquiry';
  if (inquiryType === 'early_access') {
    subjectLine = `[EARLY ACCESS REQUEST] from ${name || email}`;
  } else if (inquiryType === 'newsletter') {
    subjectLine = `[NEWSLETTER SIGN-UP] from ${email}`;
  } else if (inquiryType === 'campus_ambassador') {
    subjectLine = `[CAMPUS AMBASSADOR APPLICATION] from ${name || email}`;
  }
  
  return sendEmail({
    to: process.env.ADMIN_EMAIL, // This is set to ravi.crewsity@gmail.com
    subject: subjectLine,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(to right, #4f46e5, #3b82f6); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">New ${inquiryType.replace('_', ' ').charAt(0).toUpperCase() + inquiryType.replace('_', ' ').slice(1)} Request</h1>
        </div>
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; color: #333;">
          <p><strong>Name:</strong> ${name || 'Not provided'}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${institution ? `<p><strong>Institution:</strong> ${institution}</p>` : ''}
          ${resumeLink ? `<p><strong>Resume:</strong> <a href="${resumeLink}" target="_blank">${resumeLink}</a></p>` : ''}
          <p><strong>Message/Details:</strong></p>
          <p style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message || 'No message provided'}</p>
          <div style="margin: 30px 0; text-align: center;">
            <a href="mailto:${email}" style="background-color: #4f46e5; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">Reply to User</a>
          </div>
        </div>
        <div style="text-align: center; font-size: 12px; color: #6b7280; margin-top: 20px;">
          <p>&copy; ${new Date().getFullYear()} CampusConnect. All rights reserved.</p>
        </div>
      </div>
    `,
  });
};

// Send confirmation email to user
export const sendConfirmationToUser = async (userDetails) => {
  const { name = 'there', email, inquiryType } = userDetails;
  
  let subjectLine = 'Thank you for contacting CampusConnect';
  let specificContent = '';
  
  // Customize content based on inquiry type
  switch(inquiryType) {
    case 'newsletter':
      subjectLine = 'Thanks for subscribing to CampusConnect Newsletter';
      specificContent = `
        <p>You've been successfully added to our newsletter. We'll keep you updated with all the latest events, features, and opportunities at CampusConnect.</p>
        <p>If you have any questions or feedback, feel free to reply to this email.</p>
      `;
      break;
    case 'ambassador':
      subjectLine = 'Your Campus Ambassador Application';
      specificContent = `
        <p>We've received your application to become a Campus Ambassador for CampusConnect.</p>
        <p>Our team will review your application shortly. You can expect to hear back from us within 5-7 business days.</p>
        <p>If you have any questions in the meantime, feel free to reach out to our support team.</p>
      `;
      break;
    case 'signup':
      subjectLine = 'Welcome to CampusConnect!';
      specificContent = `
        <p>Thank you for signing up for early access to CampusConnect!</p>
        <p>You've been added to our waitlist, and we'll notify you as soon as we're ready to welcome you to the platform.</p>
      `;
      break;
    default:
      specificContent = `
        <p>We've received your message and our team will get back to you shortly.</p>
        <p>If your inquiry is urgent, please call our support line at ${process.env.SUPPORT_PHONE || 'our support team'}.</p>
      `;
  }
  
  // Get the domain from the EMAIL_USER
  const emailDomain = process.env.EMAIL_DOMAIN || process.env.EMAIL_USER.split('@')[1];
  const unsubscribeUrl = `https://${process.env.NEXT_PUBLIC_DOMAIN || 'campusconnect.edu'}/unsubscribe?email=${encodeURIComponent(email)}`;
  
  return sendEmail({
    to: email,
    subject: subjectLine,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(to right, #4f46e5, #3b82f6); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">Thank You!</h1>
        </div>
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; color: #333;">
          <p>Hello ${name},</p>
          ${specificContent}
          <div style="margin: 30px 0; text-align: center;">
            <a href="https://${process.env.NEXT_PUBLIC_DOMAIN || 'crewsity.com'}" style="background-color: #4f46e5; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">Visit CampusConnect</a>
          </div>
          <p>Best regards,<br>The CampusConnect Team</p>
        </div>
        <div style="text-align: center; font-size: 12px; color: #6b7280; margin-top: 20px;">
          <p>&copy; ${new Date().getFullYear()} CampusConnect. All rights reserved.</p>
          <p>If you didn't contact us, you can safely ignore this email.</p>
          <p><a href="${unsubscribeUrl}" style="color: #6b7280; text-decoration: underline;">Unsubscribe</a> from future emails.</p>
        </div>
      </div>
    `,
    // Add List-Unsubscribe header for spam prevention
    headers: {
      'List-Unsubscribe': `<${unsubscribeUrl}>, <mailto:unsubscribe@${emailDomain}?subject=Unsubscribe&body=${email}>`,
    }
  });
};

export default {
  sendEmail,
  notifyAdmin,
  sendConfirmationToUser,
};