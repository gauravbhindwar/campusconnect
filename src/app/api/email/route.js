import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/utils/db/mongodb';
import { sendConfirmationToUser, notifyAdmin } from '@/utils/email/emailService';
import { createCommunicationRecord } from '@/utils/db/communicationSchema';

export async function POST(request) {
  try {
    const data = await request.json();
    const { 
      name, 
      email, 
      subject, 
      message, 
      inquiryType = 'contact',
      institution = '',
      resumeLink = ''
    } = data;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    if (!message && inquiryType === 'contact') {
      return NextResponse.json(
        { success: false, message: 'Message is required for contact inquiries' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Connect to database
    const { db } = await connectToDatabase();
    
    // Map inquiryType to our schema's communicationType
    let communicationType = "contact";
    switch(inquiryType) {
      case 'newsletter':
        communicationType = "newsletter";
        break;
      case 'campus_ambassador':
      case 'ambassador':
        communicationType = "campus_ambassador";
        break;
      case 'signup':
      case 'early_access':
        communicationType = "early_access";
        break;
      default:
        communicationType = "contact";
    }
    
    // Store in our unified communications collection
    const communicationData = {
      name: name || 'Anonymous',
      email,
      subject: subject || 'No Subject',
      message: message || '',
      communicationType,
      status: "pending",
      institution,
      resumeLink
    };
    
    const result = await createCommunicationRecord(db, communicationData);

    // Send confirmation to user
    await sendConfirmationToUser({
      name: name || 'User',
      email,
      inquiryType
    });

    // Notify admin
    await notifyAdmin({
      name: name || 'Anonymous',
      email,
      subject: subject || 'New Contact Form Submission',
      message: `
${message || 'No message provided'}

Institution: ${institution || 'Not provided'}
Resume Link: ${resumeLink || 'Not provided'}
      `
    });

    if (result.acknowledged) {
      return NextResponse.json(
        { success: true, message: 'Message received successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to save your message' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}