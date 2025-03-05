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
    'nav.previous': 'Предыдущий раздел',
    
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
    'questions.ai_feature': 'Наше устройство может изучать ваши предпочтения и адаптироваться к вашему настроению. Оно будет предлагать ароматы в зависимости от времени суток, погоды и ваших предыдущих выборов.',
    'questions.unique_feature': 'Наше устройство может создать уникальный парфюм специально для вас. Оно проанализирует ваши предпочтения и создаст аромат, которого нет ни у кого другого.',
    'questions.compact_feature': 'Наше устройство компактно и может поместиться на вашем столе. Оно может вмещать до 10 различных ароматов и смешивать их в любой пропорции.',
    'questions.game_feature': 'Наше устройство может превратить выбор аромата в игру. Вы можете играть с друзьями, угадывая ароматы или создавая самые интересные комбинации.',
    'questions.expert_feature': 'Наше устройство может научить вас быть экспертом в парфюмерии. Оно поможет вам понять ноты и композиции различных ароматов.',
    'questions.smart_bottles': 'Важная часть нашего устройства вот такие бутылочки. Это умные устройства, которые заправляются на день парфюмерией, что вы выбрали, а потом напоминают вам время от времени освежить аромат.',
    'questions.eco_friendly': 'Бутылочки универсальны и легко могут быть перезаправлены новым ароматом. Вам больше не надо их выкидывать и загрязнять окружающую среду.',
    'questions.in_store_scan': 'Вы заходите в парфюмерный магазин, нюхаете аромат, он вам нравится, вы фотографируете коробку и устройство готовит такой же аромат для вас.',
    'questions.brand_name': 'Что вы думаете про название RNBW (Rainbow). Это как радуга из ароматов. Полный спектр от бирюзового моря до красной розы.',
    'questions.expected_price': 'А как вы думаете, когда мы выйдем на рынок, сколько такое устройство должно по вашему стоить (чем точнее вы угадаете цену, тем больше будет скидка)?',
    'questions.willing_to_pay': 'Со стоимостью разобрались. А вы бы хотели купить себе такое устройство? А сколько бы были готовы за него заплатить вы?',
    'questions.email': 'А вот это уже совсем опционально. Но, если ты хочешь узнать когда выйдёт нашу устройство и получить супер-пупер-мега скидку, то оставь свой email куда тебе эту скидку прислать:',
    
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
    'options.awesome': 'Это офигенно!',
    'options.cool': 'Это прикольно!',
    'options.maybe': 'Ну, наверное, я бы таким пользовался',
    'options.unclear': 'Непонятно зачем и кому это надо',
    'options.nonsense': 'Бред какой-то',
    'options.great': 'Отличное название',
    'options.ok': 'Норм, но я сразу не догнал(а)',
    'options.musk_kid': 'Хорошое название для очередного ребенка Маска',
    'options.bad': 'Херня какая-то',
    'options.low': '200-300 евро',
    'options.medium': '301-600 евро',
    'options.high': '601 или выше евро',
    'options.not_interested': 'Не, мне такое бесплатно не надо',
    'options.pay_low': '200-300 евро',
    'options.pay_medium': '301-600 евро',
    'options.pay_high': '601 или выше евро',
    
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
    
    // Темы
    'theme.toggle': 'Переключить тему',
    'theme.light': 'Светлая тема',
    'theme.dark': 'Темная тема',
    
    // Описания
    'descriptions.device_looks': 'Поделись впечатлениями о дизайне, материалах и общем впечатлении',
    'descriptions.missing_features': 'Не стесняйся предлагать самые смелые идеи',
    'descriptions.email': 'Мы не будем использовать его для спама, только для информации о запуске',
    
    // Описания опций
    'option_descriptions.daily': 'Пользуюсь каждый день',
    'option_descriptions.often': 'Несколько раз в неделю',
    'option_descriptions.sometimes': 'По особым случаям',
    'option_descriptions.rarely': 'Практически не пользуюсь',
    'option_descriptions.few': 'Для создания базовых композиций',
    'option_descriptions.medium': 'Для создания разнообразных композиций',
    'option_descriptions.many': 'Для максимального разнообразия',
    'option_descriptions.subscription': 'Автоматическая доставка новых ароматов',
    'option_descriptions.manual_order': 'Самостоятельно выбирать и заказывать новые ароматы',
    'option_descriptions.retail': 'Приобретать в розничных точках продаж',
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
    'nav.previous': 'Previous section',
    
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
    'questions.ai_feature': 'Our device can learn your preferences and adapt to your mood. It will suggest fragrances based on the time of day, weather, and your previous choices.',
    'questions.unique_feature': 'Our device can create a unique perfume just for you. It will analyze your preferences and create a fragrance that no one else has.',
    'questions.compact_feature': 'Our device is compact and can fit on your desk. It can hold up to 10 different fragrances and mix them in any proportion.',
    'questions.game_feature': 'Our device can turn fragrance selection into a game. You can play with friends to guess fragrances or create the most interesting combinations.',
    'questions.expert_feature': 'Our device can teach you to be a perfume expert. It will help you understand the notes and compositions of different fragrances.',
    'questions.smart_bottles': 'An important part of our device is these smart bottles. They are filled with your chosen perfume for the day and remind you to refresh your fragrance from time to time.',
    'questions.eco_friendly': 'The bottles are universal and can be easily refilled with a new fragrance. You no longer need to throw them away and pollute the environment.',
    'questions.in_store_scan': 'You enter a perfume store, smell a fragrance you like, take a photo of the box, and the device prepares the same fragrance for you.',
    'questions.brand_name': 'What do you think about the name RNBW (Rainbow)? It\'s like a rainbow of fragrances. A full spectrum from turquoise sea to red rose.',
    'questions.expected_price': 'And what do you think, when we enter the market, how much should such a device cost in your opinion (the more accurately you guess the price, the bigger the discount)?',
    'questions.willing_to_pay': 'We\'ve figured out the cost. Would you like to buy such a device? And how much would you be willing to pay for it?',
    'questions.email': 'This is completely optional. But if you want to know when our device will be released and get a super-duper-mega discount, leave your email where we can send this discount:',
    
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
    'options.awesome': 'This is awesome!',
    'options.cool': 'This is cool!',
    'options.maybe': 'Well, maybe I would use something like this',
    'options.unclear': 'Not clear why or who needs this',
    'options.nonsense': 'This is nonsense',
    'options.great': 'Great name',
    'options.ok': 'It\'s okay, but I didn\'t get it right away',
    'options.musk_kid': 'Good name for another Musk child',
    'options.bad': 'This is crap',
    'options.low': '200-300 euros',
    'options.medium': '301-600 euros',
    'options.high': '601 or more euros',
    'options.not_interested': 'No, I don\'t want it even for free',
    'options.pay_low': '200-300 euros',
    'options.pay_medium': '301-600 euros',
    'options.pay_high': '601 or more euros',
    
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
    
    // Themes
    'theme.toggle': 'Toggle theme',
    'theme.light': 'Light theme',
    'theme.dark': 'Dark theme',
    
    // Descriptions
    'descriptions.device_looks': 'Share your impressions about the design, materials, and overall look',
    'descriptions.missing_features': 'Feel free to suggest your boldest ideas',
    'descriptions.email': 'We will not use it for spam, only for information about the launch',
    
    // Option descriptions
    'option_descriptions.daily': 'I use it every day',
    'option_descriptions.often': 'Several times a week',
    'option_descriptions.sometimes': 'For special occasions',
    'option_descriptions.rarely': 'Almost never use',
    'option_descriptions.few': 'For creating basic compositions',
    'option_descriptions.medium': 'For creating diverse compositions',
    'option_descriptions.many': 'For maximum variety',
    'option_descriptions.subscription': 'Automatic delivery of new fragrances',
    'option_descriptions.manual_order': 'Choose and order new fragrances yourself',
    'option_descriptions.retail': 'Purchase at retail outlets',
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
export function setTranslations(locale: Locale, data: Record<string, string>): void {
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