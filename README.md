
# NextJS 14 App Router  WIth EmailJS Contact Form

NextJS 14 App Router  WIth EmailJS Contact Form is a responsive and user-friendly contact form built with [Next.js](https://nextjs.org) and enhanced with modern libraries for form handling, validation, UI components, and email services. This application allows users to send messages directly from the website, ensuring a seamless and secure communication channel.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Technical Choices](#technical-choices)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Responsive Design:** Ensures the form looks great on all devices.
- **Client-Side Validation:** Real-time validation using [Zod](https://github.com/colinhacks/zod) and [React Hook Form](https://react-hook-form.com/).
- **Spam Protection:** Implements a honeypot field to deter bots.
- **Email Integration:** Sends form submissions directly via [EmailJS](https://www.EmailJS.com/) without exposing sensitive credentials.
- **User Notifications:** Displays success and error notifications as toast popups using [Shadcn UI](https://ui.shadcn.com/).
- **Accessible UI Components:** Utilizes accessible and customizable UI components for a better user experience.

## Technologies Used

- **[Next.js](https://nextjs.org):** A React framework for building server-side rendered and statically generated web applications.
- **[React Hook Form](https://react-hook-form.com/):** For efficient and easy form management.
- **[Zod](https://github.com/colinhacks/zod):** A TypeScript-first schema validation library.
- **[EmailJS](https://www.EmailJS.com/):** Enables sending emails directly from the client-side without a backend.
- **[Shadcn UI](https://ui.shadcn.com/):** A set of accessible and customizable UI components.
- **TypeScript:** Adds static typing to JavaScript for better code quality and maintainability.
- **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapid UI development.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/) or [Bun](https://bun.sh/) as your package manager.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/NextJS 14 App Router  WIth EmailJS-contact-form.git
   cd NextJS 14 App Router  WIth EmailJS-contact-form
   ```

2. **Install Dependencies**

   Using **npm**:

   ```bash
   npm install
   ```

   Using **yarn**:

   ```bash
   yarn install
   ```

   Using **pnpm**:

   ```bash
   pnpm install
   ```

   Using **Bun**:

   ```bash
   bun install
   ```

### Running the Development Server

Start the development server by running:

Using **npm**:

```bash
npm run dev
```

Using **yarn**:

```bash
yarn dev
```

Using **pnpm**:

```bash
pnpm dev
```

Using **Bun**:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## Configuration

### Environment Variables

The application uses [EmailJS](https://www.EmailJS.com/) to handle form submissions. To configure EmailJS, you need to set up the following environment variables.

1. **Create a `.env.local` File**

   In the root directory of the project, create a `.env.local` file.

2. **Add the Following Variables**

   ```dotenv
   NEXT_PUBLIC_EmailJS_PUBLIC_KEY=your_EmailJS_public_key
   NEXT_PUBLIC_EmailJS_SERVICE_ID=your_EmailJS_service_id
   NEXT_PUBLIC_EmailJS_TEMPLATE_ID=your_EmailJS_template_id
   ```

   **Note:** Since we're using EmailJS on the client side, these variables need to be public. EmailJS is designed to be safe in this context because it doesn't expose your account's private details.

3. **Obtaining EmailJS Credentials**

   - **Sign Up:** If you haven't already, sign up for an account at [EmailJS](https://www.EmailJS.com/).
   - **Create an Email Service:** Set up an email service in your EmailJS dashboard.
   - **Create an Email Template:** Define the email template that matches the variables used in the form.
   - **Get Your Public Key, Service ID, and Template ID:** These can be found in your EmailJS dashboard under the respective sections.

## Project Structure

```
NextJS 14 App Router  WIth EmailJS-contact-form/
├── components/
│   ├── ui/
│   │   ├── alert.tsx
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   └── use-toast.ts
│   └── ContactForm.tsx
├── pages/
│   └── index.tsx
├── public/
│   └── favicon.ico
├── styles/
│   └── globals.css
├── .env.local
├── README.md
├── package.json
├── tsconfig.json
├── next.config.js
└── ...other configuration files
```

- **components/ui/**: Contains reusable UI components built with Shadcn UI.
- **components/ContactForm.tsx**: The main contact form component.
- **pages/**: Next.js pages.
- **public/**: Static assets.
- **styles/**: Global CSS styles.
- **.env.local**: Environment variable configurations.
- **package.json**: Project metadata and dependencies.
- **tsconfig.json**: TypeScript configuration.
- **next.config.js**: Next.js configuration.

## Usage

1. **Navigate to the Contact Page**

   Open your browser and navigate to [http://localhost:3000](http://localhost:3000). You should see the contact form.

2. **Fill Out the Form**

   - **Name:** Enter your full name.
   - **Email:** Enter a valid email address.
   - **Message:** Type your message.

3. **Submit the Form**

   Click the "Send" button to submit your message. Upon successful submission, a green toast notification will appear in the top-right corner for 3 seconds. If there's an error, a red toast notification will notify you accordingly.

## Technical Choices

### Next.js

**Why?** Next.js provides a robust framework for building server-rendered React applications with ease. It offers features like routing, API routes, and optimized performance out of the box.

### React Hook Form & Zod

**Why?** Combining [React Hook Form](https://react-hook-form.com/) with [Zod](https://github.com/colinhacks/zod) allows for efficient form state management and schema-based validation. This ensures that form data is validated both on the client side and maintains strong TypeScript type safety.

### Shadcn UI

**Why?** [Shadcn UI](https://ui.shadcn.com/) offers a set of highly customizable and accessible UI components. It enables rapid development of consistent and aesthetically pleasing interfaces without compromising on accessibility.

### EmailJS

**Why?** [EmailJS](https://www.EmailJS.com/) facilitates sending emails directly from the client side without the need for a dedicated backend server. It simplifies the process of integrating email functionalities into web applications securely.

### TypeScript

**Why?** TypeScript adds static typing to JavaScript, catching potential errors during development and improving code maintainability and readability.

### Tailwind CSS

**Why?** [Tailwind CSS](https://tailwindcss.com/) is a utility-first CSS framework that allows for rapid UI development with minimal custom CSS. It promotes consistency and scalability in styling components.

## Deployment

Deploying a Next.js application is straightforward with platforms like [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or [Firebase Hosting](https://firebase.google.com/products/hosting). Here's a brief overview using Vercel:

1. **Install Vercel CLI (Optional)**

   ```bash
   npm install -g vercel
   ```

2. **Deploy**

   ```bash
   vercel
   ```

   Follow the prompts to deploy your application. Ensure that you set the required environment variables (`NEXT_PUBLIC_EmailJS_PUBLIC_KEY`, `NEXT_PUBLIC_EmailJS_SERVICE_ID`, `NEXT_PUBLIC_EmailJS_TEMPLATE_ID`) in your Vercel dashboard under the project settings.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the Repository**

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add your message"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeatureName
   ```

5. **Open a Pull Request**

   Provide a clear description of your changes and submit the pull request for review.

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For any inquiries or feedback, please reach out to the NextJS 14 App Router  WIth EmailJS team or open an issue.
