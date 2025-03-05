import { z } from 'zod';

// Типы вопросов и ответов
export type QuestionType = 'text' | 'textarea' | 'radio' | 'checkbox' | 'email';

export type QuestionOption = {
  value: string;
  label: string;
  description?: string;
};

export type Question = {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  options?: QuestionOption[];
  required?: boolean;
};

export type SurveySection = {
  id: string;
  title: string;
  questions: Question[];
};

// Define our survey data
export const surveyData: SurveySection[] = [
  {
    id: 'info',
    title: 'Информация',
    questions: [
      {
        id: 'name',
        type: 'text',
        title: 'Как тебя зовут:'
      },
      {
        id: 'age',
        type: 'text',
        title: 'Сколько тебе лет (по паспорту). Да ладно, не говори, если не хочешь:'
      },
      {
        id: 'fragrance_use',
        type: 'radio',
        title: 'Как часто ты пользуешься парфюмерией:',
        options: [
          { value: 'daily', label: 'Почти каждый день' },
          { value: 'weekly', label: 'Почти каждую неделю' },
          { value: 'sometimes', label: 'Время от времени' }
        ]
      },
      {
        id: 'gender',
        type: 'radio',
        title: 'Мне кажется, что я:',
        options: [
          { value: 'female', label: 'Женщина' },
          { value: 'male', label: 'Мужчина' },
          { value: 'unknown', label: 'Да хрен его знает' },
          { value: 'private', label: 'Вас это волновать не должно' }
        ]
      },
      {
        id: 'bottles_bought',
        type: 'radio',
        title: 'Сколько бутылочек парфюма ты купил(а) за последний год:',
        options: [
          { value: 'few', label: '1-2 бутылочки' },
          { value: 'some', label: '3-4 бутылочки' },
          { value: 'many', label: 'А кто их считает?' }
        ]
      },
      {
        id: 'important_factors',
        type: 'checkbox',
        title: 'Когда я выбираю парфюм мне важно:',
        options: [
          { value: 'brand', label: 'Бренд' },
          { value: 'design', label: 'Дизайн коробочки и бутылочки' },
          { value: 'fragrance', label: 'Аромат' },
          { value: 'price', label: 'Цена' },
          { value: 'reviews', label: 'Что я про него слышал(а) от других' }
        ]
      },
      {
        id: 'other_factors',
        type: 'text',
        title: 'Другое:'
      }
    ]
  },
  {
    id: 'device',
    title: 'Устройство',
    questions: [
      {
        id: 'ai_feature',
        type: 'radio',
        title: 'Наше замечательное устройство может с помощью искусственного интеллекта и с вашей помощью подстраиваться под погоду, ваше настроение, ваше расписание или под время суток и делать парфюм, который идеально подходит именно к этому моменту. Как вы думаете:',
        options: [
          { value: 'awesome', label: 'Это офигенно!' },
          { value: 'cool', label: 'Это прикольно!' },
          { value: 'maybe', label: 'Ну, наверное, я бы таким пользовался' },
          { value: 'unclear', label: 'Непонятно зачем и кому это надо' },
          { value: 'nonsense', label: 'Бред какой-то' }
        ]
      },
      {
        id: 'unique_feature',
        type: 'radio',
        title: 'Это устройство может сделать УНИКАЛЬНЫЙ парфюм, которого больше ни у кого нет. Как вы думаете:',
        options: [
          { value: 'awesome', label: 'Это офигенно!' },
          { value: 'cool', label: 'Это прикольно!' },
          { value: 'maybe', label: 'Ну, наверное, я бы таким пользовался' },
          { value: 'unclear', label: 'Непонятно зачем и кому это надо' },
          { value: 'nonsense', label: 'Бред какой-то' }
        ]
      },
      {
        id: 'compact_feature',
        type: 'radio',
        title: 'Небольшая коробочка, размер с толстую книгу, стоит на вашей полочке и при этом содержит 1001 (тысяча один) РАЗНЫХ бутылочек парфюма. Как вы думаете:',
        options: [
          { value: 'awesome', label: 'Это офигенно!' },
          { value: 'cool', label: 'Это прикольно!' },
          { value: 'maybe', label: 'Ну, наверное, я бы таким пользовался' },
          { value: 'unclear', label: 'Непонятно зачем и кому это надо' },
          { value: 'nonsense', label: 'Бред какой-то' }
        ]
      }
    ]
  },
  {
    id: 'features',
    title: 'Функции',
    questions: [
      {
        id: 'game_feature',
        type: 'radio',
        title: 'Возможно это несколько неожиданно, но кроме всего прочего устройство может развлекать и обучать вас. В нем есть режим игры, где коробочка выдаёт случайный запах, один для начала и пять, если вы хорошо разбираетесь в запахах, а вам надо угадать был это аромат розы, табака или пачули. За правильный ответ вы получаете баллы, чем сложнее, тем больше. Баллы можно обменять на другую косметику.',
        options: [
          { value: 'awesome', label: 'Это офигенно!' },
          { value: 'cool', label: 'Это прикольно!' },
          { value: 'maybe', label: 'Ну, наверное, я бы таким пользовался' },
          { value: 'unclear', label: 'Непонятно зачем и кому это надо' },
          { value: 'nonsense', label: 'Бред какой-то' }
        ]
      },
      {
        id: 'expert_feature',
        type: 'radio',
        title: 'Если вы стали экспертом в ароматах, то вы можете предъявить это знание миру. Как лучший парфюмер Франции вы можете создать свой запах, дать ему имя и опубликовать в турнирной таблице. Другие пользователи голосуют. Запах недели, месяца или года получает приз.',
        options: [
          { value: 'awesome', label: 'Это офигенно!' },
          { value: 'cool', label: 'Это прикольно!' },
          { value: 'maybe', label: 'Ну, наверное, я бы таким пользовался' },
          { value: 'unclear', label: 'Непонятно зачем и кому это надо' },
          { value: 'nonsense', label: 'Бред какой-то' }
        ]
      },
      {
        id: 'top_fragrances',
        type: 'radio',
        title: 'Или как вам идея интереснее понюхать и пользоваться тем, что уже находится в топе турнирной таблицы? Ароматы созданные лучшими носами мира, подкрепленные тысячами отзывов пользователей, мне кажется, точно не могут пахнуть плохо:',
        options: [
          { value: 'awesome', label: 'Это офигенно!' },
          { value: 'cool', label: 'Это прикольно!' },
          { value: 'maybe', label: 'Ну, наверное, я бы таким пользовался' },
          { value: 'unclear', label: 'Непонятно зачем и кому это надо' },
          { value: 'nonsense', label: 'Бред какой-то' }
        ]
      },
      {
        id: 'gift_feature',
        type: 'radio',
        title: 'А как насчёт того, чтобы создать запах для парфюма и превратить его в уникальный подарок для своего партнера или друга/подруги?',
        options: [
          { value: 'awesome', label: 'Это офигенно!' },
          { value: 'cool', label: 'Это прикольно!' },
          { value: 'maybe', label: 'Ну, наверное, я бы таким пользовался' },
          { value: 'unclear', label: 'Непонятно зачем и кому это надо' },
          { value: 'nonsense', label: 'Бред какой-то' }
        ]
      },
      {
        id: 'brand_testing',
        type: 'radio',
        title: 'Твой любимый бренд выпустил новую туалетную воду, но не ехать же ради этого в магазин. Как насчет того, чтобы понюхать этот аромат дома ведь устройство его легко приготовит?',
        options: [
          { value: 'awesome', label: 'Это офигенно!' },
          { value: 'cool', label: 'Это прикольно!' },
          { value: 'maybe', label: 'Ну, наверное, я бы таким пользовался' },
          { value: 'unclear', label: 'Непонятно зачем и кому это надо' },
          { value: 'nonsense', label: 'Бред какой-то' }
        ]
      }
    ]
  },
  {
    id: 'bottles',
    title: 'Бутылочки',
    questions: [
      {
        id: 'smart_bottles',
        type: 'radio',
        title: 'Важная часть нашего устройства вот такие бутылочки. Это умные устройства, которые заправляются на день парфюмерией, что вы выбрали, а потом напоминают вам время от времени освежить аромат.',
        options: [
          { value: 'awesome', label: 'Это офигенно!' },
          { value: 'cool', label: 'Это прикольно!' },
          { value: 'maybe', label: 'Ну, наверное, я бы таким пользовался' },
          { value: 'unclear', label: 'Непонятно зачем и кому это надо' },
          { value: 'nonsense', label: 'Бред какой-то' }
        ]
      },
      {
        id: 'eco_friendly',
        type: 'radio',
        title: 'Бутылочки универсальны и легко могут быть перезаправлены новым ароматом. Вам больше не надо их выкидывать и загрязнять окружающую среду.',
        options: [
          { value: 'awesome', label: 'Это офигенно!' },
          { value: 'cool', label: 'Это прикольно!' },
          { value: 'maybe', label: 'Ну, наверное, я бы таким пользовался' },
          { value: 'unclear', label: 'Непонятно зачем и кому это надо' },
          { value: 'nonsense', label: 'Бред какой-то' }
        ]
      },
      {
        id: 'in_store_scan',
        type: 'radio',
        title: 'Вы заходите в парфюмерный магазин, нюхаете аромат, он вам нравится, вы фотографируете коробку и устройство готовит такой же аромат для вас.',
        options: [
          { value: 'awesome', label: 'Это офигенно!' },
          { value: 'cool', label: 'Это прикольно!' },
          { value: 'maybe', label: 'Ну, наверное, я бы таким пользовался' },
          { value: 'unclear', label: 'Непонятно зачем и кому это надо' },
          { value: 'nonsense', label: 'Бред какой-то' }
        ]
      }
    ]
  },
  {
    id: 'final',
    title: 'Финал',
    questions: [
      {
        id: 'brand_name',
        type: 'radio',
        title: 'Что вы думаете про название RNBW (Rainbow). Это как радуга из ароматов. Полный спектр от бирюзового моря до красной розы.',
        options: [
          { value: 'great', label: 'Отличное название' },
          { value: 'ok', label: 'Норм, но я сразу не догнал(а)' },
          { value: 'musk_kid', label: 'Хорошое название для очередного ребенка Маска' },
          { value: 'bad', label: 'Херня какая-то' }
        ]
      },
      {
        id: 'expected_price',
        type: 'radio',
        title: 'А как вы думаете, когда мы выйдем на рынок, сколько такое устройство должно по вашему стоить (чем точнее вы угадаете цену, тем больше будет скидка)?',
        options: [
          { value: 'low', label: '200-300 евро' },
          { value: 'medium', label: '301-600 евро' },
          { value: 'high', label: '601 или выше евро' }
        ]
      },
      {
        id: 'willing_to_pay',
        type: 'radio',
        title: 'Со стоимостью разобрались. А вы бы хотели купить себе такое устройство? А сколько бы были готовы за него заплатить вы?',
        options: [
          { value: 'not_interested', label: 'Не, мне такое бесплатно не надо' },
          { value: 'pay_low', label: '200-300 евро' },
          { value: 'pay_medium', label: '301-600 евро' },
          { value: 'pay_high', label: '601 или выше евро' }
        ]
      },
      {
        id: 'email',
        type: 'email',
        title: 'А вот это уже совсем опционально. Но, если ты хочешь узнать когда выйдёт нашу устройство и получить супер-пупер-мега скидку, то оставь свой email куда тебе эту скидку прислать:',
        description: 'Мы не будем использовать его для спама, только для информации о запуске'
      }
    ]
  }
];

// Функция для получения вопроса по ID
export function getQuestionById(id: string): Question | undefined {
  for (const section of surveyData) {
    const question = section.questions.find(q => q.id === id);
    if (question) return question;
  }
  return undefined;
}

// Helper function for translations (to be expanded later)
export const getTranslatedQuestion = (question: Question, locale = 'ru'): string => {
  // For now, just return the default title
  // In the future, this would use the localization system
  return question.title;
};

export const getTranslatedOption = (option: QuestionOption, locale = 'ru'): string => {
  // For now, just return the default text
  // In the future, this would use the localization system
  return option.label;
}; 