# RNBW Survey Landing Page

This project is a landing page with a survey form for the RNBW device, built with modern web technologies to collect user feedback efficiently.

## Technologies Used

- **Next.js**: A React framework for production-grade applications
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For utility-first styling
- **Shadcn UI**: Beautiful, accessible UI components built with Radix UI and Tailwind CSS
- **React Hook Form**: For efficient form state management
- **Zod**: For form validation
- **Nodemailer**: For sending survey responses via email

## Features

- **Responsive Design**: Works on all devices from mobile to desktop
- **Dynamic Survey Form**: Configurable survey questions stored separately from UI code
- **Form Validation**: Client-side validation with informative error messages
- **Email Notification**: Sends survey responses to an admin email
- **Localization Ready**: Built with internationalization (i18n) support for future language translations
- **Modern UI Components**: Clean and accessible UI built with Shadcn UI components

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/rnbw-form.git
   cd rnbw-form
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file based on the provided `.env.local.example`:
   ```bash
   cp .env.local.example .env.local
   ```
   
4. Update the environment variables in `.env.local` with your email server details.

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view the survey form.

## Project Structure

```
rnbw_form/
├── components/        # React components
│   ├── ui/            # Shadcn UI components
│   ├── Header.tsx     # Site header component
│   ├── Footer.tsx     # Site footer component
│   └── SurveyForm.tsx # Main survey form component
├── lib/               # Utility functions and data
│   ├── i18n.ts        # Internationalization utilities
│   ├── surveyQuestions.ts # Survey questions data
│   └── utils.ts       # General utility functions
├── pages/             # Next.js pages
│   ├── api/           # API routes
│   │   └── submit-survey.ts # Endpoint for form submission
│   └── index.tsx      # Landing page
├── public/            # Static assets
├── styles/            # Global styles
└── ...                # Configuration files
```

## Survey Form Structure

The survey form is built using a flexible and maintainable approach:

- Survey questions are defined in `lib/surveyQuestions.ts` separate from the UI code
- Each question has:
  - A unique ID
  - A question type (radio, checkbox, text, textarea)
  - Localization keys for future translations
  - Optional answer choices for radio/checkbox questions
- Questions are grouped into logical sections

## Adding or Modifying Survey Questions

To add or modify questions, update the `surveyData` array in `lib/surveyQuestions.ts`. The form will automatically generate the appropriate input fields and validation rules based on this data.

## Localization Support

The application is designed with future localization in mind:

- All user-facing text uses the `t()` function from `lib/i18n.ts`
- Each text has a key and a default text (English)
- To add a new language, add it to the `LOCALES` array and provide translations

## Future Enhancements

- User analytics integration
- Dashboard for viewing survey responses
- Additional question types (rating scales, etc.)
- Theme customization
- Full localization implementation for multiple languages

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Shadcn UI](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/) 