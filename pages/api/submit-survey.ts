import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { surveyData } from '@/lib/surveyQuestions';

type ResponseData = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Get form data from request body
    const formData = req.body;
    
    // Email setup
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Format the survey responses for the email
    const formatSurveyData = (data: any) => {
      let emailContent = `<h2>Survey Submission</h2>
<h3>Contact Information</h3>
<p><strong>Name:</strong> ${data.name || 'Not provided'}</p>
<p><strong>Email:</strong> ${data.email || 'Not provided'}</p>

`;

      // Process survey sections and questions
      surveyData.forEach(section => {
        emailContent += `<h3>${section.defaultTitle}</h3>`;
        
        section.questions.forEach(question => {
          const questionId = question.id;
          const answer = data[questionId];
          
          // Skip if no answer provided and question is not required
          if (!answer && !question.required) {
            return;
          }
          
          emailContent += `<p><strong>${question.defaultTitle}:</strong> `;
          
          // Format answer based on question type
          if (question.type === 'radio' && answer) {
            // For radio buttons, find the selected option text
            const selectedOption = question.options?.find(opt => opt.id === answer);
            emailContent += selectedOption ? selectedOption.defaultText : answer;
          } 
          else if (question.type === 'checkbox' && Array.isArray(answer) && answer.length > 0) {
            // For checkboxes, find all selected option texts
            const selectedOptions = answer.map(optionId => {
              const option = question.options?.find(opt => opt.id === optionId);
              return option ? option.defaultText : optionId;
            });
            emailContent += selectedOptions.join(', ');
          } 
          else {
            // For text/textarea or any other type
            emailContent += answer || 'Not provided';
          }
          
          emailContent += '</p>';
        });
      });
      
      emailContent += `
<p>Submitted on: ${new Date().toLocaleString()}</p>
`;
      
      return emailContent;
    };

    // Send the email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT,
      subject: 'New RNBW Survey Submission',
      html: formatSurveyData(formData),
    };

    await transporter.sendMail(mailOptions);
    
    // Respond to the client
    res.status(200).json({
      success: true,
      message: 'Survey submitted successfully',
    });
  } catch (error) {
    console.error('Error submitting survey:', error);
    res.status(500).json({
      success: false,
      message: 'There was an error submitting your survey. Please try again.',
    });
  }
} 