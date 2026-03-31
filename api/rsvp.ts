import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // CORS configuration
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, guests, message } = request.body;

    // Robust Validation
    if (!name || name.length < 2) {
      return response.status(400).json({ error: 'Please provide a valid full name.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return response.status(400).json({ error: 'Please provide a valid email address.' });
    }

    if (!guests || guests < 1 || guests > 10) {
      return response.status(400).json({ error: 'Guest count must be between 1 and 10.' });
    }

    // Success Simulation (In a real production app, this would save to a DB)
    console.log('RSVP Received:', { name, email, guests, message });

    // Simulate database delay for a "High Quality" feeling
    await new Promise(resolve => setTimeout(resolve, 1500));

    return response.status(200).json({ 
      success: true, 
      message: `Thank you ${name.split(' ')[0]}, your RSVP has been confirmed.`,
      confirmedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('RSVP API Error:', error);
    return response.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
}
