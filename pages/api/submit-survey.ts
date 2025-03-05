import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Survey schema validation
const surveySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  interest: z.enum(['very-interested', 'somewhat-interested', 'not-interested']),
  features: z.array(z.string()).min(1),
  priceRange: z.enum(['under-100', '100-200', '200-300', 'over-300']),
  feedback: z.string().optional(),
});

type SurveyData = z.infer<typeof surveySchema>;

// Helper function to format survey data as email content
function formatSurveyData(data: SurveyData): string {
  // Map interest level to human-readable text
  const interestMapping: Record<string, string> = {
    'very-interested': 'Very interested',
    'somewhat-interested': 'Somewhat interested',
    'not-interested': 'Not interested',
  };

  // Map price range to human-readable text
  const priceRangeMapping: Record<string, string> = {
    'under-100': 'Under $100',
    '100-200': '$100 - $200',
    '200-300': '$200 - $300',
    'over-300': 'Over $300',
  };

  // Map feature values to human-readable text
  const featureMapping: Record<string, string> = {
    'design': 'Sleek design and portability',
    'battery': 'Long battery life',
    'connectivity': 'Seamless connectivity with other devices',
    'ai': 'AI-powered capabilities',
    'customization': 'Customizable settings and appearance',
  };

  // Format features as a bulleted list
  const formattedFeatures = data.features
    .map(feature => `  • ${featureMapping[feature] || feature}`)
    .join('\n');

  // Construct and return the email content
  return `
RNBW Device Survey Submission

Name: ${data.name}
Email: ${data.email}

Interest Level: ${interestMapping[data.interest] || data.interest}

Important Features:
${formattedFeatures}

Preferred Price Range: ${priceRangeMapping[data.priceRange] || data.priceRange}

Additional Feedback:
${data.feedback || 'No additional feedback provided.'}

Submitted on: ${new Date().toLocaleString()}
`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Validate the request body
    const surveyData = surveySchema.parse(req.body);

    // Create email transporter
    // For development, we can use a test account or console log the email content
    // In production, use real SMTP credentials
    let transporter;
    
    if (process.env.NODE_ENV === 'production' && 
        process.env.EMAIL_SERVER && 
        process.env.EMAIL_USER && 
        process.env.EMAIL_PASSWORD) {
      // Use real credentials in production
      transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_PORT === '465',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    } else {
      // In development, log to console instead of sending real emails
      console.log('Using development email transport');
      transporter = {
        sendMail: async (mailOptions: any) => {
          console.log('Email would be sent with the following options:');
          console.log(mailOptions);
          return { messageId: 'test-message-id' };
        },
      } as any;
    }

    // Format the email content
    const emailContent = formatSurveyData(surveyData);

    // Send the email
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'noreply@example.com',
      to: process.env.EMAIL_RECIPIENT || 'recipient@example.com',
      subject: `RNBW Survey Submission from ${surveyData.name}`,
      text: emailContent,
    });

    // Return success response
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing survey submission:', error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors 
      });
    }
    
    // Handle other errors
    return res.status(500).json({ 
      message: 'Failed to process survey submission' 
    });
  }
} 