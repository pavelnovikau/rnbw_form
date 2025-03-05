import React, { useState, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
import { surveyData } from '../lib/surveyQuestions';
import { CheckCircle2, Mail, User, Send, Loader2, Image as ImageIcon, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Checkbox } from '../components/ui/checkbox';
import Image from 'next/image';

// Real image component that uses the generated images
const SurveyImage = ({ type }: { type: 'bathroom' | 'bedroom' | 'dispensers' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className="relative w-full h-[300px] my-8 rounded-lg overflow-hidden transition-all duration-500 transform hover:scale-[1.02]">
      <Image 
        src={`/images/${type}.png`} 
        alt={`Image of ${type}`}
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        className={`object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary/5 border-2 border-dashed border-primary/20">
          <div className="flex flex-col items-center">
            <ImageIcon className="h-12 w-12 text-primary/40 mb-4" />
            <p className="text-muted-foreground">Загрузка изображения...</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Create a dynamic schema based on the survey data
const createSurveySchema = () => {
  const schemaFields: Record<string, any> = {};
  
  surveyData.forEach(section => {
    section.questions.forEach(question => {
      if (question.required) {
        if (question.type === 'email') {
          schemaFields[question.id] = z.string().email('Пожалуйста, введите корректный email').optional();
        } else if (question.type === 'text' || question.type === 'textarea') {
          schemaFields[question.id] = z.string().min(1, 'Это поле обязательно для заполнения');
        } else if (question.type === 'radio') {
          schemaFields[question.id] = z.string().min(1, 'Пожалуйста, выберите один из вариантов');
        } else if (question.type === 'checkbox') {
          schemaFields[question.id] = z.array(z.string()).min(1, 'Пожалуйста, выберите хотя бы один вариант');
        }
      } else {
        if (question.type === 'email') {
          schemaFields[question.id] = z.string().email('Пожалуйста, введите корректный email').optional();
        } else if (question.type === 'checkbox') {
          schemaFields[question.id] = z.array(z.string()).optional();
        } else {
          schemaFields[question.id] = z.string().optional();
        }
      }
    });
  });
  
  // Add name and email fields
  schemaFields.name = z.string().min(1, 'Пожалуйста, введите ваше имя');
  schemaFields.email = z.string().email('Пожалуйста, введите корректный email').optional();
  
  return z.object(schemaFields);
};

const surveySchema = createSurveySchema();
type SurveyFormData = z.infer<typeof surveySchema>;

const SurveyForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<SurveyFormData>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      // Initialize checkbox arrays
      ...surveyData.reduce((acc, section) => {
        section.questions.forEach(question => {
          if (question.type === 'checkbox') {
            acc[question.id] = [];
          }
        });
        return acc;
      }, {} as Record<string, any>)
    }
  });
  
  const onSubmit: SubmitHandler<SurveyFormData> = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Send the form data to the API
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Reset the form and show success message
      reset();
      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    reset();
    setIsSuccess(false);
  };

  // Function to scroll to a section
  const scrollToSection = (index: number) => {
    setActiveSection(index);
    if (sectionRefs.current[index]) {
      sectionRefs.current[index]?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  const renderQuestion = (question: any, sectionIndex: number, questionIndex: number) => {
    // Add a unique ID for the form field
    const fieldId = `${question.id}-field`;
    
    if (question.type === 'radio') {
      return (
        <div className="mb-6" key={question.id}>
          <div className="mb-2">
            <Label className="text-base font-medium">{question.defaultTitle}</Label>
          </div>
          <Controller
            name={question.id}
            control={control}
            render={({ field }) => (
              <RadioGroup
                className="fancy-radio-group space-y-3"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                {question.options?.map((option: any) => (
                  <div className="fancy-radio-item flex items-center space-x-2" key={option.id}>
                    <RadioGroupItem id={`${fieldId}-${option.id}`} value={option.id} />
                    <Label htmlFor={`${fieldId}-${option.id}`} className="cursor-pointer">
                      {option.defaultText}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
          {errors[question.id] && (
            <p className="text-red-500 text-sm mt-1">{errors[question.id]?.message as string}</p>
          )}
        </div>
      );
    }
    
    if (question.type === 'checkbox') {
      return (
        <div className="mb-6" key={question.id}>
          <div className="mb-2">
            <Label className="text-base font-medium">{question.defaultTitle}</Label>
          </div>
          <div className="flex flex-col space-y-3">
            {question.options?.map((option: any) => (
              <div className="flex items-center space-x-2" key={option.id}>
                <Controller
                  name={question.id}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Checkbox
                        id={`${fieldId}-${option.id}`}
                        checked={(field.value || []).includes(option.id)}
                        onCheckedChange={(checked) => {
                          const updatedValue = [...(field.value || [])];
                          if (checked) {
                            updatedValue.push(option.id);
                          } else {
                            const index = updatedValue.indexOf(option.id);
                            if (index !== -1) {
                              updatedValue.splice(index, 1);
                            }
                          }
                          field.onChange(updatedValue);
                        }}
                      />
                    );
                  }}
                />
                <Label htmlFor={`${fieldId}-${option.id}`} className="cursor-pointer">
                  {option.defaultText}
                </Label>
              </div>
            ))}
          </div>
          {errors[question.id] && (
            <p className="text-red-500 text-sm mt-1">{errors[question.id]?.message as string}</p>
          )}
        </div>
      );
    }
    
    if (question.type === 'textarea') {
      return (
        <div className="mb-6" key={question.id}>
          <div className="mb-2">
            <Label htmlFor={fieldId} className="text-base font-medium">{question.defaultTitle}</Label>
          </div>
          <Textarea
            id={fieldId}
            {...register(question.id)}
            placeholder="Напишите здесь..."
            className="w-full"
          />
          {errors[question.id] && (
            <p className="text-red-500 text-sm mt-1">{errors[question.id]?.message as string}</p>
          )}
        </div>
      );
    }
    
    // Default to text input
    return (
      <div className="mb-6" key={question.id}>
        <div className="mb-2">
          <Label htmlFor={fieldId} className="text-base font-medium">{question.defaultTitle}</Label>
        </div>
        <Input
          id={fieldId}
          type={question.type === 'email' ? 'email' : 'text'}
          {...register(question.id)}
          placeholder={question.type === 'email' ? "your.email@example.com" : "Ваш ответ"}
          className="w-full"
        />
        {errors[question.id] && (
          <p className="text-red-500 text-sm mt-1">{errors[question.id]?.message as string}</p>
        )}
      </div>
    );
  };
  
  if (isSuccess) {
    return (
      <div className="success-message text-center py-10 animate-fadeIn">
        <div className="success-icon-container mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Спасибо за ваш отзыв!</h2>
        <p className="text-muted-foreground mb-6">
          Ваши ответы помогут нам создать лучший продукт.
        </p>
        <Button onClick={resetForm} variant="outline">
          Отправить еще один ответ
        </Button>
      </div>
    );
  }

  // Section navigation
  const sections = [
    { title: "Информация", icon: User },
    { title: "Устройство", icon: ChevronRight },
    { title: "Функции", icon: ChevronRight },
    { title: "Бутылочки", icon: ChevronRight },
    { title: "Финал", icon: ChevronDown }
  ];
  
  return (
    <div>
      {/* Section navigation */}
      <div className="flex mb-6 overflow-x-auto pb-2 hide-scrollbar">
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`flex items-center px-4 py-2 mr-2 rounded-full text-sm whitespace-nowrap transition-all ${
              activeSection === index
                ? 'bg-primary text-white shadow-md'
                : 'bg-primary/10 text-primary hover:bg-primary/20'
            }`}
          >
            <section.icon className="w-4 h-4 mr-2" />
            {section.title}
          </button>
        ))}
      </div>
    
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Initial image */}
        <SurveyImage type="bathroom" />
        
        <div 
          ref={(el) => { sectionRefs.current[0] = el; }}
          className={`space-y-4 transition-all duration-500 ease-in-out ${activeSection === 0 ? 'opacity-100 scale-100' : 'opacity-70 scale-98'}`}
        >
          <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            {surveyData[0].defaultTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name-field" className="text-base font-medium">Как тебя зовут:</Label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="name-field"
                  {...register('name')}
                  placeholder="Ваше имя"
                  className="pl-10"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>
              )}
            </div>
          </div>
          
          {surveyData[0].questions.map((question, qIndex) => 
            renderQuestion(question, 0, qIndex)
          )}
        </div>
        
        {/* Device features section */}
        <div 
          ref={(el) => { sectionRefs.current[1] = el; }}
          className={`pt-6 border-t border-border/40 transition-all duration-500 ease-in-out ${activeSection === 1 ? 'opacity-100 scale-100' : 'opacity-70 scale-98'}`}
        >
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            {surveyData[1].defaultTitle}
          </h2>
          
          <p className="text-muted-foreground mb-6">
            Итак, вот оно наше чудо устройство. Если рассказывать про него коротко, то он умеет брать ароматы ванили, кожи, красного грейпфрута и несколько десятков других ароматов из маленьких бутылочек и смешивать их в уникальную композицию подобранную специально для вас.
          </p>
          
          {/* Bedroom image */}
          <SurveyImage type="bedroom" />
          
          {surveyData[1].questions.slice(0, 2).map((question, qIndex) => 
            renderQuestion(question, 1, qIndex)
          )}
          
          {/* Bathroom image */}
          <SurveyImage type="bathroom" />
          
          {/* Compact device question */}
          {renderQuestion(surveyData[1].questions[2], 1, 2)}
        </div>
        
        {/* Interactive features section */}
        <div 
          ref={(el) => { sectionRefs.current[2] = el; }}
          className={`pt-6 border-t border-border/40 transition-all duration-500 ease-in-out ${activeSection === 2 ? 'opacity-100 scale-100' : 'opacity-70 scale-98'}`}
        >
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            {surveyData[2].defaultTitle}
          </h2>
          
          {surveyData[2].questions.map((question, qIndex) => 
            renderQuestion(question, 2, qIndex)
          )}
        </div>
        
        {/* Smart bottles section */}
        <div 
          ref={(el) => { sectionRefs.current[3] = el; }}
          className={`pt-6 border-t border-border/40 transition-all duration-500 ease-in-out ${activeSection === 3 ? 'opacity-100 scale-100' : 'opacity-70 scale-98'}`}
        >
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            {surveyData[3].defaultTitle}
          </h2>
          
          {/* Dispensers image */}
          <SurveyImage type="dispensers" />
          
          {surveyData[3].questions.map((question, qIndex) => 
            renderQuestion(question, 3, qIndex)
          )}
        </div>
        
        {/* Branding and pricing section */}
        <div 
          ref={(el) => { sectionRefs.current[4] = el; }}
          className={`pt-6 border-t border-border/40 transition-all duration-500 ease-in-out ${activeSection === 4 ? 'opacity-100 scale-100' : 'opacity-70 scale-98'}`}
        >
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            {surveyData[4].defaultTitle}
          </h2>
          
          <p className="text-muted-foreground mb-6">
            Ёу-ёу-ёу! Вопросы закончились! Спасибо большое :) Правда! Большое громадное спасибо!!! Мне ваши ответы сильно помогут. Можно я спрошу еще чуть-чуть?
          </p>
          
          {surveyData[4].questions.slice(0, -1).map((question, qIndex) => 
            renderQuestion(question, 4, qIndex)
          )}
          
          <div className="mb-6">
            <Label htmlFor="email-field" className="text-base font-medium">
              {surveyData[4].questions[surveyData[4].questions.length - 1].defaultTitle}
            </Label>
            <div className="mt-2 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                id="email-field"
                type="email"
                {...register('email')}
                placeholder="your.email@example.com"
                className="pl-10"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>
            )}
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            type="submit" 
            className="px-8 py-6 text-lg hover:scale-105 transition-transform" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Отправка...
              </>
            ) : (
              <>
                Отправить ответы
                <Send className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SurveyForm; 