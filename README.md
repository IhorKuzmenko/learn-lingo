# Learn Lingo

A modern web application for finding and booking online language tutors.

Learn Lingo allows users to browse experienced language teachers, filter them by different criteria, add tutors to favorites, create an account, and book a trial lesson.

## 🔗 Links

- **Live Demo:** https://learn-lingo-gray.vercel.app/
- **GitHub Repository:** https://github.com/IhorKuzmenko/learn-lingo

## ✨ Features

- Browse available language teachers
- Filter teachers by language, level of knowledge, and hourly price
- Load additional teachers with the **Load more** button
- View detailed information about each teacher
- Read teacher experience and student reviews
- Register and log in with Firebase Authentication
- Show and hide password in authentication forms
- Add and remove teachers from favorites
- Persist favorites for authenticated users
- Access a private Favorites page
- Book a trial lesson
- Form validation with React Hook Form and Yup
- Success and error notifications
- Multiple Home page color themes
- Persist selected theme after page reload
- Reusable modal system
- Custom SVG sprite icons

## 🛠 Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- CSS Modules

### Backend & Data

- Firebase Authentication
- Firebase Realtime Database

### Forms & Validation

- React Hook Form
- Yup
- @hookform/resolvers

### Other Tools

- Sonner
- modern-normalize
- ESLint
- Prettier
- Git
- GitHub
- Vercel

## 📄 Pages

### Home

The Home page introduces the Learn Lingo platform and provides quick navigation to the teachers catalog.

It includes:

- Hero section
- Call-to-action button
- Platform advantages
- Theme switcher
- Navigation to the Teachers page

Users can choose between five color themes:

- Yellow
- Green
- Blue
- Red
- Orange

The selected theme changes the main accent colors and hero image. The preference is saved and restored after a page reload.

### Teachers

The Teachers page contains the main tutor catalog.

Each teacher card displays:

- Avatar
- Name and surname
- Languages
- Number of completed lessons
- Rating
- Hourly price
- Lesson information
- Conditions
- Language levels

The **Read more** button expands the card and displays additional information:

- Teacher experience
- Student reviews
- Trial lesson booking button

Teachers can be filtered by:

- Language
- Level of knowledge
- Maximum hourly price

Teachers are initially displayed in a limited batch. More teachers can be loaded using the **Load more** button.

### Favorites

The Favorites page is available to authenticated users.

Users can add teachers to favorites directly from the teacher cards. Favorite teacher IDs are stored in Firebase Realtime Database and remain available after page reload.

Unauthenticated users are prompted to log in when they attempt to add a teacher to favorites.

## 🔐 Authentication

Authentication is implemented with **Firebase Authentication**.

The application supports:

- User registration
- User login
- User logout
- Current user session
- Authentication-dependent functionality

Registration requires:

- Name
- Email
- Password

Login requires:

- Email
- Password

Authentication forms are built with **React Hook Form** and validated using **Yup**.

The password field also includes a visibility toggle.

## 📅 Trial Lesson Booking

Users can open a booking form from an expanded teacher card.

The form contains:

- Reason for learning the language
- Full name
- Email
- Phone number

The booking form is validated with React Hook Form and Yup.

After successful submission, the user receives a notification.

## 🎨 UI

The interface was implemented according to the provided Figma design.

The project uses:

- CSS Modules
- CSS custom properties
- Reusable React components
- Custom SVG sprite icons
- Hover and focus states
- Modal windows
- Multiple color themes

## 🗂 Project Structure

```text
learn-lingo/
├── app/
│   ├── favorites/
│   ├── teachers/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── Advantages/
│   ├── AuthModal/
│   ├── BookingModal/
│   ├── Button/
│   ├── Container/
│   ├── Filters/
│   ├── Header/
│   ├── Hero/
│   ├── Icon/
│   ├── Modal/
│   ├── TeacherCard/
│   ├── TeacherList/
│   ├── TeachersClient/
│   └── ThemeSwitcher/
│
├── constants/
├── hooks/
├── lib/
├── providers/
├── schemas/
├── types/
│
└── public/
    ├── icons/
    └── images/
```

## 🔥 Firebase

Firebase is used for authentication and application data.

The application uses:

- **Firebase Authentication** — registration, login, logout, and user sessions
- **Firebase Realtime Database** — teachers and user favorites

Simplified database structure:

```text
teachers/
  teacherId/
    name
    surname
    languages
    levels
    rating
    price_per_hour
    lessons_done
    reviews
    ...

users/
  userId/
    favorites/
      teacherId: true
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/IhorKuzmenko/learn-lingo.git
```

### 2. Go to the project directory

```bash
cd learn-lingo
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## 📜 Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🌐 Deployment

The application is deployed on **Vercel**.

**Live application:**
https://learn-lingo-gray.vercel.app/

Firebase environment variables must be configured in the Vercel project settings for the deployed application.

## 👨‍💻 Author

**Ihor Kuzmenko**

Frontend Developer

- GitHub: https://github.com/IhorKuzmenko
- LinkedIn: https://www.linkedin.com/in/ihor-kuzmenko-336b79213/

## 📄 License

This project was created for educational and portfolio purposes.
