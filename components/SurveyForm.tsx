import { useState, useRef, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { surveyData, Question, QuestionOption, SurveySection } from '../lib/surveyQuestions';
import { Locale, t } from '../lib/i18n';
import { Button } from '../components/ui/button';

// Компонент изображения с анимацией появления
const SurveyImage = ({ src, alt, className = '' }: { src: string, alt: string, className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={imgRef}
      className={`relative w-full overflow-hidden rounded-xl mb-8 transition-all duration-500 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      } ${className}`}
      style={{ aspectRatio: '16/9' }}
    >
      {isVisible && (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
              <span className="ml-2 text-sm text-muted-foreground">{t('image.loading')}</span>
            </div>
          )}
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
          />
        </>
      )}
    </div>
  );
};

// Обновим компонент вопроса, добавив анимации и эффекты
const QuestionContainer = ({ children, animate = true }: { children: React.ReactNode, animate?: boolean }) => {
  return (
    <div className={`p-6 md:p-8 bg-card dark:bg-card/60 shadow-md dark:shadow-lg backdrop-blur-sm 
                      border border-accent/10 dark:border-accent/20 rounded-2xl mb-8
                      transition-all duration-500 hover:shadow-xl hover:border-accent/30
                      ${animate ? 'animate-fadeIn' : ''}`}>
      {children}
    </div>
  );
};

// Обновим функциональность radio button для более современного вида
const RadioOption = ({ 
  id, 
  name, 
  value, 
  checked, 
  onChange, 
  label, 
  description 
}: {
  id: string; 
  name: string; 
  value: string; 
  checked: boolean; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  label: string; 
  description?: string;
}) => {
  return (
    <div className={`relative transition-all duration-300 ease-out p-4 rounded-xl border mb-3
                     ${checked 
                       ? 'bg-primary/10 dark:bg-primary/20 border-primary/30 dark:border-primary/40 scale-[1.02] shadow-md' 
                       : 'border-border hover:border-accent/30 dark:border-border/30 hover:bg-accent/5'}`}>
      <label htmlFor={id} className="flex items-start space-x-3 cursor-pointer">
        <div className="flex items-center h-6">
          <input
            id={id}
            name={name}
            type="radio"
            value={value}
            checked={checked}
            onChange={onChange}
            className="h-5 w-5 text-primary focus:ring-primary"
          />
        </div>
        <div className="flex-1">
          <div className="font-medium">{label}</div>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </label>
    </div>
  );
};

type SurveyFormProps = {
  locale: Locale;
  onSuccess?: () => void;
};

