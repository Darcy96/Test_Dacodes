# Transfer Management System

A web application built with Next.js 13+ that manages transfers with GitHub authentication. Includes a user management system and a modern design using Material UI.

## 🌐 Demo

You can try the live application here: [https://test-dacodes.vercel.app/](https://test-dacodes.vercel.app/)

## 🚀 Key Features

- **Authentication**
  - GitHub Login
  - Session management with NextAuth
  - Custom user menu with avatar

- **Transfer Management**
  - Transfer list with filters
  - Transfer creation and editing
  - Deletion with confirmation
  - Validated forms

- **UI/UX**
  - Responsive interface with Material UI
  - Reusable components
  - Visual feedback with spinners and dialogs
  - Mobile-adaptive design

- **Data Management**
  - Mocked API endpoints for demonstration
  - React Query for state management
  - Simulated CRUD operations
  - Optimistic updates for better UX

## 🛠️ Technologies

- Next.js 13+
- TypeScript
- Material UI
- NextAuth.js
- React Query (with mocked data)
- Jest & React Testing Library

## 🏗️ Architecture

The project follows an organized architecture:
- Atomic Design (atoms, molecules, organisms, templates)
- State management with Context API
- Custom hooks for business logic
- Next.js routing system
- Mocked API services for demonstration

## 🔧 Environment Variables for Local Use
Create a `.env.local` file with:

GITHUB_CLIENT_ID=Ov23li6jBdCPtsjgtLGA
GITHUB_CLIENT_SECRET=1e92f153ed091f886e10fe96c42849008c77ccef
NEXTAUTH_SECRET=1234567890
NEXTAUTH_URL=http://localhost:3000


