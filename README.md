# RNBW Survey Landing Page

A modern, responsive landing page with a survey form to assess user interest in the new RNBW device. The survey responses are automatically emailed to a designated recipient upon submission.

## Project Overview

This project implements a user-friendly landing page that showcases the RNBW device and collects user feedback through a survey. Key features include:

- Responsive design that works on desktop, tablet, and mobile devices
- Interactive survey form with various question types
- Client-side validation of user inputs
- Email notification system for survey responses
- Modern UI with clean design and visual feedback

## Technology Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (React framework with SSR support)
- **Language**: TypeScript for type safety and better developer experience
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) for efficient form validation
- **UI Components**: Custom components with accessibility in mind

### Backend
- **API Routes**: Next.js API routes for serverless functionality
- **Email Service**: [Nodemailer](https://nodemailer.com/) for sending emails
- **Validation**: [Zod](https://github.com/colinhacks/zod) for schema validation

### Deployment
- **Hosting**: [Vercel](https://vercel.com/) (seamless integration with Next.js)
- **CI/CD**: Automated deployment through GitHub integration

## Development Plan

### Phase 1: Project Setup & Design (1 week)
- [x] Initialize GitHub repository
- [ ] Set up Next.js project with TypeScript
- [ ] Configure Tailwind CSS
- [ ] Create responsive layout structure
- [ ] Design UI components (header, form elements, feedback messages)
- [ ] Implement basic page routing

### Phase 2: Frontend Implementation (1 week)
- [ ] Develop the header section with device image and description
- [ ] Create the survey form with all required question types
- [ ] Implement client-side form validation
- [ ] Add loading indicators and user feedback components
- [ ] Ensure responsive design across all device sizes
- [ ] Implement accessibility features (ARIA attributes, keyboard navigation)

### Phase 3: Backend & Integration (1 week)
- [ ] Create API endpoint for form submission
- [ ] Implement server-side validation
- [ ] Set up email service using Nodemailer
- [ ] Configure email templates for survey responses
- [ ] Connect frontend form to backend API
- [ ] Implement error handling and logging

### Phase 4: Testing & Deployment (1 week)
- [ ] Write unit tests for components and API endpoints
- [ ] Perform integration testing
- [ ] Conduct cross-browser and cross-device testing
- [ ] Optimize performance (lazy loading, code splitting)
- [ ] Set up CI/CD pipeline
- [ ] Deploy to production environment

## Getting Started

### Prerequisites
- Node.js 16.x or later
- npm or yarn package manager

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/pavelnovikau/rnbw_form.git
   cd rnbw_form
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file with necessary environment variables:
   ```
   EMAIL_SERVER=smtp.example.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@example.com
   EMAIL_PASSWORD=your-password
   EMAIL_RECIPIENT=recipient@example.com
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure
```
rnbw_form/
├── components/        # React components
├── pages/             # Next.js pages and API routes
├── public/            # Static assets (images, favicon)
├── styles/            # Global styles and Tailwind config
├── lib/               # Utility functions and services
├── types/             # TypeScript type definitions
├── tests/             # Test files
└── README.md          # Project documentation
```

## License
This project is open source and available under the [MIT License](LICENSE).

## Contact
For any questions or feedback regarding this project, please contact [your-email@example.com]. 