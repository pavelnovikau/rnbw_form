import { useState, useRef, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { surveyData, Question, QuestionOption } from '../lib/surveyQuestions';
import { Locale, t } from '../lib/i18n';

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

type SurveyFormProps = {
  locale: Locale;
  onSuccess?: () => void;
};

export function SurveyForm({ locale = 'ru', onSuccess }: SurveyFormProps) {
  const [activeSection, setActiveSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  console.log('SurveyForm: Rendering with locale:', locale);
  console.log('SurveyForm: First section title:', surveyData[0].title);
  console.log('SurveyForm: First question title:', surveyData[0].questions[0].title);
  
  // Создаем динамическую схему валидации на основе вопросов
  const formSchema = z.object(
    Object.fromEntries(
      surveyData.flatMap(section => 
        section.questions.map(question => {
          // Базовая схема в зависимости от типа вопроса
          let schema: any = z.any();
          
          if (question.type === 'text' || question.type === 'textarea') {
            schema = question.required 
              ? z.string().min(1, { message: t('error.required', 'Это поле обязательно для заполнения', locale) })
              : z.string().optional();
          } 
          else if (question.type === 'email') {
            schema = question.required
              ? z.string().min(1, { message: t('error.required', 'Это поле обязательно для заполнения', locale) }).email({ message: t('error.email', 'Пожалуйста, введите корректный email', locale) })
              : z.string().email({ message: t('error.email', 'Пожалуйста, введите корректный email', locale) }).optional();
          }
          else if (question.type === 'checkbox') {
            schema = question.required
              ? z.array(z.string()).min(1, { message: t('error.minSelection', 'Пожалуйста, выберите хотя бы один вариант', locale) })
              : z.array(z.string()).optional();
          }
          else if (question.type === 'radio') {
            schema = question.required
              ? z.string({ required_error: t('error.selection', 'Пожалуйста, выберите один из вариантов', locale) })
              : z.string().optional();
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
  };

  // Функция для навигации между секциями
  const scrollToSection = (index: number) => {
    if (index >= 0 && index < surveyData.length) {
      setActiveSection(index);
      sectionRefs.current[index]?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 gap-6 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-accent" />
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
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Навигация по секциям */}
      <div className="hidden md:flex items-center justify-between border-b mb-8 pb-2 overflow-x-auto gap-2">
        {surveyData.map((section, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`px-4 py-2 whitespace-nowrap text-sm rounded-md transition-all ${
              index === activeSection
                ? 'bg-accent text-accent-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/10'
            }`}
          >
            {t(`nav.${section.id}`, section.title, locale)}
          </button>
        ))}
      </div>
      
      {/* Мобильная навигация - текущий раздел */}
      <div className="md:hidden flex items-center justify-between border-b mb-8 pb-4">
        <div className="text-lg font-medium">
          {t(`nav.${surveyData[activeSection].id}`, surveyData[activeSection].title, locale)}
        </div>
        <div className="text-sm text-muted-foreground">
          {activeSection + 1} / {surveyData.length}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Интро текст */}
        <div className="prose prose-lg mb-8 animate-fade-in">
          <p>{t('form.intro', 'Итак, вот оно наше чудо устройство...', locale)}</p>
        </div>
        
        {/* Первое изображение - Ванная комната */}
        <SurveyImage 
          src="/images/Bathroom.png" 
          alt="Ванная комната с устройством RNBW" 
          className="my-8"
        />

        {surveyData.map((section, sectionIndex) => (
          <div 
            key={sectionIndex}
            ref={(el) => { sectionRefs.current[sectionIndex] = el; }}
            className={`space-y-6 transition-all duration-500 ${
              sectionIndex === activeSection 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-70 translate-y-4'
            }`}
          >
            {/* Особая вставка изображения перед разделом устройства */}
            {sectionIndex === 1 && (
              <SurveyImage 
                src="/images/Bedroom.png" 
                alt="Спальня с устройством RNBW" 
                className="my-8"
              />
            )}
            
            {/* Особая вставка изображения перед вопросом о компактном устройстве */}
            {sectionIndex === 2 && (
              <SurveyImage 
                src="/images/Bathroom2.png" 
                alt="Ванная комната с компактным устройством RNBW" 
                className="my-8"
              />
            )}
            
            {/* Особая вставка изображения перед разделом о смарт-бутылочках */}
            {sectionIndex === 3 && (
              <SurveyImage 
                src="/images/Dispensers.png" 
                alt="Дозаторы и бутылочки RNBW" 
                className="my-8"
              />
            )}
            
            {section.questions.map((question: Question) => {
              const errorMessage = errors[question.id]?.message;
              
              // Получение локализованного заголовка вопроса и описания
              const localizedTitle = t(`questions.${question.id}`, question.title, locale);
              const localizedDescription = question.description 
                ? t(`descriptions.${question.id}`, question.description, locale) 
                : undefined;
              
              return (
                <div 
                  key={question.id} 
                  className="rounded-lg border p-6 animate-fade-in animate-delay"
                  style={{ animationDelay: `${(sectionIndex * 0.1) + 0.1}s` }}
                >
                  <div className="mb-4">
                    <label htmlFor={question.id} className="text-lg font-medium block mb-2">
                      {localizedTitle}
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {localizedDescription && (
                      <p className="text-muted-foreground text-sm mb-4">{localizedDescription}</p>
                    )}
                  </div>
                  
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
                                <div key={option.value} className="flex items-start space-x-2 p-2 rounded-md hover:bg-accent/5">
                                  <input
                                    type="radio"
                                    id={`${question.id}-${option.value}`}
                                    value={option.value}
                                    checked={field.value === option.value}
                                    onChange={() => field.onChange(option.value)}
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
                </div>
              );
            })}
            
            {/* Навигационные кнопки в конце каждой секции */}
            {sectionIndex < surveyData.length - 1 ? (
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => scrollToSection(sectionIndex + 1)}
                  className="flex items-center gap-2 px-6 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors"
                >
                  {t('nav.next', 'Следующий раздел', locale)}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              /* Кнопка отправки только в последней секции */
              <div className="pt-8">
                <p className="mb-8 text-lg">
                  {t('form.outro', 'Ёу-ёу-ёу! Вопросы закончились! Спасибо большое :)', locale)}
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('form.submitting', 'Отправка...', locale)}
                    </>
                  ) : (
                    t('form.submit', 'Отправить ответы', locale)
                  )}
                </button>
              </div>
            )}
          </div>
        ))}
      </form>
    </div>
  );
} 