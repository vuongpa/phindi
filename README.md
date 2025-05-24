# Phindi - Modern Communication Platform

A beautiful, modern communication platform built with Next.js, featuring chat, voice, and video calling capabilities with a comprehensive dark/light theme system.

## Features

- 💬 **Real-time Chat**: Modern chat interface with message reactions and context menus
- 📞 **Voice & Video Calls**: Integrated calling system with call notifications
- 🎨 **Advanced Theming**: Comprehensive light/dark theme system with smooth transitions
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- ⚙️ **Customizable Settings**: Extensive settings panel for personalization
- 🔒 **Privacy Controls**: Granular privacy and notification settings

## Theme System

Phindi features a sophisticated theme system with:

- **Light Theme**: Clean, minimal design with subtle grays and high contrast
- **Dark Theme**: Modern dark interface with warm undertones for comfortable viewing
- **System Theme**: Automatically follows your OS preference
- **Smooth Transitions**: Seamless switching between themes
- **Consistent Colors**: Semantic color tokens ensure consistency across all components

### Theme Usage

```tsx
import { ThemeToggle } from "@/components/theme-toggle"

// Icon variant for compact spaces
<ThemeToggle variant="icon" size="sm" />

// Full variant for settings pages
<ThemeToggle variant="full" />
```

For more details, see [THEME_SYSTEM.md](./THEME_SYSTEM.md).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
app/
  page.tsx           # Main chat interface
  settings/          # Settings and preferences
  contacts/          # Contact management
  profile/           # User profile
components/
  theme-provider.tsx # Theme context and logic
  theme-toggle.tsx   # Theme switching component
  theme-preview.tsx  # Theme preview component
  app-sidebar.tsx    # Application sidebar
  ui/               # Reusable UI components
```

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Lucide React** - Beautiful icons
- **Framer Motion** - Smooth animations

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
