# 💰 Expense Tracker

> A modern, full-stack expense tracking application built with GraphQL, React, and MongoDB. Track your finances with real-time analytics and beautiful visualizations.

---

## 📋 Overview

Expense Tracker is a production-ready financial management platform that empowers users to monitor their spending habits, categorize transactions, and gain insights through interactive data visualizations. Built with a modern tech stack featuring GraphQL for efficient data fetching, React for a responsive UI, and MongoDB for scalable data persistence.

The application provides secure authentication, real-time transaction management, and comprehensive analytics through an intuitive dashboard with chart-based insights.

---

## ✨ Key Features

- **🔐 Secure Authentication** - Session-based authentication with Passport.js and bcrypt password hashing
- **📊 Real-Time Analytics** - Interactive doughnut charts displaying spending patterns by category
- **💳 Transaction Management** - Create, read, update, and delete transactions with full CRUD operations
- **🎯 Category Tracking** - Organize expenses into savings, expenses, and investments
- **💰 Payment Type Support** - Track both cash and card transactions
- **📱 Responsive Design** - Mobile-first UI built with Tailwind CSS and Framer Motion animations
- **🔄 Live Updates** - Apollo Client cache management for instant UI updates
- **🌐 GraphQL API** - Efficient data fetching with type-safe queries and mutations
- **⏰ Automated Health Checks** - Cron jobs for server uptime monitoring
- **🎨 Modern UI/UX** - Gradient designs, smooth animations, and intuitive navigation

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.1.4-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Apollo Client](https://img.shields.io/badge/Apollo_Client-3.9.5-311C87?style=flat&logo=apollo-graphql&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-ES_Modules-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18.2-000000?style=flat&logo=express&logoColor=white)
![Apollo Server](https://img.shields.io/badge/Apollo_Server-4.10.0-311C87?style=flat&logo=apollo-graphql&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-16.8.1-E10098?style=flat&logo=graphql&logoColor=white)

### Database & Authentication
![MongoDB](https://img.shields.io/badge/MongoDB-8.2.0-47A248?style=flat&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-8.2.0-880000?style=flat&logo=mongoose&logoColor=white)
![Passport](https://img.shields.io/badge/Passport-0.7.0-34E27A?style=flat&logo=passport&logoColor=white)

---



## 🏗️ Architecture Diagram

```mermaid
graph TB
    subgraph "Client Layer"
        A[React App] --> B[Apollo Client]
        B --> C[React Router]
        A --> D[Tailwind CSS]
        A --> E[Chart.js]
    end
    
    subgraph "API Layer"
        F[Apollo Server] --> G[GraphQL Schema]
        G --> H[Resolvers]
        H --> I[User Resolver]
        H --> J[Transaction Resolver]
    end
    
    subgraph "Authentication Layer"
        K[Passport.js] --> L[Local Strategy]
        K --> M[Session Store]
        M --> N[MongoDB Sessions]
    end
    
    subgraph "Data Layer"
        O[Mongoose ODM] --> P[User Model]
        O --> Q[Transaction Model]
        P --> R[(MongoDB Atlas)]
        Q --> R
    end
    
    subgraph "Background Jobs"
        S[Cron Jobs] --> T[Health Check]
    end
    
    B -->|GraphQL Queries/Mutations| F
    F --> K
    K --> O
    I --> P
    J --> Q
    
    style A fill:#61DAFB
    style F fill:#E10098
    style K fill:#34E27A
    style R fill:#47A248
    style S fill:#FF6B6B
```

---

## 📁 Project Folder Structure

```
Expense-Tracker/
├── backend/
│   ├── db/
│   │   └── connectDB.js              # MongoDB connection logic
│   ├── models/
│   │   ├── user.model.js             # User schema definition
│   │   └── transaction.model.js      # Transaction schema definition
│   ├── passport/
│   │   └── passport.config.js        # Passport authentication config
│   ├── resolvers/
│   │   ├── index.js                  # Resolver aggregation
│   │   ├── user.resolver.js          # User query/mutation resolvers
│   │   └── transaction.resolver.js   # Transaction resolvers
│   ├── typeDefs/
│   │   ├── index.js                  # TypeDef aggregation
│   │   ├── user.typeDef.js           # User GraphQL schema
│   │   └── transaction.typeDef.js    # Transaction GraphQL schema
│   ├── cron.js                       # Scheduled health check jobs
│   └── index.js                      # Express & Apollo Server setup
├── frontend/
│   ├── public/
│   │   ├── expense-tracker-icon.svg  # Custom favicon
│   │   └── 404.svg                   # 404 page illustration
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Header.jsx        # Navigation header
│   │   │   │   └── GridBackground.jsx # Animated background
│   │   │   ├── skeletons/
│   │   │   │   └── TransactionSkeleton.jsx
│   │   │   ├── Card.jsx              # Transaction card component
│   │   │   ├── Cards.jsx             # Transaction list container
│   │   │   ├── InputField.jsx        # Reusable input component
│   │   │   ├── RadioButton.jsx       # Custom radio button
│   │   │   └── TransactionForm.jsx   # Transaction creation form
│   │   ├── graphql/
│   │   │   ├── mutations/
│   │   │   │   ├── user.mutation.js  # User mutations (login, signup, logout)
│   │   │   │   └── transaction.mutation.js
│   │   │   └── queries/
│   │   │       ├── user.query.js     # User queries
│   │   │       └── transaction.query.js
│   │   ├── pages/
│   │   │   ├── HomePage.jsx          # Dashboard with analytics
│   │   │   ├── LoginPage.jsx         # User login
│   │   │   ├── SignUpPage.jsx        # User registration
│   │   │   ├── TransactionPage.jsx   # Transaction detail/edit
│   │   │   └── NotFoundPage.jsx      # 404 error page
│   │   ├── utils/
│   │   │   ├── cn.js                 # Tailwind class merger
│   │   │   └── formatDate.js         # Date formatting utility
│   │   ├── App.jsx                   # Root component with routing
│   │   ├── main.jsx                  # React entry point
│   │   └── index.css                 # Global styles
│   ├── index.html                    # HTML template
│   ├── vite.config.js                # Vite configuration
│   ├── tailwind.config.js            # Tailwind configuration
│   ├── postcss.config.js             # PostCSS configuration
│   └── package.json                  # Frontend dependencies
├── .env                              # Environment variables
├── .gitignore                        # Git ignore rules
├── nodemon.json                      # Nodemon configuration
├── package.json                      # Backend dependencies
└── README.md                         # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn**
- **MongoDB Atlas Account** (or local MongoDB instance)
- **Git** (for cloning the repository)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/expense-tracker.git
   cd expense-tracker
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   touch .env
   ```

5. **Set up environment variables** (see section below)

6. **Start the development servers**
   
   **Option 1: Run both servers concurrently**
   ```bash
   # Terminal 1 - Backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```
   
   **Option 2: Production build**
   ```bash
   npm run build
   npm start
   ```

7. **Access the application**
   - Frontend: `http://localhost:3000` or `http://localhost:3001`
   - GraphQL Playground: `http://localhost:4000/graphql`

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/?appName=Cluster0` |
| `SESSION_SECRET` | Secret key for session encryption | `your-super-secret-session-key-change-this-in-production` |
| `NODE_ENV` | Application environment | `development` or `production` |

### Example `.env` file:

```env
# MongoDB Connection String
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?appName=Cluster0

# Session Secret (use a strong random string in production)
SESSION_SECRET=your-super-secret-session-key-change-this-in-production

# Node Environment (development or production)
NODE_ENV=development
```

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
VITE_NODE_ENV=development
```

---

## 💾 Database Setup

### MongoDB Atlas Setup

1. **Create a MongoDB Atlas account** at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a new cluster**
   - Choose a free tier (M0) for development
   - Select your preferred cloud provider and region

3. **Configure database access**
   - Create a database user with username and password
   - Add your IP address to the IP whitelist (or use `0.0.0.0/0` for development)

4. **Get your connection string**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Add the connection string to your `.env` file

### Database Collections

The application automatically creates the following collections:

- **users** - Stores user account information
- **transactions** - Stores all transaction records
- **sessions** - Stores user session data

---

## 📜 Scripts

### Root Directory Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start backend in development mode with hot reload |
| `npm start` | Start backend in production mode |
| `npm run build` | Install all dependencies and build frontend for production |

### Frontend Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

---

## 🔌 API Routes

### GraphQL Endpoint

**Base URL:** `http://localhost:4000/graphql`

### User Queries

```graphql
# Get authenticated user
query GetAuthenticatedUser {
  authUser {
    _id
    username
    name
    profilePicture
    gender
    transactions {
      _id
      description
      amount
      category
    }
  }
}

# Get user by ID
query GetUser($userId: ID!) {
  user(userId: $userId) {
    _id
    username
    name
    profilePicture
    gender
  }
}
```

### User Mutations

```graphql
# Sign up new user
mutation SignUp($input: SignUpInput!) {
  signUp(input: $input) {
    _id
    username
    name
    profilePicture
  }
}

# Login user
mutation Login($input: LoginInput!) {
  login(input: $input) {
    _id
    username
    name
  }
}

# Logout user
mutation Logout {
  logout {
    message
  }
}
```

### Transaction Queries

```graphql
# Get all transactions for authenticated user
query GetTransactions {
  transactions {
    _id
    description
    paymentType
    category
    amount
    location
    date
    user {
      name
      profilePicture
    }
  }
}

# Get single transaction
query GetTransaction($transactionId: ID!) {
  transaction(transactionId: $transactionId) {
    _id
    description
    paymentType
    category
    amount
    location
    date
  }
}

# Get category statistics
query GetCategoryStatistics {
  categoryStatistics {
    category
    totalAmount
  }
}
```

### Transaction Mutations

```graphql
# Create transaction
mutation CreateTransaction($input: CreateTransactionInput!) {
  createTransaction(input: $input) {
    _id
    description
    paymentType
    category
    amount
    location
    date
  }
}

# Update transaction
mutation UpdateTransaction($input: UpdateTransactionInput!) {
  updateTransaction(input: $input) {
    _id
    description
    paymentType
    category
    amount
    location
    date
  }
}

# Delete transaction
mutation DeleteTransaction($transactionId: ID!) {
  deleteTransaction(transactionId: $transactionId) {
    _id
    description
  }
}
```

---

## 🎯 Features Explained in Detail

### Authentication System

The application implements a robust session-based authentication system:

- **Password Security**: Passwords are hashed using bcrypt with a salt factor of 10
- **Session Management**: Express-session with MongoDB store for persistent sessions
- **Passport Integration**: GraphQL-passport for seamless authentication in GraphQL context
- **Protected Routes**: Client-side route guards and server-side resolver authentication
- **Auto-generated Avatars**: Gender-based profile pictures from avatar.iran.liara.run

### Transaction Management

Comprehensive CRUD operations for financial transactions:

- **Category System**: Three main categories (saving, expense, investment)
- **Payment Types**: Support for cash and card transactions
- **Location Tracking**: Optional location field for transaction context
- **Date Management**: Flexible date selection with formatted display
- **Real-time Updates**: Apollo Client cache updates for instant UI feedback

### Analytics Dashboard

Interactive data visualization powered by Chart.js:

- **Doughnut Charts**: Visual breakdown of spending by category
- **Dynamic Colors**: Category-specific color coding (green for savings, red for expenses, blue for investments)
- **Percentage Calculations**: Automatic calculation of category distributions
- **Responsive Design**: Charts adapt to different screen sizes

### User Experience

Modern, intuitive interface with attention to detail:

- **Skeleton Loaders**: Smooth loading states for better perceived performance
- **Toast Notifications**: Non-intrusive feedback for user actions
- **Smooth Animations**: Framer Motion for polished transitions
- **Gradient Designs**: Modern aesthetic with gradient text and backgrounds
- **Mobile-First**: Fully responsive design for all device sizes

---

## 🔒 Security Features

### Authentication & Authorization

- **Bcrypt Password Hashing**: Industry-standard password encryption with salt rounds
- **Session-Based Auth**: Secure session management with HTTP-only cookies
- **CSRF Protection**: SameSite cookie policy for cross-site request forgery prevention
- **Secure Cookies**: HTTPS-only cookies in production environment
- **Authorization Checks**: Resolver-level authentication for all protected operations

### Data Protection

- **Input Validation**: GraphQL schema validation for all inputs
- **MongoDB Injection Prevention**: Mongoose sanitization and parameterized queries
- **Environment Variables**: Sensitive data stored in environment variables
- **CORS Configuration**: Restricted origins for API access
- **Session Expiration**: 7-day session timeout for security

### Best Practices

- **Password Requirements**: Enforced through client-side validation
- **Error Handling**: Generic error messages to prevent information leakage
- **Secure Headers**: Express security middleware for HTTP headers
- **Rate Limiting**: Cron job health checks prevent server overload

---

## ⚡ Performance Optimizations

### Frontend Optimizations

- **Code Splitting**: React lazy loading for route-based code splitting
- **Apollo Client Caching**: Intelligent caching with cache-and-network policy
- **Vite Build Tool**: Lightning-fast HMR and optimized production builds
- **Tree Shaking**: Automatic removal of unused code
- **Asset Optimization**: Minification and compression of CSS/JS
- **SVG Icons**: Lightweight vector icons instead of font icons

### Backend Optimizations

- **MongoDB Indexing**: Indexed fields for faster queries
- **Connection Pooling**: Mongoose connection pool for efficient database access
- **GraphQL Batching**: Reduced network requests through query batching
- **Lean Queries**: Mongoose lean() for faster read operations
- **Cron Job Scheduling**: Efficient background task execution

### Database Optimizations

- **Schema Design**: Normalized data structure with references
- **Query Optimization**: Selective field projection to reduce payload size
- **Aggregation Pipeline**: Efficient category statistics calculation
- **Session Store**: MongoDB session store for scalable session management

---

## 🚀 Deployment Instructions

### Prerequisites for Deployment

- MongoDB Atlas cluster (production tier recommended)
- Node.js hosting platform (Render, Railway, Heroku, etc.)
- Domain name (optional)

### Deployment Steps

1. **Prepare the application**
   ```bash
   npm run build
   ```

2. **Set environment variables on hosting platform**
   - `MONGO_URI`: Production MongoDB connection string
   - `SESSION_SECRET`: Strong random secret (use a password generator)
   - `NODE_ENV`: Set to `production`

3. **Configure MongoDB Atlas**
   - Whitelist your hosting platform's IP addresses
   - Enable connection pooling
   - Set up database backups

4. **Deploy to hosting platform**
   
   **For Render:**
   ```bash
   # Create new Web Service
   # Build Command: npm run build
   # Start Command: npm start
   ```
   
   **For Railway:**
   ```bash
   # Connect GitHub repository
   # Railway auto-detects Node.js
   # Set environment variables in dashboard
   ```

5. **Update CORS origins**
   
   In `backend/index.js`, update the CORS configuration:
   ```javascript
   cors({
     origin: ["https://your-domain.com"],
     credentials: true,
   })
   ```

6. **Update frontend API endpoint**
   
   In `frontend/src/main.jsx`, update the Apollo Client URI:
   ```javascript
   uri: import.meta.env.VITE_NODE_ENV === "development" 
     ? "http://localhost:4000/graphql" 
     : "/graphql"
   ```

7. **Test the deployment**
   - Verify all features work correctly
   - Test authentication flow
   - Check database connections
   - Monitor error logs

### Post-Deployment

- Set up monitoring (e.g., Sentry for error tracking)
- Configure SSL certificates (usually automatic on modern platforms)
- Set up automated backups for MongoDB
- Monitor application performance and logs

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 💬 Support / Contact

For questions, issues, or contributions:

- **GitHub Issues**: [Create an issue](https://github.com/yourusername/expense-tracker/issues)
- **Email**: your.email@example.com
- **Documentation**: See inline code comments for detailed implementation notes

---

## 🙏 Acknowledgments

- **Apollo GraphQL** for the excellent GraphQL implementation
- **MongoDB** for the flexible NoSQL database
- **Tailwind CSS** for the utility-first CSS framework
- **Chart.js** for beautiful data visualizations
- **Passport.js** for authentication middleware
- **React Team** for the amazing UI library

---

<div align="center">

**Built with ❤️ using modern web technologies**

[⬆ Back to Top](#-expense-tracker)

</div>
