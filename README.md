# JobTrackr 🎯

A modern, professional job application tracking system built with React, TypeScript, and Supabase. Track your job search progress with beautiful analytics and intuitive management tools.

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
- **Data Management**: Clear all data with confirmation dialogs
- **Reminder System**: Set reminder dates for follow-ups and deadlines
- **External Links**: Direct access to job postings from the application
- **Date Tracking**: Comprehensive date management for applications, deadlines, and reminders

## 🛠️ Technology Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React |
| **Language** | TypeScript |
| **Build Tool** | Vite |
| **UI Framework** | shadcn/ui + Tailwind CSS |
| **Backend** | Supabase |
| **State Management** | TanStack Query |
| **Routing** | React Router DOM |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Date Handling** | date-fns |

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
- **Data Export**: Clear all data with confirmation
- **Reminder System**: Set follow-up reminders for applications

## 🔒 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **User authentication** required for all operations
- **Data isolation** between users
- **Secure API keys** management
- **Protected routes** with automatic redirects


## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome! Feel free to:

- Report bugs or issues
- Suggest new features
- Submit pull requests
- Share your experience


## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Supabase** for the amazing backend-as-a-service
- **Vite** for the fast build tool
- **Tailwind CSS** for the utility-first CSS framework

