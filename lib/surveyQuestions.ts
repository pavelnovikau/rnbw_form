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
        title: 'Как тебя зовут:',
        required: true
      },
      {
        id: 'occupation',
        type: 'text',
        title: 'Чем занимаешься?',
      },
      {
        id: 'fragrance_use',
        type: 'radio',
        title: 'Как часто ты пользуешься ароматами?',
        options: [
          { value: 'daily', label: 'Ежедневно', description: 'Пользуюсь каждый день' },
          { value: 'often', label: 'Часто', description: 'Несколько раз в неделю' },
          { value: 'sometimes', label: 'Иногда', description: 'По особым случаям' },
          { value: 'rarely', label: 'Редко', description: 'Практически не пользуюсь' }
        ],
        required: true
      }
    ]
  },
  {
    id: 'device',
    title: 'Устройство',
    questions: [
      {
        id: 'device_looks',
        type: 'textarea',
        title: 'Как тебе внешний вид устройства?',
        description: 'Поделись впечатлениями о дизайне, материалах и общем впечатлении',
        required: true
      },
      {
        id: 'device_place',
        type: 'radio',
        title: 'Где бы ты разместил(а) это устройство у себя дома?',
        options: [
          { value: 'bathroom', label: 'В ванной комнате' },
          { value: 'bedroom', label: 'В спальне' },
          { value: 'living_room', label: 'В гостиной' },
          { value: 'hall', label: 'В прихожей' },
          { value: 'other', label: 'Другое место' }
        ],
        required: true
      },
      {
        id: 'compact_device',
        type: 'radio',
        title: 'Хотел(а) бы ты, чтобы была более компактная модель устройства?',
        options: [
          { value: 'yes', label: 'Да, предпочитаю меньший размер' },
          { value: 'no', label: 'Нет, текущий размер оптимален' },
          { value: 'depends', label: 'Зависит от функциональности' }
        ],
        required: true
      }
    ]
  },
  {
    id: 'features',
    title: 'Функции',
    questions: [
      {
        id: 'important_features',
        type: 'checkbox',
        title: 'Какие функции устройства для тебя наиболее важны?',
        options: [
          { value: 'smart_mixing', label: 'Умное смешивание ароматов' },
          { value: 'app_control', label: 'Управление через мобильное приложение' },
          { value: 'scheduling', label: 'Планирование расписания ароматов' },
          { value: 'personalization', label: 'Персонализация ароматов' },
          { value: 'mood_matching', label: 'Подбор аромата под настроение' },
          { value: 'voice_control', label: 'Голосовое управление' }
        ],
        required: true
      },
      {
        id: 'missing_features',
        type: 'textarea',
        title: 'Какие функции ты бы добавил(а) в устройство?',
        description: 'Не стесняйся предлагать самые смелые идеи'
      },
      {
        id: 'app_importance',
        type: 'radio',
        title: 'Насколько важно для тебя наличие мобильного приложения для устройства?',
        options: [
          { value: 'very_important', label: 'Очень важно' },
          { value: 'important', label: 'Важно' },
          { value: 'neutral', label: 'Нейтрально' },
          { value: 'not_important', label: 'Не важно' }
        ],
        required: true
      }
    ]
  },
  {
    id: 'bottles',
    title: 'Бутылочки',
    questions: [
      {
        id: 'bottles_design',
        type: 'textarea',
        title: 'Как тебе дизайн умных бутылочек?',
        description: 'Поделись своими впечатлениями о внешнем виде, удобстве использования и т.д.',
        required: true
      },
      {
        id: 'bottles_count',
        type: 'radio',
        title: 'Сколько разных ароматов (бутылочек) ты хотел(а) бы иметь в устройстве одновременно?',
        options: [
          { value: 'few', label: '3-5 ароматов', description: 'Для создания базовых композиций' },
          { value: 'medium', label: '6-10 ароматов', description: 'Для создания разнообразных композиций' },
          { value: 'many', label: 'Более 10 ароматов', description: 'Для максимального разнообразия' }
        ],
        required: true
      },
      {
        id: 'refill_preference',
        type: 'radio',
        title: 'Как бы ты предпочел(ла) пополнять запасы ароматов?',
        options: [
          { value: 'subscription', label: 'Регулярная подписка', description: 'Автоматическая доставка новых ароматов' },
          { value: 'manual_order', label: 'Заказывать по мере необходимости', description: 'Самостоятельно выбирать и заказывать новые ароматы' },
          { value: 'retail', label: 'Покупать в магазинах', description: 'Приобретать в розничных точках продаж' }
        ],
        required: true
      }
    ]
  },
  {
    id: 'final',
    title: 'Финал',
    questions: [
      {
        id: 'price_range',
        type: 'radio',
        title: 'Какую сумму ты готов(а) потратить на такое устройство?',
        options: [
          { value: 'low', label: 'До 10 000 рублей' },
          { value: 'medium', label: '10 000 - 20 000 рублей' },
          { value: 'high', label: '20 000 - 30 000 рублей' },
          { value: 'premium', label: 'Более 30 000 рублей' }
        ],
        required: true
      },
      {
        id: 'final_feedback',
        type: 'textarea',
        title: 'Есть ли что-то еще, чем ты хотел(а) бы поделиться о концепции устройства?'
      },
      {
        id: 'email',
        type: 'email',
        title: 'Твой email для связи (если хочешь получать новости о проекте):',
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