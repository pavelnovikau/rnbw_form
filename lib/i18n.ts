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
    'form.occupation': 'Чем занимаешься?',
    'form.fragrance_use': 'Как часто ты пользуешься ароматами?',
    'form.email.placeholder': 'your.email@example.com',
    'form.textarea.placeholder': 'Напишите здесь...',
    'form.input.placeholder': 'Ваш ответ',
    'form.submit': 'Отправить ответы',
    'form.submitting': 'Отправка...',
    'form.intro': 'Итак, вот оно наше чудо устройство. Если рассказывать про него коротко, то он умеет брать ароматы ванили, кожи, красного грейпфрута и несколько десятков других ароматов из маленьких бутылочек и смешивать их в уникальную композицию подобранную специально для вас.',
    'form.outro': 'Ёу-ёу-ёу! Вопросы закончились! Спасибо большое :) Правда! Большое громадное спасибо!!! Мне ваши ответы сильно помогут. Можно я спрошу еще чуть-чуть?',
    
    // Разделы
    'sections.info': 'Информация',
    'sections.device': 'Устройство',
    'sections.features': 'Функции',
    'sections.bottles': 'Бутылочки',
    'sections.final': 'Финал',
    
    // Вопросы
    'questions.name': 'Как тебя зовут:',
    'questions.occupation': 'Чем занимаешься?',
    'questions.fragrance_use': 'Как часто ты пользуешься ароматами?',
    'questions.device_looks': 'Как тебе внешний вид устройства?',
    'questions.device_place': 'Где бы ты разместил(а) это устройство у себя дома?',
    'questions.compact_device': 'Хотел(а) бы ты, чтобы была более компактная модель устройства?',
    'questions.important_features': 'Какие функции устройства для тебя наиболее важны?',
    'questions.missing_features': 'Какие функции ты бы добавил(а) в устройство?',
    'questions.app_importance': 'Насколько важно для тебя наличие мобильного приложения для устройства?',
    'questions.bottles_design': 'Как тебе дизайн умных бутылочек?',
    'questions.bottles_count': 'Сколько разных ароматов (бутылочек) ты хотел(а) бы иметь в устройстве одновременно?',
    'questions.refill_preference': 'Как бы ты предпочел(ла) пополнять запасы ароматов?',
    'questions.price_range': 'Какую сумму ты готов(а) потратить на такое устройство?',
    'questions.final_feedback': 'Есть ли что-то еще, чем ты хотел(а) бы поделиться о концепции устройства?',
    'questions.email': 'Твой email для связи (если хочешь получать новости о проекте):',
    
    // Опции
    'options.daily': 'Ежедневно',
    'options.often': 'Часто',
    'options.sometimes': 'Иногда',
    'options.rarely': 'Редко',
    'options.bathroom': 'В ванной комнате',
    'options.bedroom': 'В спальне',
    'options.living_room': 'В гостиной',
    'options.hall': 'В прихожей',
    'options.other': 'Другое место',
    'options.yes': 'Да, предпочитаю меньший размер',
    'options.no': 'Нет, текущий размер оптимален',
    'options.depends': 'Зависит от функциональности',
    'options.smart_mixing': 'Умное смешивание ароматов',
    'options.app_control': 'Управление через мобильное приложение',
    'options.scheduling': 'Планирование расписания ароматов',
    'options.personalization': 'Персонализация ароматов',
    'options.mood_matching': 'Подбор аромата под настроение',
    'options.voice_control': 'Голосовое управление',
    'options.very_important': 'Очень важно',
    'options.important': 'Важно',
    'options.neutral': 'Нейтрально',
    'options.not_important': 'Не важно',
    'options.few': '3-5 ароматов',
    'options.medium_bottles': '6-10 ароматов',
    'options.many': 'Более 10 ароматов',
    'options.subscription': 'Регулярная подписка',
    'options.manual_order': 'Заказывать по мере необходимости',
    'options.retail': 'Покупать в магазинах',
    'options.low_price': 'До 10 000 рублей',
    'options.medium_price': 'От 10 000 до 20 000 рублей',
    'options.high_price': 'От 20 000 до 30 000 рублей',
    'options.premium': 'Более 30 000 рублей',
    
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
    'form.occupation': 'What do you do?',
    'form.fragrance_use': 'How often do you use fragrances?',
    'form.email.placeholder': 'your.email@example.com',
    'form.textarea.placeholder': 'Write here...',
    'form.input.placeholder': 'Your answer',
    'form.submit': 'Submit answers',
    'form.submitting': 'Submitting...',
    'form.intro': 'So here it is, our wonder device. If we talk about it briefly, it can take aromas of vanilla, leather, red grapefruit, and several dozen other fragrances from small bottles and mix them into a unique composition tailored specifically for you.',
    'form.outro': 'Yay! The questions are over! Thank you very much :) Really! A huge thanks!!! Your answers will help me a lot. Can I ask just a little bit more?',
    
    // Sections
    'sections.info': 'Information',
    'sections.device': 'Device',
    'sections.features': 'Features',
    'sections.bottles': 'Bottles',
    'sections.final': 'Final',
    
    // Questions
    'questions.name': 'Your name:',
    'questions.occupation': 'What do you do?',
    'questions.fragrance_use': 'How often do you use fragrances?',
    'questions.device_looks': 'What do you think about the device appearance?',
    'questions.device_place': 'Where would you place this device in your home?',
    'questions.compact_device': 'Would you like to have a more compact device model?',
    'questions.important_features': 'Which device functions are most important to you?',
    'questions.missing_features': 'What features would you add to the device?',
    'questions.app_importance': 'How important is having a mobile app for the device to you?',
    'questions.bottles_design': 'What do you think about the smart bottles design?',
    'questions.bottles_count': 'How many different fragrances (bottles) would you like to have in the device at the same time?',
    'questions.refill_preference': 'How would you prefer to replenish your fragrance supplies?',
    'questions.price_range': 'How much are you willing to spend on such a device?',
    'questions.final_feedback': 'Is there anything else you would like to share about the device concept?',
    'questions.email': 'Your email for contact (if you want to receive project news):',
    
    // Options
    'options.daily': 'Daily',
    'options.often': 'Often',
    'options.sometimes': 'Sometimes',
    'options.rarely': 'Rarely',
    'options.bathroom': 'In the bathroom',
    'options.bedroom': 'In the bedroom',
    'options.living_room': 'In the living room',
    'options.hall': 'In the hallway',
    'options.other': 'Other place',
    'options.yes': 'Yes, I prefer a smaller size',
    'options.no': 'No, the current size is optimal',
    'options.depends': 'Depends on functionality',
    'options.smart_mixing': 'Smart fragrance mixing',
    'options.app_control': 'Mobile app control',
    'options.scheduling': 'Fragrance schedule planning',
    'options.personalization': 'Fragrance personalization',
    'options.mood_matching': 'Mood-based fragrance selection',
    'options.voice_control': 'Voice control',
    'options.very_important': 'Very important',
    'options.important': 'Important',
    'options.neutral': 'Neutral',
    'options.not_important': 'Not important',
    'options.few': '3-5 fragrances',
    'options.medium_bottles': '6-10 fragrances',
    'options.many': 'More than 10 fragrances',
    'options.subscription': 'Regular subscription',
    'options.manual_order': 'Order as needed',
    'options.retail': 'Buy in stores',
    'options.low_price': 'Up to $150',
    'options.medium_price': '$150 - $300',
    'options.high_price': '$300 - $450',
    'options.premium': 'More than $450',
    
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
 * @param locale Locale to use (defaults to Russian)
 * @returns Translated text or default text
 */
export function t(key: string, defaultValue: string = '', locale: Locale = DEFAULT_LOCALE): string {
  // Проверяем, есть ли такая локаль в нашем объекте переводов
  if (!translations[locale]) {
    console.warn(`Locale "${locale}" not found, using default value`);
    return defaultValue || key;
  }
  
  // Получаем перевод по ключу
  const translation = translations[locale][key];
  
  // Если перевод не найден, используем дефолтное значение или ключ
  if (!translation) {
    console.warn(`Translation key "${key}" not found in locale "${locale}", using default value`);
    return defaultValue || key;
  }
  
  return translation;
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