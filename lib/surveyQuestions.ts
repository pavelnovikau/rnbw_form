import { z } from 'zod';

// Define types for our survey data structure
export type QuestionOption = {
  id: string;
  localizationKey: string;
  defaultText: string;
};

export type Question = {
  id: string;
  localizationKey: string;
  defaultTitle: string;
  type: 'radio' | 'checkbox' | 'text' | 'textarea' | 'email';
  required?: boolean;
  options?: QuestionOption[];
};

export type SurveySection = {
  id: string;
  localizationKey: string;
  defaultTitle: string;
  questions: Question[];
};

// Define our survey data
export const surveyData: SurveySection[] = [
  {
    id: 'intro',
    localizationKey: 'sections.intro',
    defaultTitle: 'Общая информация',
    questions: [
      {
        id: 'name',
        localizationKey: 'questions.name',
        defaultTitle: 'Как тебя зовут:',
        type: 'text',
        required: true
      },
      {
        id: 'age',
        localizationKey: 'questions.age',
        defaultTitle: 'Сколько тебе лет (по паспорту). Да ладно, не говори, если не хочешь:',
        type: 'text',
        required: false
      },
      {
        id: 'perfume_frequency',
        localizationKey: 'questions.perfume_frequency',
        defaultTitle: 'Как часто ты пользуешься парфюмерией:',
        type: 'radio',
        required: true,
        options: [
          {
            id: 'daily',
            localizationKey: 'options.daily',
            defaultText: 'Почти каждый день'
          },
          {
            id: 'weekly',
            localizationKey: 'options.weekly',
            defaultText: 'Почти каждую неделю'
          },
          {
            id: 'occasionally',
            localizationKey: 'options.occasionally',
            defaultText: 'Время от времени'
          }
        ]
      },
      {
        id: 'gender',
        localizationKey: 'questions.gender',
        defaultTitle: 'Мне кажется, что я:',
        type: 'radio',
        required: true,
        options: [
          {
            id: 'female',
            localizationKey: 'options.female',
            defaultText: 'Женщина'
          },
          {
            id: 'male',
            localizationKey: 'options.male',
            defaultText: 'Мужчина'
          },
          {
            id: 'not_sure',
            localizationKey: 'options.not_sure',
            defaultText: 'Да хрен его знает'
          },
          {
            id: 'private',
            localizationKey: 'options.private',
            defaultText: 'Вас это волновать не должно'
          }
        ]
      },
      {
        id: 'perfume_purchases',
        localizationKey: 'questions.perfume_purchases',
        defaultTitle: 'Сколько бутылочек парфюма ты купил(а) за последний год:',
        type: 'radio',
        required: true,
        options: [
          {
            id: 'one_to_two',
            localizationKey: 'options.one_to_two',
            defaultText: '1-2 бутылочки'
          },
          {
            id: 'three_to_four',
            localizationKey: 'options.three_to_four',
            defaultText: '3-4 бутылочки'
          },
          {
            id: 'many',
            localizationKey: 'options.many',
            defaultText: 'А кто их считает?'
          }
        ]
      },
      {
        id: 'perfume_factors',
        localizationKey: 'questions.perfume_factors',
        defaultTitle: 'Когда я выбираю парфюм мне важно:',
        type: 'checkbox',
        required: false,
        options: [
          {
            id: 'brand',
            localizationKey: 'options.brand',
            defaultText: 'Бренд'
          },
          {
            id: 'design',
            localizationKey: 'options.design',
            defaultText: 'Дизайн коробочки и бутылочки'
          },
          {
            id: 'fragrance',
            localizationKey: 'options.fragrance',
            defaultText: 'Аромат'
          },
          {
            id: 'price',
            localizationKey: 'options.price',
            defaultText: 'Цена'
          },
          {
            id: 'recommendations',
            localizationKey: 'options.recommendations',
            defaultText: 'Что я про него слышал(а) от других'
          },
          {
            id: 'other',
            localizationKey: 'options.other',
            defaultText: 'Другое'
          }
        ]
      }
    ]
  },
  {
    id: 'device_features',
    localizationKey: 'sections.device_features',
    defaultTitle: 'Оценка функций устройства',
    questions: [
      {
        id: 'adaptive_scent',
        localizationKey: 'questions.adaptive_scent',
        defaultTitle: 'Наше замечательное устройство может с помощью искусственного интеллекта и с вашей помощью подстраиваться под погоду, ваше настроение, ваше расписание или под время суток и делать парфюм, который идеально подходит именно к этому моменту. Как вы думаете:',
        type: 'radio',
        required: true,
        options: [
          {
            id: 'awesome',
            localizationKey: 'options.awesome',
            defaultText: 'Это офигенно!'
          },
          {
            id: 'cool',
            localizationKey: 'options.cool',
            defaultText: 'Это прикольно!'
          },
          {
            id: 'maybe_use',
            localizationKey: 'options.maybe_use',
            defaultText: 'Ну, наверное, я бы таким пользовался'
          },
          {
            id: 'not_sure',
            localizationKey: 'options.not_sure',
            defaultText: 'Непонятно зачем и кому это надо'
          },
          {
            id: 'nonsense',
            localizationKey: 'options.nonsense',
            defaultText: 'Бред какой-то'
          }
        ]
      },
      {
        id: 'unique_scent',
        localizationKey: 'questions.unique_scent',
        defaultTitle: 'Это устройство может сделать УНИКАЛЬНЫЙ парфюм, которого больше не ни кого. Как вы думаете:',
        type: 'radio',
        required: true,
        options: [
          {
            id: 'awesome',
            localizationKey: 'options.awesome',
            defaultText: 'Это офигенно!'
          },
          {
            id: 'cool',
            localizationKey: 'options.cool',
            defaultText: 'Это прикольно!'
          },
          {
            id: 'maybe_use',
            localizationKey: 'options.maybe_use',
            defaultText: 'Ну, наверное, я бы таким пользовался'
          },
          {
            id: 'not_sure',
            localizationKey: 'options.not_sure',
            defaultText: 'Непонятно зачем и кому это надо'
          },
          {
            id: 'nonsense',
            localizationKey: 'options.nonsense',
            defaultText: 'Бред какой-то'
          }
        ]
      },
      {
        id: 'compact_device',
        localizationKey: 'questions.compact_device',
        defaultTitle: 'Небольшая коробочка, размер с толстую книгу, стоит на вашей полочке и при этом содержит 1001 (тысяча один) РАЗНЫХ бутылочек парфюма. Как вы думаете:',
        type: 'radio',
        required: true,
        options: [
          {
            id: 'awesome',
            localizationKey: 'options.awesome',
            defaultText: 'Это офигенно!'
          },
          {
            id: 'cool',
            localizationKey: 'options.cool',
            defaultText: 'Это прикольно!'
          },
          {
            id: 'maybe_use',
            localizationKey: 'options.maybe_use',
            defaultText: 'Ну, наверное, я бы таким пользовался'
          },
          {
            id: 'not_sure',
            localizationKey: 'options.not_sure',
            defaultText: 'Непонятно зачем и кому это надо'
          },
          {
            id: 'nonsense',
            localizationKey: 'options.nonsense',
            defaultText: 'Бред какой-то'
          }
        ]
      }
    ]
  },
  {
    id: 'interactive_features',
    localizationKey: 'sections.interactive_features',
    defaultTitle: 'Интерактивные функции',
    questions: [
      {
        id: 'game_mode',
        localizationKey: 'questions.game_mode',
        defaultTitle: 'Возможно это несколько неожиданно, но кроме всего прочего устройство может развлекать и обучать вас. В нем есть режим игры, где коробочка выдаёт случайный запах, один для начала и пять, если вы хорошо разбираетесь в запахах, а вам надо угадать был это аромат розы, табака или пачули. За правильный ответ вы получаете баллы, чем сложнее, тем больше. Баллы можно обменять на другую косметику.',
        type: 'radio',
        required: true,
        options: [
          {
            id: 'awesome',
            localizationKey: 'options.awesome',
            defaultText: 'Это офигенно!'
          },
          {
            id: 'cool',
            localizationKey: 'options.cool',
            defaultText: 'Это прикольно!'
          },
          {
            id: 'maybe_use',
            localizationKey: 'options.maybe_use',
            defaultText: 'Ну, наверное, я бы таким пользовался'
          },
          {
            id: 'not_sure',
            localizationKey: 'options.not_sure',
            defaultText: 'Непонятно зачем и кому это надо'
          },
          {
            id: 'nonsense',
            localizationKey: 'options.nonsense',
            defaultText: 'Бред какой-то'
          }
        ]
      },
      {
        id: 'create_publish',
        localizationKey: 'questions.create_publish',
        defaultTitle: 'Если вы стали экспертом в ароматах, то вы можете предъявить это знание миру. Как лучший парфюмер Франции вы можете создать свой запах, дать ему имя и опубликовать в турнирной таблице. Другие пользователи голосуют. Запах недели, месяца или года получает приз.',
        type: 'radio',
        required: true,
        options: [
          {
            id: 'awesome',
            localizationKey: 'options.awesome',
            defaultText: 'Это офигенно!'
          },
          {
            id: 'cool',
            localizationKey: 'options.cool',
            defaultText: 'Это прикольно!'
          },
          {
            id: 'maybe_use',
            localizationKey: 'options.maybe_use',
            defaultText: 'Ну, наверное, я бы таким пользовался'
          },
          {
            id: 'not_sure',
            localizationKey: 'options.not_sure',
            defaultText: 'Непонятно зачем и кому это надо'
          },
          {
            id: 'nonsense',
            localizationKey: 'options.nonsense',
            defaultText: 'Бред какой-то'
          }
        ]
      },
      {
        id: 'try_top_scents',
        localizationKey: 'questions.try_top_scents',
        defaultTitle: 'Или как вам идея интереснее понюхать и пользоваться тем, что уже находится в топе турнирной таблицы? Ароматы созданные лучшими носами мира, подкрепленные тысячами отзывов пользователей, мне кажется, точно не могут пахнуть плохо:',
        type: 'radio',
        required: true,
        options: [
          {
            id: 'awesome',
            localizationKey: 'options.awesome',
            defaultText: 'Это офигенно!'
          },
          {
            id: 'cool',
            localizationKey: 'options.cool',
            defaultText: 'Это прикольно!'
          },
          {
            id: 'maybe_use',
            localizationKey: 'options.maybe_use',
            defaultText: 'Ну, наверное, я бы таким пользовался'
          },
          {
            id: 'not_sure',
            localizationKey: 'options.not_sure',
            defaultText: 'Непонятно зачем и кому это надо'
          },
          {
            id: 'nonsense',
            localizationKey: 'options.nonsense',
            defaultText: 'Бред какой-то'
          }
        ]
      },
      {
        id: 'unique_gift',
        localizationKey: 'questions.unique_gift',
        defaultTitle: 'А как насчёт того, чтобы создать запах для парфюма и превратить его в уникальный подарок для своего партнера или друга/подруги?',
        type: 'radio',
        required: true,
        options: [
          {
            id: 'awesome',
            localizationKey: 'options.awesome',
            defaultText: 'Это офигенно!'
          },
          {
            id: 'cool',
            localizationKey: 'options.cool',
            defaultText: 'Это прикольно!'
          },
          {
            id: 'maybe_use',
            localizationKey: 'options.maybe_use',
            defaultText: 'Ну, наверное, я бы таким пользовался'
          },
          {
            id: 'not_sure',
            localizationKey: 'options.not_sure',
            defaultText: 'Непонятно зачем и кому это надо'
          },
          {
            id: 'nonsense',
            localizationKey: 'options.nonsense',
            defaultText: 'Бред какой-то'
          }
        ]
      },
      {
        id: 'try_home',
        localizationKey: 'questions.try_home',
        defaultTitle: 'Твой любимый бренд выпустил новую туалетную воду, но не ехать же ради этого в магазин. Как насчет того, чтобы понюхать этот аромат дома ведь устройство его легко приготовит?',
        type: 'radio',
        required: true,
        options: [
          {
            id: 'awesome',
            localizationKey: 'options.awesome',
            defaultText: 'Это офигенно!'
          },
          {
            id: 'cool',
            localizationKey: 'options.cool',
            defaultText: 'Это прикольно!'
          },
          {
            id: 'maybe_use',
            localizationKey: 'options.maybe_use',
            defaultText: 'Ну, наверное, я бы таким пользовался'
          },
          {
            id: 'not_sure',
            localizationKey: 'options.not_sure',
            defaultText: 'Непонятно зачем и кому это надо'
          },
          {
            id: 'nonsense',
            localizationKey: 'options.nonsense',
            defaultText: 'Бред какой-то'
          }
        ]
      }
    ]
  },
  {
    id: 'smart_bottles',
    localizationKey: 'sections.smart_bottles',
    defaultTitle: 'Умные бутылочки',
    questions: [
      {
        id: 'smart_bottles',
        localizationKey: 'questions.smart_bottles',
        defaultTitle: 'Важная часть нашего устройства вот такие бутылочки. Это умные устройства, которые заправляются на день парфюмерией, что вы выбрали, а потом напоминают вам время от времени освежить аромат.',
        type: 'radio',
        required: true,
        options: [
          {
            id: 'awesome',
            localizationKey: 'options.awesome',
            defaultText: 'Это офигенно!'
          },
          {
            id: 'cool',
            localizationKey: 'options.cool',
            defaultText: 'Это прикольно!'
          },
          {
            id: 'maybe_use',
            localizationKey: 'options.maybe_use',
            defaultText: 'Ну, наверное, я бы таким пользовался'
          },
          {
            id: 'not_sure',
            localizationKey: 'options.not_sure',
            defaultText: 'Непонятно зачем и кому это надо'
          },
          {
            id: 'nonsense',
            localizationKey: 'options.nonsense',
            defaultText: 'Бред какой-то'
          }
        ]
      },
      {
        id: 'reusable_bottles',
        localizationKey: 'questions.reusable_bottles',
        defaultTitle: 'Бутылочки универсальны и легко могут быть перезаправлены новым ароматом. Вам больше не надо их выкидывать и загрязнять окружающую среду.',
        type: 'radio',
        required: true,
        options: [
          {
            id: 'awesome',
            localizationKey: 'options.awesome',
            defaultText: 'Это офигенно!'
          },
          {
            id: 'cool',
            localizationKey: 'options.cool',
            defaultText: 'Это прикольно!'
          },
          {
            id: 'maybe_use',
            localizationKey: 'options.maybe_use',
            defaultText: 'Ну, наверное, я бы таким пользовался'
          },
          {
            id: 'not_sure',
            localizationKey: 'options.not_sure',
            defaultText: 'Непонятно зачем и кому это надо'
          },
          {
            id: 'nonsense',
            localizationKey: 'options.nonsense',
            defaultText: 'Бред какой-то'
          }
        ]
      },
      {
        id: 'scan_recreate',
        localizationKey: 'questions.scan_recreate',
        defaultTitle: 'Вы заходите в парфюмерный магазин, нюхаете аромат, он вам нравится, вы фотографируете коробку и устройство готовит такой же аромат для вас.',
        type: 'radio',
        required: true,
        options: [
          {
            id: 'awesome',
            localizationKey: 'options.awesome',
            defaultText: 'Это офигенно!'
          },
          {
            id: 'cool',
            localizationKey: 'options.cool',
            defaultText: 'Это прикольно!'
          },
          {
            id: 'maybe_use',
            localizationKey: 'options.maybe_use',
            defaultText: 'Ну, наверное, я бы таким пользовался'
          },
          {
            id: 'not_sure',
            localizationKey: 'options.not_sure',
            defaultText: 'Непонятно зачем и кому это надо'
          },
          {
            id: 'nonsense',
            localizationKey: 'options.nonsense',
            defaultText: 'Бред какой-то'
          }
        ]
      }
    ]
  },
  {
    id: 'branding_pricing',
    localizationKey: 'sections.branding_pricing',
    defaultTitle: 'Название и цена',
    questions: [
      {
        id: 'brand_name',
        localizationKey: 'questions.brand_name',
        defaultTitle: 'Что вы думаете про название RNBW (Rainbow). Это как радуга из ароматов. Полный спектр от бирюзового моря до красной розы.',
        type: 'radio',
        required: true,
        options: [
          {
            id: 'excellent',
            localizationKey: 'options.excellent',
            defaultText: 'Отличное название'
          },
          {
            id: 'ok',
            localizationKey: 'options.ok',
            defaultText: 'Норм, но я сразу не догнал(а)'
          },
          {
            id: 'weird',
            localizationKey: 'options.weird',
            defaultText: 'Хорошое название для очередного ребенка Маска'
          },
          {
            id: 'bad',
            localizationKey: 'options.bad',
            defaultText: 'Херня какая-то'
          }
        ]
      },
      {
        id: 'expected_price',
        localizationKey: 'questions.expected_price',
        defaultTitle: 'А как вы думаете, когда мы выйдем на рынок, сколько такое устройство должно по вашему стоить (чем точнее вы угадаете цену, тем больше будет скидка)?',
        type: 'radio',
        required: true,
        options: [
          {
            id: 'low',
            localizationKey: 'options.low',
            defaultText: '200-300 евро'
          },
          {
            id: 'medium',
            localizationKey: 'options.medium',
            defaultText: '301-600 евро'
          },
          {
            id: 'high',
            localizationKey: 'options.high',
            defaultText: '601 или выше евро'
          }
        ]
      },
      {
        id: 'willing_to_pay',
        localizationKey: 'questions.willing_to_pay',
        defaultTitle: 'Со стоимостью разобрались. А вы бы хотели купить себе такое устройство? А сколько бы были готовы за него заплатить вы?',
        type: 'radio',
        required: true,
        options: [
          {
            id: 'not_interested',
            localizationKey: 'options.not_interested',
            defaultText: 'Не, мне такое бесплатно не надо'
          },
          {
            id: 'low',
            localizationKey: 'options.low',
            defaultText: '200-300 евро'
          },
          {
            id: 'medium',
            localizationKey: 'options.medium',
            defaultText: '301-600 евро'
          },
          {
            id: 'high',
            localizationKey: 'options.high',
            defaultText: '601 или выше евро'
          }
        ]
      },
      {
        id: 'email',
        localizationKey: 'questions.email',
        defaultTitle: 'А вот это уже совсем опционально. Но, если ты хочешь узнать когда выйдёт нашу устройство и получить супер-пупер-мега скидку, то оставь свой email куда тебе эту скидку прислать:',
        type: 'email',
        required: false
      }
    ]
  }
];

// Helper function to find a question by ID
export const getQuestionById = (questionId: string): Question | undefined => {
  for (const section of surveyData) {
    const question = section.questions.find(q => q.id === questionId);
    if (question) return question;
  }
  return undefined;
};

// Helper function for translations (to be expanded later)
export const getTranslatedQuestion = (question: Question, locale = 'ru'): string => {
  // For now, just return the default title
  // In the future, this would use the localization system
  return question.defaultTitle;
};

export const getTranslatedOption = (option: QuestionOption, locale = 'ru'): string => {
  // For now, just return the default text
  // In the future, this would use the localization system
  return option.defaultText;
}; 