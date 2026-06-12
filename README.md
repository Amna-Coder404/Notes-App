# Notes-App

A mobile notes app built with Expo, React Native, Clerk, and Convex.

## Features

- Google sign-in with Clerk
- Create, edit, delete, pin, and favorite notes
- Search and filter notes by category
- Upload images to notes
- Light and dark theme
- Profile screen with logout and reset

## Tech Stack
- Expo SDK 54
- React Native
- TypeScript
- Expo Router
- Clerk
- Convex

## Setup

```bash
npm install
```

Create `.env.local`:

```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=
EXPO_PUBLIC_CONVEX_URL=
EXPO_PUBLIC_CONVEX_SITE_URL=
CONVEX_DEPLOYMENT=
```

Start the app:

```bash
npm start
```



## Structure

```text
app/          screens and routes
components/   reusable UI
hooks/        custom app logic
convex/       backend schema and functions
style/        app styles
providers/    Clerk and Convex setup
```
