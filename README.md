# JobTrackr 🎯

A modern, professional job application tracking system built with React, TypeScript, and Supabase. Track your job search progress with beautiful analytics and intuitive management tools.

![JobTrackr Dashboard](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Supabase](https://img.shields.io/badge/Supabase-2.50.3-green)

## ✨ Features

### 🔐 **Authentication & Security**
- **Secure Authentication**: Email/password and Google OAuth sign-in via Supabase
- **User Registration**: Easy account creation with email verification
- **Session Management**: Persistent login sessions with automatic token refresh
- **Protected Routes**: Automatic redirection for unauthenticated users
- **User Data Isolation**: Each user's data is completely separated and secure

### 📊 **Job Application Management**
- **Add New Applications**: Comprehensive form with company, title, location, salary, and URL
- **Application Status Tracking**: Visual status management with color-coded badges:
  - 🟦 **Applied** - Initial application submitted
  - 🟨 **Interviewing** - In the interview process
  - 🟩 **Offer** - Job offer received
  - 🟥 **Rejected** - Application rejected
- **Rich Data Storage**: Store detailed information including notes, deadlines, and reminder dates
- **Edit & Delete**: Full CRUD operations for all applications
- **Search & Filter**: Find applications by company, title, location, or status

### 📈 **Analytics & Insights**
- **Real-time Dashboard**: Live statistics and visualizations
- **Application Statistics**: Total applications, success rate, average per month, and in-progress count
- **Status Distribution Chart**: Pie chart showing breakdown of application statuses
- **Applications Over Time**: Bar chart tracking daily application activity (last 30 days)
- **Recent Activity**: Quick overview of latest applications with actions

### 🎨 **Modern User Interface**
- **Professional Blue Theme**: Clean, modern design with professional color scheme
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Card & List Views**: Toggle between visual card layout and compact list view
- **Interactive Components**: Built with shadcn/ui and Tailwind CSS
- **Toast Notifications**: Real-time feedback for all user actions
- **Loading States**: Smooth animations and skeleton screens

### 🔧 **Advanced Features**
- **Mock Data**: Add sample data to test charts and functionality
- **Data Management**: Clear all data with confirmation dialogs
- **Reminder System**: Set reminder dates for follow-ups and deadlines
- **External Links**: Direct access to job postings from the application
- **Date Tracking**: Comprehensive date management for applications, deadlines, and reminders

## 🛠️ Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Frontend** | React | 18.3.1 |
| **Language** | TypeScript | 5.5.3 |
| **Build Tool** | Vite | 5.4.1 |
| **UI Framework** | shadcn/ui + Tailwind CSS | Latest |
| **Backend** | Supabase | 2.50.3 |
| **State Management** | TanStack Query | 5.56.2 |
| **Routing** | React Router DOM | 6.26.2 |
| **Charts** | Recharts | 2.12.7 |
| **Icons** | Lucide React | 0.462.0 |
| **Date Handling** | date-fns | 3.6.0 |

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Supabase** account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd JobTrackr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings → API to get your credentials
   - Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   - Run the SQL migration in your Supabase SQL editor:
   ```sql
   CREATE TABLE public.jobs (
     id uuid NOT NULL DEFAULT gen_random_uuid(),
     user_id uuid NOT NULL,
     company text NOT NULL,
     title text NOT NULL,
     status text,
     appliedDate date,
     url text,
     notes text,
     tags ARRAY,
     createdAt timestamp without time zone NOT NULL DEFAULT now(),
     salary text,
     location text,
     deadline date,
     reminderDate date,
     CONSTRAINT jobs_pkey PRIMARY KEY (id),
     CONSTRAINT jobs_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
   );
   ```

5. **Start the development server**
   ```bash
npm run dev
```

6. **Open your browser**
   Navigate to `http://localhost:8080` to see the application

## 📁 Project Structure

```
JobTrackr/
├── src/
│   ├── components/
│   │   ├── dashboard/          # Dashboard components
│   │   │   ├── WelcomeHeader.tsx
│   │   │   ├── StatsCards.tsx
│   │   │   ├── ChartsSection.tsx
│   │   │   └── ...
│   │   └── ui/                 # shadcn/ui components
│   ├── pages/                  # Application pages
│   │   ├── Dashboard.tsx
│   │   ├── Applications.tsx
│   │   ├── AddJob.tsx
│   │   └── ...
│   ├── integrations/
│   │   └── supabase/           # Supabase configuration
│   ├── utils/                  # Utility functions
│   └── hooks/                  # Custom React hooks

└── public/                     # Static assets
```

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run build:dev` | Build for development |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📊 Database Schema

The application uses a single `jobs` table with comprehensive job tracking:

```sql
CREATE TABLE public.jobs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  company text NOT NULL,
  title text NOT NULL,
  status text,
  appliedDate date,
  url text,
  notes text,
  tags ARRAY,
  createdAt timestamp without time zone NOT NULL DEFAULT now(),
  salary text,
  location text,
  deadline date,
  reminderDate date,
  CONSTRAINT jobs_pkey PRIMARY KEY (id),
  CONSTRAINT jobs_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
```

## 🎨 Features in Detail

### **Dashboard Analytics**
- **Total Applications**: Count of all job applications
- **Success Rate**: Percentage of applications that resulted in offers
- **Average per Month**: Applications submitted in the last 6 months
- **In Progress**: Currently interviewing applications

### **Application Views**
- **Card View**: Visual cards with all job details and actions
- **List View**: Compact table format for quick scanning
- **Search**: Find applications by company, title, or location
- **Filter**: Filter by application status

### **Data Management**
- **Mock Data**: Add sample data to test features
- **Data Export**: Clear all data with confirmation
- **Reminder System**: Set follow-up reminders for applications

## 🔒 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **User authentication** required for all operations
- **Data isolation** between users
- **Secure API keys** management
- **Protected routes** with automatic redirects

## 🚀 Deployment

The application is ready for deployment to any static hosting service:

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the build folder
- **GitHub Pages**: Use GitHub Actions for deployment
- **Firebase Hosting**: Deploy with Firebase CLI

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome! Feel free to:

- Report bugs or issues
- Suggest new features
- Submit pull requests
- Share your experience

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Supabase** for the amazing backend-as-a-service
- **Vite** for the fast build tool
- **Tailwind CSS** for the utility-first CSS framework

---

**Built with ❤️ for job seekers everywhere**
