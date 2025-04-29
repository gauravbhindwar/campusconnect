import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/utils/db/mongodb';
import { sendConfirmationToUser, notifyAdmin } from '@/utils/email/emailService';
import { hasUserCommunicated } from '@/utils/db/communicationSchema';

export async function POST(request) {
  try {
    const data = await request.json();
    const { email, name = 'Subscriber' } = data;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
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
    
    // Check if user already subscribed
    const alreadySubscribed = await hasUserCommunicated(db, email, "newsletter");
    
    if (alreadySubscribed) {
      return NextResponse.json(
        { success: false, message: 'This email is already subscribed to our newsletter' },
        { status: 400 }
      );
    }
    
    // Store in unified communications collection
    // const communicationData = {
    //   name,
    //   email,
    //   communicationType: "newsletter",
    //   status: "pending",
    //   message: "Newsletter subscription request"
    // };
    
    // const result = await createCommunicationRecord(db, communicationData);

    // Send confirmation email to user
    await sendConfirmationToUser({
      name,
      email,
      inquiryType: 'newsletter'
    });

    // Notify admin
    await notifyAdmin({
      name,
      email,
      subject: 'New Newsletter Subscription',
      message: `A new user has subscribed to the newsletter with email: ${email}`
    });

    return NextResponse.json(
      { success: true, message: 'Subscription successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}