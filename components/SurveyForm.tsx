import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { surveyData } from '@/lib/surveyQuestions';
import { t } from '@/lib/i18n';

// Create a dynamic schema based on the survey data
const createSurveySchema = () => {
  const schemaFields: Record<string, any> = {};
  
  // Loop through all sections and questions to build the schema
  surveyData.forEach(section => {
    section.questions.forEach(question => {
      // Different handling based on question type
      if (question.type === 'radio') {
        // For radio questions, create an enum with all possible option IDs
        const optionValues = question.options?.map(opt => opt.id) || [];
        schemaFields[question.id] = question.required 
          ? z.enum(optionValues as [string, ...string[]], {
              required_error: `Please answer: ${question.defaultTitle}`,
            })
          : z.enum(optionValues as [string, ...string[]]).optional();
      } 
      else if (question.type === 'checkbox') {
        // For checkbox questions, create an array schema
        schemaFields[question.id] = question.required
          ? z.array(z.string()).min(1, { message: `Please select at least one option for: ${question.defaultTitle}` })
          : z.array(z.string()).optional();
      }
      else if (question.type === 'text') {
        // For text inputs
        schemaFields[question.id] = question.required
          ? z.string().min(1, { message: `Please answer: ${question.defaultTitle}` })
          : z.string().optional();
      }
      else if (question.type === 'textarea') {
        // For textarea inputs
        schemaFields[question.id] = question.required
          ? z.string().min(1, { message: `Please answer: ${question.defaultTitle}` })
          : z.string().optional();
      }
    });
  });

  // Add contact fields (name and email)
  schemaFields['name'] = z.string().min(1, { message: 'Name is required' });
  schemaFields['email'] = z.string().email({ message: 'Please enter a valid email address' });

  return z.object(schemaFields);
};

// Create the survey schema
const surveySchema = createSurveySchema();

// Define the type for form data from the schema
type SurveyFormData = z.infer<typeof surveySchema>;

const SurveyForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [currentLocale, setCurrentLocale] = useState('en'); // For future localization

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

  // Render a question based on its type
  const renderQuestion = (question: any, sectionIndex: number, questionIndex: number) => {
    const questionId = question.id;
    const isRequired = question.required;
    const hasError = errors[questionId];
    
    switch (question.type) {
      case 'radio':
        return (
          <div key={questionId} className="mb-6">
            <label className="form-label">
              {t(question.titleKey, question.defaultTitle, currentLocale)}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="mt-2 space-y-2">
              {question.options?.map((option: any) => (
                <div key={option.id} className="flex items-center">
                  <input
                    id={`${questionId}-${option.id}`}
                    type="radio"
                    className="h-4 w-4 text-primary-600 border-gray-300"
                    value={option.id}
                    {...register(questionId)}
                  />
                  <label htmlFor={`${questionId}-${option.id}`} className="ml-3 text-sm text-gray-700">
                    {t(option.labelKey, option.defaultText, currentLocale)}
                  </label>
                </div>
              ))}
            </div>
            {hasError && (
              <p className="error-message">{errors[questionId]?.message}</p>
            )}
          </div>
        );
      
      case 'checkbox':
        return (
          <div key={questionId} className="mb-6">
            <label className="form-label">
              {t(question.titleKey, question.defaultTitle, currentLocale)}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="mt-2 space-y-2">
              {question.options?.map((option: any) => (
                <div key={option.id} className="flex items-center">
                  <input
                    id={`${questionId}-${option.id}`}
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                    value={option.id}
                    {...register(questionId)}
                  />
                  <label htmlFor={`${questionId}-${option.id}`} className="ml-3 text-sm text-gray-700">
                    {t(option.labelKey, option.defaultText, currentLocale)}
                  </label>
                </div>
              ))}
            </div>
            {hasError && (
              <p className="error-message">{errors[questionId]?.message}</p>
            )}
          </div>
        );
        
      case 'textarea':
        return (
          <div key={questionId} className="mb-6">
            <label htmlFor={questionId} className="form-label">
              {t(question.titleKey, question.defaultTitle, currentLocale)}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              id={questionId}
              rows={4}
              className="input-field border"
              placeholder={`${t(question.titleKey, question.defaultTitle, currentLocale)}...`}
              {...register(questionId)}
            ></textarea>
            {hasError && (
              <p className="error-message">{errors[questionId]?.message}</p>
            )}
          </div>
        );
        
      case 'text':
      default:
        return (
          <div key={questionId} className="mb-6">
            <label htmlFor={questionId} className="form-label">
              {t(question.titleKey, question.defaultTitle, currentLocale)}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              id={questionId}
              type="text"
              className="input-field border"
              placeholder={`${t(question.titleKey, question.defaultTitle, currentLocale)}...`}
              {...register(questionId)}
            />
            {hasError && (
              <p className="error-message">{errors[questionId]?.message}</p>
            )}
          </div>
        );
    }
  };

  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="mt-3 text-xl font-medium text-gray-900">
            {t('survey.thankYou', 'Thank you for your feedback!')}
          </h2>
          <p className="mt-2 text-gray-500">
            {t('survey.responseRecorded', 'Your responses have been recorded and will help us improve the RNBW device.')}
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="mt-6 btn-secondary"
          >
            {t('survey.submitAnother', 'Submit another response')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto" id="survey-form">
      <div className="text-center mb-10">
        <h2 className="mb-4">{t('survey.title', 'We Value Your Input')}</h2>
        <p className="text-lg text-gray-600">
          {t('survey.description', 'Please take a moment to share your thoughts about our upcoming RNBW device.')}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md">
        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{submitError}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Contact Information */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t('section.contactInfo', 'Contact Information')}
            </h3>

            {/* Name field */}
            <div className="mb-4">
              <label htmlFor="name" className="form-label">
                {t('field.name', 'Name')}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                id="name"
                type="text"
                className="input-field border"
                placeholder={t('field.namePlaceholder', 'Your name')}
                {...register('name')}
              />
              {errors.name && (
                <p className="error-message">{errors.name.message}</p>
              )}
            </div>

            {/* Email field */}
            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                {t('field.email', 'Email')}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                id="email"
                type="email"
                className="input-field border"
                placeholder={t('field.emailPlaceholder', 'your.email@example.com')}
                {...register('email')}
              />
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Survey Sections */}
          {surveyData.map((section, sectionIndex) => (
            <div key={section.id} className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {t(section.titleKey, section.defaultTitle, currentLocale)}
              </h3>
              {section.questions.map((question, questionIndex) => 
                renderQuestion(question, sectionIndex, questionIndex)
              )}
            </div>
          ))}

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
                  {t('survey.submitting', 'Submitting...')}
                </span>
              ) : (
                t('survey.submit', 'Submit Survey')
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SurveyForm; 