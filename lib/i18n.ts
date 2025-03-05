/**
 * Simple internationalization (i18n) utility for the RNBW survey form
 * This provides a foundation for adding multi-language support in the future
 */

export type Locale = 'ru' | 'en';

export const DEFAULT_LOCALE: Locale = 'ru';

export type Translations = {
  [key in Locale]: Record<string, string>;
};

export const translations: Translations = {
  ru: {
    // Общие
    'app.title': 'Опрос про парфюмерное устройство RNBW',
    'app.description': 'Благодарим, что решили помочь нам! Ваши ответы на эти вопросы помогут нам создать устройство мечты 🌈',
    'footer.copyright': '© {year} RNBW. Все права защищены.',
    
    // Навигация
    'nav.info': 'Информация',
    'nav.device': 'Устройство',
    'nav.features': 'Функции',
    'nav.bottles': 'Бутылочки',
    'nav.final': 'Финал',
    'nav.next': 'Следующий раздел',
    
    // Форма
    'form.name': 'Как тебя зовут:',
    'form.name.placeholder': 'Ваше имя',
    'form.email.placeholder': 'your.email@example.com',
    'form.textarea.placeholder': 'Напишите здесь...',
    'form.input.placeholder': 'Ваш ответ',
    'form.submit': 'Отправить ответы',
    'form.submitting': 'Отправка...',
    'form.intro': 'Итак, вот оно наше чудо устройство. Если рассказывать про него коротко, то он умеет брать ароматы ванили, кожи, красного грейпфрута и несколько десятков других ароматов из маленьких бутылочек и смешивать их в уникальную композицию подобранную специально для вас.',
    'form.outro': 'Ёу-ёу-ёу! Вопросы закончились! Спасибо большое :) Правда! Большое громадное спасибо!!! Мне ваши ответы сильно помогут. Можно я спрошу еще чуть-чуть?',
    
    // Сообщения об ошибках
    'error.required': 'Это поле обязательно для заполнения',
    'error.email': 'Пожалуйста, введите корректный email',
    'error.minSelection': 'Пожалуйста, выберите хотя бы один вариант',
    'error.selection': 'Пожалуйста, выберите один из вариантов',
    'error.submit': 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.',
    
    // Успешная отправка
    'success.title': 'Спасибо за ваш отзыв!',
    'success.message': 'Ваши ответы помогут нам создать лучший продукт. Мы ценим ваше время и внимание к деталям.',
    'success.button': 'Отправить еще один ответ',
    
    // Изображения
    'image.loading': 'Загрузка изображения...',
  },
  
  en: {
    // General
    'app.title': 'RNBW Perfume Device Survey',
    'app.description': 'Thank you for helping us! Your answers will help us create the dream device 🌈',
    'footer.copyright': '© {year} RNBW. All rights reserved.',
    
    // Navigation
    'nav.info': 'Information',
    'nav.device': 'Device',
    'nav.features': 'Features',
    'nav.bottles': 'Bottles',
    'nav.final': 'Final',
    'nav.next': 'Next section',
    
    // Form
    'form.name': 'Your name:',
    'form.name.placeholder': 'Your name',
    'form.email.placeholder': 'your.email@example.com',
    'form.textarea.placeholder': 'Write here...',
    'form.input.placeholder': 'Your answer',
    'form.submit': 'Submit answers',
    'form.submitting': 'Submitting...',
    'form.intro': 'So here it is, our wonder device. If we talk about it briefly, it can take aromas of vanilla, leather, red grapefruit, and several dozen other fragrances from small bottles and mix them into a unique composition tailored specifically for you.',
    'form.outro': 'Yay! The questions are over! Thank you very much :) Really! A huge thanks!!! Your answers will help me a lot. Can I ask just a little bit more?',
    
    // Error messages
    'error.required': 'This field is required',
    'error.email': 'Please enter a valid email',
    'error.minSelection': 'Please select at least one option',
    'error.selection': 'Please select one of the options',
    'error.submit': 'An error occurred while submitting the form. Please try again.',
    
    // Success submission
    'success.title': 'Thank you for your feedback!',
    'success.message': 'Your answers will help us create a better product. We appreciate your time and attention to detail.',
    'success.button': 'Submit another response',
    
    // Images
    'image.loading': 'Loading image...',
  }
};

/**
 * Translate a key to the current locale
 * @param key Translation key
 * @param defaultValue Default text to use if translation is not found
 * @param locale Locale to use (defaults to English)
 * @returns Translated text or default text
 */
export function t(key: string, defaultValue: string = '', locale: Locale = DEFAULT_LOCALE): string {
  if (!translations[locale]) return defaultValue || key;
  
  const translation = translations[locale][key];
  return translation || defaultValue || key;
}

/**
 * Set translations for a specific locale
 * @param locale Locale code (e.g., 'en', 'fr', 'es')
 * @param data Translations object
 */
export function setTranslations(locale: string, data: Translations): void {
  translations[locale] = data;
}

/**
 * Format a string with variables
 * @param text Text with placeholders (e.g., "Hello, {name}!")
 * @param variables Object with variable values (e.g., { name: "World" })
 * @returns Formatted string (e.g., "Hello, World!")
 */
export function formatMessage(message: string, values: Record<string, any> = {}): string {
  return message.replace(/{(\w+)}/g, (match, key) => {
    return values[key] !== undefined ? values[key] : match;
  });
}

// Export additional helpers for future use
export function getCurrentLocale(): string {
  // In the future, this could detect the user's preferred language
  // For now, just return the default locale
  return DEFAULT_LOCALE;
}

export function switchLocale(locale: Locale): boolean {
  if (locale === 'ru' || locale === 'en') {
    return true;
  }
  return false;
} 