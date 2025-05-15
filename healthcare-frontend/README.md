# Healthcare Application Frontend

A modern healthcare management system built with React, Tailwind CSS, and Framer Motion.

## Features

- 🔐 JWT Authentication
- 🌓 Dark/Light Mode
- 📊 Dashboard with statistics
- 👨‍⚕️ Doctor Management
- 🧑‍⚕️ Patient Management
- 🔄 Doctor-Patient Mappings
- 📱 Responsive Design
- 🎨 Glass UI Design

## Tech Stack

- **Framework**: React.js with Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **State Management**: React Context API
- **Authentication**: JWT
- **Charts**: Chart.js with react-chartjs-2
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/healthcare-frontend.git
cd healthcare-frontend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory
```
VITE_API_URL=http://localhost:8000/api
VITE_API_TIMEOUT=30000
VITE_STORAGE_PREFIX=healthcare_
VITE_APP_NAME=Healthcare App
```

4. Run the development server
```bash
npm run dev
```

## Connecting to Backend

This frontend is designed to connect to a Django backend with JWT authentication. The backend API routes are configured in `/src/services/api.js`.

## Folder Structure

```
healthcare-frontend/
├── public/            # Public assets
├── src/
│   ├── components/    # Reusable components
│   │   ├── auth/      # Authentication components
│   │   ├── common/    # Common UI components
│   │   └── layout/    # Layout components
│   ├── contexts/      # React Context providers
│   ├── pages/         # Page components
│   │   ├── auth/      # Authentication pages
│   │   ├── dashboard/ # Dashboard pages
│   │   ├── doctors/   # Doctor management pages
│   │   ├── patients/  # Patient management pages
│   │   └── mappings/  # Doctor-Patient mapping pages
│   ├── services/      # API services
│   ├── App.jsx        # Main App component
│   ├── main.jsx       # Entry point
│   └── index.css      # Global styles
├── .env.example       # Example environment variables
├── index.html         # HTML template
└── tailwind.config.js # Tailwind CSS configuration
```

## Build for Production

```bash
npm run build
```

## License

MIT
