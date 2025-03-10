# Atharv's Portfolio Website

A personal portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- Responsive design
- Dark mode support
- Contact form with Nodemailer for sending emails
- Project showcase with GitHub integration
- Achievements section
- Education section
- Extracurricular activities section

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

## Contact Form Setup

The contact form uses Nodemailer to send emails from both local development and in production on Vercel.

### Local Development

1. Create a `.env` file in the root directory based on `.env.example`:
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=your-email@gmail.com
   EMAIL_RECIPIENT=recipient-email@gmail.com
   ```

   **Note:** If you're using Gmail, you'll need to create an "App Password" instead of using your regular password. 
   See [Google's documentation](https://support.google.com/accounts/answer/185833) for more details.

2. For local testing, you can run the development server with:
   ```
   npm run dev
   npm run server
   ```

### Deploying to Vercel

1. Push your code to a GitHub repository.

2. Sign up for a [Vercel](https://vercel.com) account and connect your repository.

3. During the import process, add all the required environment variables from your `.env` file.
   These will be used by the serverless functions to send emails.

4. Deploy your application.

#### How It Works on Vercel

- The frontend React application is served by Vercel's CDN.
- The `/api/contact.js` file is automatically converted into a serverless function.
- When the contact form is submitted, it calls the serverless function directly.
- No separate server process is needed in production.

## Development

- Frontend dev server: `npm run dev`
- For local API testing: `npm run server`

## Building for Production

1. Build the app: `npm run build`
2. Preview the build: `npm run preview` 