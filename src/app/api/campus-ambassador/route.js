import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/utils/db/mongodb';
import { sendConfirmationToUser, notifyAdmin } from '@/utils/email/emailService';
import { hasUserCommunicated, createCommunicationRecord } from '@/utils/db/communicationSchema';

// test
export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, institution, year, phone, motivation, resumeLink } = data;

    // Validate required fields
    if (!name || !email || !institution || !year || !phone || !motivation) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
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

    // Connect to MongoDB
    const { db } = await connectToDatabase();
    
    // Check if user already applied using our helper function
    const alreadyApplied = await hasUserCommunicated(db, email, "campus_ambassador");
    
    if (alreadyApplied) {
      return NextResponse.json(
        { success: false, message: 'You have already applied for the Campus Ambassador program' },
        { status: 400 }
      );
    }
    
    // Store in database using our communication schema
    const communicationData = {
      name,
      email,
      institution,
      year,
      phone,
      motivation,
      resumeLink: resumeLink || '',
      communicationType: "campus_ambassador",
      status: "pending",
      message: motivation // Store motivation as the message for searchability
    };
    
    const result = await createCommunicationRecord(db, communicationData);

    // Send confirmation to user
    await sendConfirmationToUser({
      name,
      email,
      inquiryType: 'ambassador'
    });

    // Notify admin
    await notifyAdmin({
      name,
      email,
      institution,
      subject: 'New Campus Ambassador Application',
      message: `
Name: ${name}
Email: ${email}
Institution: ${institution}
Year of Study: ${year}
Phone: ${phone}
Motivation: ${motivation}
Resume Link: ${resumeLink || 'Not provided'}
      `
    });

    if (result.acknowledged) {
      return NextResponse.json(
        { success: true, message: 'Application submitted successfully' },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to save application' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Campus ambassador application error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}