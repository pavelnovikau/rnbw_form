import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define the survey form schema
const surveySchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  interest: z.enum(['very-interested', 'somewhat-interested', 'not-interested'], {
    required_error: 'Please select your interest level',
  }),
  features: z.array(z.string()).min(1, { message: 'Please select at least one feature' }),
  priceRange: z.enum(['under-100', '100-200', '200-300', 'over-300'], {
    required_error: 'Please select your preferred price range',
  }),
  feedback: z.string().optional(),
});

type SurveyFormData = z.infer<typeof surveySchema>;

const SurveyForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SurveyFormData>({
    resolver: zodResolver(surveySchema),
  });

  const onSubmit: SubmitHandler<SurveyFormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Send the survey data to the API
      const response = await fetch('/api/submit-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the survey');
      }

      // Success - show success message and reset form
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('There was an error submitting your survey. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="mt-3 text-xl font-medium text-gray-900">Thank you for your feedback!</h2>
          <p className="mt-2 text-gray-500">
            Your responses have been recorded and will help us improve the RNBW device.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="mt-6 btn-secondary"
          >
            Submit another response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto" id="survey-form">
      <div className="text-center mb-10">
        <h2 className="mb-4">We Value Your Input</h2>
        <p className="text-lg text-gray-600">
          Please take a moment to share your thoughts about our upcoming RNBW device.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md">
        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{submitError}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Name field */}
          <div>
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="input-field border"
              placeholder="Your name"
              {...register('name')}
            />
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          </div>

          {/* Email field */}
          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="input-field border"
              placeholder="your.email@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          {/* Interest level */}
          <div>
            <label className="form-label">How interested are you in the RNBW device?</label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  id="very-interested"
                  type="radio"
                  className="h-4 w-4 text-primary-600 border-gray-300"
                  value="very-interested"
                  {...register('interest')}
                />
                <label htmlFor="very-interested" className="ml-3 text-sm text-gray-700">
                  Very interested
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="somewhat-interested"
                  type="radio"
                  className="h-4 w-4 text-primary-600 border-gray-300"
                  value="somewhat-interested"
                  {...register('interest')}
                />
                <label htmlFor="somewhat-interested" className="ml-3 text-sm text-gray-700">
                  Somewhat interested
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="not-interested"
                  type="radio"
                  className="h-4 w-4 text-primary-600 border-gray-300"
                  value="not-interested"
                  {...register('interest')}
                />
                <label htmlFor="not-interested" className="ml-3 text-sm text-gray-700">
                  Not interested
                </label>
              </div>
            </div>
            {errors.interest && (
              <p className="error-message">{errors.interest.message}</p>
            )}
          </div>

          {/* Features */}
          <div>
            <label className="form-label">Which features are most important to you? (Select all that apply)</label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  id="feature-design"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  value="design"
                  {...register('features')}
                />
                <label htmlFor="feature-design" className="ml-3 text-sm text-gray-700">
                  Sleek design and portability
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="feature-battery"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  value="battery"
                  {...register('features')}
                />
                <label htmlFor="feature-battery" className="ml-3 text-sm text-gray-700">
                  Long battery life
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="feature-connectivity"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  value="connectivity"
                  {...register('features')}
                />
                <label htmlFor="feature-connectivity" className="ml-3 text-sm text-gray-700">
                  Seamless connectivity with other devices
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="feature-ai"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  value="ai"
                  {...register('features')}
                />
                <label htmlFor="feature-ai" className="ml-3 text-sm text-gray-700">
                  AI-powered capabilities
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="feature-customization"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  value="customization"
                  {...register('features')}
                />
                <label htmlFor="feature-customization" className="ml-3 text-sm text-gray-700">
                  Customizable settings and appearance
                </label>
              </div>
            </div>
            {errors.features && (
              <p className="error-message">{errors.features.message}</p>
            )}
          </div>

          {/* Price Range */}
          <div>
            <label htmlFor="priceRange" className="form-label">
              What price range would you consider reasonable for this device?
            </label>
            <select
              id="priceRange"
              className="input-field border"
              {...register('priceRange')}
            >
              <option value="">Select a price range</option>
              <option value="under-100">Under $100</option>
              <option value="100-200">$100 - $200</option>
              <option value="200-300">$200 - $300</option>
              <option value="over-300">Over $300</option>
            </select>
            {errors.priceRange && (
              <p className="error-message">{errors.priceRange.message}</p>
            )}
          </div>

          {/* Additional Feedback */}
          <div>
            <label htmlFor="feedback" className="form-label">
              Any additional feedback? (Optional)
            </label>
            <textarea
              id="feedback"
              rows={4}
              className="input-field border"
              placeholder="Share any other thoughts about the RNBW device..."
              {...register('feedback')}
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Survey'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SurveyForm; 