export function SurveyForm({ locale = 'ru', onSuccess }: SurveyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  console.log('SurveyForm: Rendering with locale:', locale);
  console.log('SurveyForm: First section title:', surveyData[0].title);
  console.log('SurveyForm: First question title:', surveyData[0].questions[0].title);
  
  // Создаем динамическую схему валидации на основе вопросов
  const formSchema = z.object(
    Object.fromEntries(
      surveyData.flatMap(section => 
        section.questions.map(question => {
          let schema: z.ZodTypeAny;
          
          if (question.type === 'text') {
            schema = z.string().optional();
          }
          else if (question.type === 'textarea') {
            schema = z.string().optional();
          }
          else if (question.type === 'email') {
            schema = z.string()
              .optional()
              .refine(
                val => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
                val => ({ message: val ? t('error.email', 'Некорректный email адрес', locale) : '' })
              );
          }
          else if (question.type === 'checkbox') {
            schema = z.array(z.string()).optional();
          }
          else if (question.type === 'radio') {
            schema = z.string().optional();
          }
          else {
            // Fallback for any other types
            schema = z.any();
          }
          
          return [question.id, schema];
        })
      )
    )
  );

  // Типизация для данных формы на основе схемы
  type FormData = z.infer<typeof formSchema>;
  
  // Инициализация формы с помощью react-hook-form
  const { 
    control, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(
      surveyData.flatMap(section => 
        section.questions.map(question => {
          if (question.type === 'checkbox') {
            return [question.id, []];
          }
          return [question.id, ''];
        })
      )
    )
  });

  // Обработчик отправки формы
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/submit-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, submittedAt: new Date().toISOString() }),
      });
      
      if (!response.ok) {
        throw new Error('Submission failed');
      }
      
      // Успешная отправка
      setIsSuccess(true);
      if (onSuccess) onSuccess();
      reset();
      
      // Прокрутка вверх страницы после успешной отправки
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } 
    catch (error) {
      console.error('Submit error:', error);
      alert(t('error.submit', 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.', locale));
    } 
    finally {
      setIsSubmitting(false);
    }
  };

  // Функция для сброса формы
  const resetForm = () => {
    setIsSuccess(false);
    reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Компонент для отображения сообщения об успешной отправке
  const SuccessMessage = ({ resetForm, locale }: { resetForm: () => void, locale: Locale }) => {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 gap-6 animate-fadeIn">
        <div className="success-icon-container">
          <Check className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold">{t('success.title', 'Спасибо за ваш отзыв!', locale)}</h2>
        <p className="text-muted-foreground max-w-md">
          {t('success.message', 'Ваши ответы помогут нам создать лучший продукт. Мы ценим ваше время и внимание к деталям.', locale)}
        </p>
        <button
          onClick={resetForm}
          className="mt-4 px-6 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors"
        >
          {t('success.button', 'Отправить еще один ответ', locale)}
        </button>
      </div>
    );
  };

  if (isSuccess) {
    return (
      <SuccessMessage resetForm={resetForm} locale={locale} />
    );
  }

  // Обновляем отображение вопроса в форме
  const renderQuestion = (question: Question, index: number, sectionIndex: number) => {
    const errorMessage = errors[question.id]?.message;
    
    // Получение локализованного заголовка вопроса и описания
    const localizedTitle = t(`questions.${question.id}`, question.title, locale);
    const localizedDescription = question.description 
      ? t(`descriptions.${question.id}`, question.description, locale) 
      : undefined;
    
    return (
      <div key={question.id} className="mb-8 transition-all duration-500">
        <QuestionContainer>
          <label htmlFor={question.id} className="text-lg font-medium block mb-2">
            {localizedTitle}
          </label>
          
          {localizedDescription && (
            <p className="text-muted-foreground text-sm mb-4">{localizedDescription}</p>
          )}
          
          {/* Рендер поля в зависимости от типа вопроса */}
          {(question.type === 'text' || question.type === 'email') && (
            <Controller
              name={question.id}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type={question.type}
                  id={question.id}
                  placeholder={t('form.input.placeholder', 'Ваш ответ', locale)}
                  className="w-full p-3 rounded-md border border-input focus:border-accent focus:ring-1 focus:ring-accent"
                />
              )}
            />
          )}
          
          {question.type === 'textarea' && (
            <Controller
              name={question.id}
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  id={question.id}
                  rows={5}
                  placeholder={t('form.textarea.placeholder', 'Напишите здесь...', locale)}
                  className="w-full p-3 rounded-md border border-input focus:border-accent focus:ring-1 focus:ring-accent"
                />
              )}
            />
          )}
          
          {question.type === 'radio' && question.options && (
            <div className="space-y-3">
              <Controller
                name={question.id}
                control={control}
                render={({ field }) => (
                  <>
                    {question.options?.map((option) => {
                      // Получаем локализованный текст опции
                      const localizedLabel = t(`options.${option.value}`, option.label, locale);
                      const localizedDescription = option.description 
                        ? t(`option_descriptions.${option.value}`, option.description, locale) 
                        : undefined;
                      
                      return (
                        <RadioOption
                          key={option.value}
                          id={`${question.id}-${option.value}`}
                          name={question.id}
                          value={option.value}
                          checked={field.value === option.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          label={localizedLabel}
                          description={localizedDescription}
                        />
                      );
                    })}
                  </>
                )}
              />
            </div>
          )}
          
          {question.type === 'checkbox' && question.options && (
            <div className="space-y-3">
              <Controller
                name={question.id}
                control={control}
                render={({ field }) => (
                  <>
                    {question.options?.map((option) => {
                      // Получаем локализованный текст опции
                      const localizedLabel = t(`options.${option.value}`, option.label, locale);
                      const localizedDescription = option.description 
                        ? t(`option_descriptions.${option.value}`, option.description, locale) 
                        : undefined;
                      
                      const isChecked = Array.isArray(field.value) && field.value.includes(option.value);
                      
                      return (
                        <div key={option.value} className="flex items-start space-x-2 p-2 rounded-md hover:bg-accent/5">
                          <input
                            type="checkbox"
                            id={`${question.id}-${option.value}`}
                            value={option.value}
                            checked={isChecked}
                            onChange={(e) => {
                              const currentValues = Array.isArray(field.value) ? [...field.value] : [];
                              if (e.target.checked) {
                                field.onChange([...currentValues, option.value]);
                              } else {
                                field.onChange(currentValues.filter(val => val !== option.value));
                              }
                            }}
                            className="mt-1"
                          />
                          <label htmlFor={`${question.id}-${option.value}`} className="flex-grow cursor-pointer">
                            <div className="font-medium">{localizedLabel}</div>
                            {localizedDescription && (
                              <div className="text-sm text-muted-foreground">{localizedDescription}</div>
                            )}
                          </label>
                        </div>
                      );
                    })}
                  </>
                )}
              />
            </div>
          )}
          
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage.toString()}</p>
          )}
        </QuestionContainer>
      </div>
    );
  };

  // Обновляем отображение секции формы
  const renderSection = (section: SurveySection, index: number) => {
    const localizedTitle = t(`sections.${section.id}`, section.title, locale);

    return (
      <div 
        key={section.id} 
        id={`section-${section.id}`}
        className={`
          space-y-6 py-6 
          ${index > 0 ? 'section-separator' : ''}
          animate-fadeIn
        `}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-float">
          {localizedTitle}
        </h2>
        
        {section.id === 'info' && (
          <div className="p-5 rounded-xl bg-accent/5 dark:bg-accent/10 border border-accent/10 mb-8 animate-fadeIn" style={{animationDelay: '200ms'}}>
            <p className="text-muted-foreground">
              {t('form.intro', 'Итак, вот оно наше чудо устройство...', locale)}
            </p>
          </div>
        )}
        
        {section.id === 'final' && (
          <div className="p-5 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/10 mb-8 animate-fadeIn" style={{animationDelay: '200ms'}}>
            <p className="text-muted-foreground">
              {t('form.outro', 'Ёу-ёу-ёу! Вопросы закончились! Спасибо большое :)', locale)}
            </p>
          </div>
        )}
        
        {/* Отображаем вопросы */}
        {section.questions.map((question: Question, qIndex: number) => renderQuestion(question, qIndex, index))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {isSuccess ? (
        <SuccessMessage resetForm={resetForm} locale={locale} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Начальное изображение - в ванной */}
          <SurveyImage 
            src="/images/Bathroom.png" 
            alt="Ванная комната с устройством RNBW" 
            className="my-8"
          />

          {/* Отображаем все секции сразу */}
          <div className="space-y-12">
            {surveyData.map((section, index) => (
              <div key={index} className="space-y-6 transition-all duration-500 animate-fadeIn">
                {renderSection(section, index)}
                
                {/* Добавляем изображения между секциями */}
                {index < surveyData.length - 1 && (
                  <SurveyImage 
                    src={
                      index === 0 ? '/images/Bedroom.png' : 
                      index === 1 ? '/images/Bathroom2.png' : 
                      index === 2 ? '/images/Dispensers.png' : 
                      '/images/Bathroom.png'
                    } 
                    alt={`RNBW устройство - ${t(`sections.${section.id}`, section.title, locale)}`} 
                    className="my-8"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Кнопка отправки формы внизу всех секций */}
          <div className="mt-12 flex justify-center">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="animate-pulse-slow hover:scale-105 transition-transform bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 px-8 py-3 text-lg"
            >
              {isSubmitting ? t('form.submitting', 'Отправка...', locale) : t('form.submit', 'Отправить ответы', locale)}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
} 