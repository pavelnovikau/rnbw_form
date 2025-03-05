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
import { cn } from '@/lib/utils';

// Import icons
import { 
  ChevronRight, 
  CheckCircle2, 
  Mail, 
  User, 
  Send,
  Loader2
} from 'lucide-react';

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
  const [activeSection, setActiveSection] = useState(0); // To track active section for animation

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
              {isRequired && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Controller
              name={questionId as any}
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="fancy-radio-group"
                >
                  {question.options?.map((option: any) => (
                    <div key={option.id} className="fancy-radio-item group">
                      <RadioGroupItem 
                        id={`${questionId}-${option.id}`} 
                        value={option.id}
                        className="text-primary border-primary/50"
                      />
                      <Label 
                        htmlFor={`${questionId}-${option.id}`} 
                        className="font-normal group-hover:text-primary transition-colors duration-200"
                      >
                        {t(option.labelKey, option.defaultText, currentLocale)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {hasError && (
              <p className="text-sm font-medium text-destructive mt-1 flex items-center">
                {errors[questionId]?.message as string}
              </p>
            )}
          </div>
        );
      
      case 'checkbox':
        return (
          <div key={questionId} className="mb-6 space-y-3">
            <Label className="text-base font-medium">
              {t(question.titleKey, question.defaultTitle, currentLocale)}
              {isRequired && <span className="text-destructive ml-1">*</span>}
            </Label>
            <div className="space-y-2 mt-2">
              {question.options?.map((option: any) => (
                <div key={option.id} className="fancy-radio-item group">
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
                          className="text-primary border-primary/50 data-[state=checked]:bg-primary"
                        />
                      );
                    }}
                  />
                  <Label 
                    htmlFor={`${questionId}-${option.id}`} 
                    className="font-normal group-hover:text-primary transition-colors duration-200"
                  >
                    {t(option.labelKey, option.defaultText, currentLocale)}
                  </Label>
                </div>
              ))}
            </div>
            {hasError && (
              <p className="text-sm font-medium text-destructive mt-1 flex items-center">
                {errors[questionId]?.message as string}
              </p>
            )}
          </div>
        );
        
      case 'textarea':
        return (
          <div key={questionId} className="mb-6 space-y-3">
            <Label htmlFor={questionId} className="text-base font-medium">
              {t(question.titleKey, question.defaultTitle, currentLocale)}
              {isRequired && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Textarea
              id={questionId}
              placeholder={`${t(question.titleKey, question.defaultTitle, currentLocale)}...`}
              {...register(questionId)}
              className="textarea-field min-h-[120px] resize-y"
            />
            {hasError && (
              <p className="text-sm font-medium text-destructive mt-1 flex items-center">
                {errors[questionId]?.message as string}
              </p>
            )}
          </div>
        );
        
      case 'text':
      default:
        return (
          <div key={questionId} className="mb-6 space-y-3">
            <Label htmlFor={questionId} className="text-base font-medium">
              {t(question.titleKey, question.defaultTitle, currentLocale)}
              {isRequired && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input
              id={questionId}
              type="text"
              placeholder={`${t(question.titleKey, question.defaultTitle, currentLocale)}...`}
              {...register(questionId)}
              className="input-field"
            />
            {hasError && (
              <p className="text-sm font-medium text-destructive mt-1 flex items-center">
                {errors[questionId]?.message as string}
              </p>
            )}
          </div>
        );
    }
  };

  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto success-message animate-in fade-in duration-500 slide-in-from-bottom-5">
        <div className="text-center">
          <div className="success-icon-container">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="mt-5 text-xl font-medium">
            {t('survey.thankYou', 'Thank you for your feedback!')}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t('survey.responseRecorded', 'Your responses have been recorded and will help us improve the RNBW device.')}
          </p>
          <Button
            onClick={() => setSubmitSuccess(false)}
            variant="secondary"
            className="mt-6 group"
          >
            {t('survey.submitAnother', 'Submit another response')}
            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 animate-in fade-in duration-700" id="survey-form">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{t('survey.title', 'We Value Your Input')}</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          {t('survey.description', 'Please take a moment to share your thoughts about our upcoming RNBW device.')}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form-card p-8 space-y-10">
        {submitError && (
          <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-md animate-in fade-in zoom-in duration-300">
            <p>{submitError}</p>
          </div>
        )}

        {/* Contact Information */}
        <div className={cn(
          "space-y-6 card-gradient animate-in fade-in duration-300", 
          activeSection === 0 ? "border-primary/30" : ""
        )}>
          <h3 className="text-lg font-medium text-primary border-b border-border pb-2 flex items-center">
            {t('section.contactInfo', 'Contact Information')}
          </h3>

          {/* Name field */}
          <div className="space-y-3">
            <Label htmlFor="name" className="text-base font-medium flex items-center">
              <User className="h-4 w-4 mr-2 text-primary/70" />
              {t('field.name', 'Name')}
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder={t('field.namePlaceholder', 'Your name')}
              {...register('name')}
              className="input-field"
              onFocus={() => setActiveSection(0)}
            />
            {errors.name && (
              <p className="text-sm font-medium text-destructive flex items-center">
                {errors.name.message as string}
              </p>
            )}
          </div>

          {/* Email field */}
          <div className="space-y-3">
            <Label htmlFor="email" className="text-base font-medium flex items-center">
              <Mail className="h-4 w-4 mr-2 text-primary/70" />
              {t('field.email', 'Email')}
              <span className="text-destructive ml-1">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t('field.emailPlaceholder', 'your.email@example.com')}
              {...register('email')}
              className="input-field"
              onFocus={() => setActiveSection(0)}
            />
            {errors.email && (
              <p className="text-sm font-medium text-destructive flex items-center">
                {errors.email.message as string}
              </p>
            )}
          </div>
        </div>

        {/* Survey Sections */}
        {surveyData.map((section, sectionIndex) => (
          <div 
            key={section.id} 
            className={cn(
              "card-gradient space-y-6 animate-in fade-in duration-300", 
              activeSection === sectionIndex + 1 ? "border-primary/30" : ""
            )}
          >
            <h3 className="text-lg font-medium text-primary border-b border-border pb-2">
              {t(section.titleKey, section.defaultTitle, currentLocale)}
            </h3>
            <div className="space-y-6">
              {section.questions.map((question, questionIndex) => 
                React.cloneElement(
                  renderQuestion(question, sectionIndex, questionIndex) as React.ReactElement,
                  { 
                    onFocus: () => setActiveSection(sectionIndex + 1) 
                  }
                )
              )}
            </div>
          </div>
        ))}

        <div className="pt-6">
          <Button
            type="submit"
            className="w-full h-12 text-base font-medium group"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                {t('survey.submitting', 'Submitting...')}
              </span>
            ) : (
              <span className="flex items-center justify-center">
                {t('survey.submit', 'Submit Survey')}
                <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SurveyForm; 