// Define types for our survey data structure
export type QuestionOption = {
  id: string;
  labelKey: string; // Used for localization
  defaultText: string; // Default text (English)
};

export type Question = {
  id: string;
  titleKey: string; // Used for localization
  defaultTitle: string; // Default title (English)
  type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'select';
  required: boolean;
  options?: QuestionOption[]; // For radio, checkbox, and select questions
};

export type SurveySection = {
  id: string;
  titleKey: string; // Used for localization
  defaultTitle: string; // Default title (English)
  questions: Question[];
};

// Define our survey data
export const surveyData: SurveySection[] = [
  {
    id: 'interest',
    titleKey: 'section.interest',
    defaultTitle: 'Interest and Awareness',
    questions: [
      {
        id: 'interestLevel',
        titleKey: 'question.interestLevel',
        defaultTitle: 'How interested are you in the RNBW device?',
        type: 'radio',
        required: true,
        options: [
          { id: 'very-interested', labelKey: 'option.veryInterested', defaultText: 'Very interested' },
          { id: 'somewhat-interested', labelKey: 'option.somewhatInterested', defaultText: 'Somewhat interested' },
          { id: 'not-interested', labelKey: 'option.notInterested', defaultText: 'Not interested' }
        ]
      },
      {
        id: 'heardFrom',
        titleKey: 'question.heardFrom',
        defaultTitle: 'How did you hear about the RNBW device?',
        type: 'checkbox',
        required: false,
        options: [
          { id: 'social-media', labelKey: 'option.socialMedia', defaultText: 'Social media' },
          { id: 'friend', labelKey: 'option.friend', defaultText: 'Friend or family' },
          { id: 'news', labelKey: 'option.news', defaultText: 'News article' },
          { id: 'advertisement', labelKey: 'option.advertisement', defaultText: 'Advertisement' },
          { id: 'other', labelKey: 'option.other', defaultText: 'Other' }
        ]
      }
    ]
  },
  {
    id: 'features',
    titleKey: 'section.features',
    defaultTitle: 'Product Features',
    questions: [
      {
        id: 'importantFeatures',
        titleKey: 'question.importantFeatures',
        defaultTitle: 'Which features are most important to you? (Select all that apply)',
        type: 'checkbox',
        required: true,
        options: [
          { id: 'design', labelKey: 'option.design', defaultText: 'Sleek design and portability' },
          { id: 'battery', labelKey: 'option.battery', defaultText: 'Long battery life' },
          { id: 'connectivity', labelKey: 'option.connectivity', defaultText: 'Seamless connectivity with other devices' },
          { id: 'ai', labelKey: 'option.ai', defaultText: 'AI-powered capabilities' },
          { id: 'customization', labelKey: 'option.customization', defaultText: 'Customizable settings and appearance' }
        ]
      },
      {
        id: 'additionalFeature',
        titleKey: 'question.additionalFeature',
        defaultTitle: 'Is there any other feature you would like to see in the RNBW device?',
        type: 'textarea',
        required: false
      }
    ]
  },
  {
    id: 'pricing',
    titleKey: 'section.pricing',
    defaultTitle: 'Pricing and Purchase Intent',
    questions: [
      {
        id: 'priceRange',
        titleKey: 'question.priceRange',
        defaultTitle: 'What price range would you consider reasonable for this device?',
        type: 'radio',
        required: true,
        options: [
          { id: 'under-100', labelKey: 'option.under100', defaultText: 'Under $100' },
          { id: '100-200', labelKey: 'option.100to200', defaultText: '$100 - $200' },
          { id: '200-300', labelKey: 'option.200to300', defaultText: '$200 - $300' },
          { id: 'over-300', labelKey: 'option.over300', defaultText: 'Over $300' }
        ]
      },
      {
        id: 'purchaseIntent',
        titleKey: 'question.purchaseIntent',
        defaultTitle: 'How likely are you to purchase the RNBW device when it becomes available?',
        type: 'radio',
        required: true,
        options: [
          { id: 'very-likely', labelKey: 'option.veryLikely', defaultText: 'Very likely' },
          { id: 'somewhat-likely', labelKey: 'option.somewhatLikely', defaultText: 'Somewhat likely' },
          { id: 'unlikely', labelKey: 'option.unlikely', defaultText: 'Unlikely' },
          { id: 'very-unlikely', labelKey: 'option.veryUnlikely', defaultText: 'Very unlikely' }
        ]
      }
    ]
  },
  {
    id: 'feedback',
    titleKey: 'section.feedback',
    defaultTitle: 'Additional Feedback',
    questions: [
      {
        id: 'generalFeedback',
        titleKey: 'question.generalFeedback',
        defaultTitle: 'Do you have any other comments or suggestions about the RNBW device?',
        type: 'textarea',
        required: false
      }
    ]
  }
];

// Helper functions
export function getQuestionById(id: string): Question | undefined {
  for (const section of surveyData) {
    const question = section.questions.find(q => q.id === id);
    if (question) return question;
  }
  return undefined;
}

export function getOptionText(questionId: string, optionId: string): string {
  const question = getQuestionById(questionId);
  if (!question || !question.options) return '';
  
  const option = question.options.find(opt => opt.id === optionId);
  return option ? option.defaultText : '';
}

// Helper function for future localization support
export function getLocalizedText(key: string, defaultText: string, locale = 'en'): string {
  // This will be expanded when localization is implemented
  // For now, just return the default text
  return defaultText;
} 