import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { surveyData } from '@/lib/surveyQuestions';
import { t } from '@/lib/i18n';

// Import Shadcn UI components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

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
    control,
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
          <div key={questionId} className="mb-6 space-y-3">
            <Label className="text-base font-medium">
              {t(question.titleKey, question.defaultTitle, currentLocale)}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Controller
              name={questionId as any}
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="space-y-2 mt-2"
                >
                  {question.options?.map((option: any) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem id={`${questionId}-${option.id}`} value={option.id} />
                      <Label htmlFor={`${questionId}-${option.id}`} className="font-normal">
                        {t(option.labelKey, option.defaultText, currentLocale)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {hasError && (
              <p className="text-sm font-medium text-destructive mt-1">{errors[questionId]?.message as string}</p>
            )}
          </div>
        );
      
      case 'checkbox':
        return (
          <div key={questionId} className="mb-6 space-y-3">
            <Label className="text-base font-medium">
              {t(question.titleKey, question.defaultTitle, currentLocale)}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div className="space-y-2 mt-2">
              {question.options?.map((option: any) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Controller
                    name={questionId as any}
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => {
                      return (
                        <Checkbox
                          id={`${questionId}-${option.id}`}
                          checked={field.value?.includes(option.id)}
                          onCheckedChange={(checked) => {
                            const updatedValue = checked
                              ? [...(field.value || []), option.id]
                              : (field.value || []).filter((value: string) => value !== option.id);
                            field.onChange(updatedValue);
                          }}
                        />
                      );
                    }}
                  />
                  <Label htmlFor={`${questionId}-${option.id}`} className="font-normal">
                    {t(option.labelKey, option.defaultText, currentLocale)}
                  </Label>
                </div>
              ))}
            </div>
            {hasError && (
              <p className="text-sm font-medium text-destructive mt-1">{errors[questionId]?.message as string}</p>
            )}
          </div>
        );
        
      case 'textarea':
        return (
          <div key={questionId} className="mb-6 space-y-3">
            <Label htmlFor={questionId} className="text-base font-medium">
              {t(question.titleKey, question.defaultTitle, currentLocale)}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              id={questionId}
              placeholder={`${t(question.titleKey, question.defaultTitle, currentLocale)}...`}
              {...register(questionId)}
            />
            {hasError && (
              <p className="text-sm font-medium text-destructive mt-1">{errors[questionId]?.message as string}</p>
            )}
          </div>
        );
        
      case 'text':
      default:
        return (
          <div key={questionId} className="mb-6 space-y-3">
            <Label htmlFor={questionId} className="text-base font-medium">
              {t(question.titleKey, question.defaultTitle, currentLocale)}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={questionId}
              type="text"
              placeholder={`${t(question.titleKey, question.defaultTitle, currentLocale)}...`}
              {...register(questionId)}
            />
            {hasError && (
              <p className="text-sm font-medium text-destructive mt-1">{errors[questionId]?.message as string}</p>
            )}
          </div>
        );
    }
  };

  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-3 text-xl font-medium text-foreground">
            {t('survey.thankYou', 'Thank you for your feedback!')}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t('survey.responseRecorded', 'Your responses have been recorded and will help us improve the RNBW device.')}
          </p>
          <Button
            onClick={() => setSubmitSuccess(false)}
            variant="secondary"
            className="mt-6"
          >
            {t('survey.submitAnother', 'Submit another response')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto" id="survey-form">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-4">{t('survey.title', 'We Value Your Input')}</h2>
        <p className="text-lg text-muted-foreground">
          {t('survey.description', 'Please take a moment to share your thoughts about our upcoming RNBW device.')}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-card p-8 rounded-lg shadow-md space-y-8">
        {submitError && (
          <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-md">
            <p>{submitError}</p>
          </div>
        )}

        {/* Contact Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium border-b pb-2">
            {t('section.contactInfo', 'Contact Information')}
          </h3>

          {/* Name field */}
          <div className="space-y-3">
            <Label htmlFor="name" className="text-base font-medium">
              {t('field.name', 'Name')}
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder={t('field.namePlaceholder', 'Your name')}
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm font-medium text-destructive">{errors.name.message as string}</p>
            )}
          </div>

          {/* Email field */}
          <div className="space-y-3">
            <Label htmlFor="email" className="text-base font-medium">
              {t('field.email', 'Email')}
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t('field.emailPlaceholder', 'your.email@example.com')}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm font-medium text-destructive">{errors.email.message as string}</p>
            )}
          </div>
        </div>

        {/* Survey Sections */}
        {surveyData.map((section, sectionIndex) => (
          <div key={section.id} className="space-y-6">
            <h3 className="text-lg font-medium border-b pb-2">
              {t(section.titleKey, section.defaultTitle, currentLocale)}
            </h3>
            <div className="space-y-4">
              {section.questions.map((question, questionIndex) => 
                renderQuestion(question, sectionIndex, questionIndex)
              )}
            </div>
          </div>
        ))}

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full"
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
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SurveyForm; 