# GraphQL Expense Tracker

A full-stack expense tracking application built with the MERN stack and GraphQL. This project demonstrates modern web development practices with real-time data management, user authentication, and interactive data visualization.

## 🚀 Features

- **Full-Stack GraphQL**: Complete GraphQL implementation with Apollo Server and Apollo Client
- **User Authentication**: Secure authentication using Passport.js with session management
- **Expense Management**: Create, read, update, and delete expense transactions
- **Data Visualization**: Interactive charts and graphs using Chart.js
- **Real-time Updates**: Live data synchronization across the application
- **Responsive Design**: Mobile-friendly UI built with React and Tailwind CSS
- **Automated Tasks**: Cron jobs for scheduled operations
- **Session Management**: MongoDB session store for persistent user sessions

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **Apollo Server** - GraphQL server implementation
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Passport.js** - Authentication middleware
- **bcryptjs** - Password hashing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and development server
- **Apollo Client** - GraphQL client with caching
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Data visualization library
- **Framer Motion** - Animation library
- **React Hot Toast** - Toast notifications

## 📁 Project Structure

```
graphql-crash-course-master/
├── backend/
│   ├── db/                 # Database connection
│   ├── models/             # Mongoose models
│   │   ├── user.model.js
│   │   └── transaction.model.js
│   ├── typeDefs/           # GraphQL type definitions
│   │   ├── user.typeDef.js
│   │   └── transaction.typeDef.js
│   ├── resolvers/          # GraphQL resolvers
│   ├── passport/           # Passport.js configuration
│   ├── cron.js            # Scheduled tasks
│   └── index.js           # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── graphql/       # GraphQL queries and mutations
│   │   └── utils/         # Utility functions
│   ├── public/            # Static assets
│   └── dist/              # Production build output
└── package.json           # Root package configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd graphql-crash-course-master
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/expense-tracker
   SESSION_SECRET=your-super-secret-session-key
   NODE_ENV=development
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system or configure MongoDB Atlas connection.

### Development

1. **Start the development server**
   ```bash
   npm run dev
   ```
   
   This will start:
   - Backend server on `http://localhost:4000`
   - GraphQL Playground on `http://localhost:4000/graphql`
   - Frontend development server on `http://localhost:3000`

2. **Access the application**
   - Frontend: `http://localhost:3000`
   - GraphQL Playground: `http://localhost:4000/graphql`

### Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## 📊 Data Models

### User Model
```javascript
{
  username: String (unique),
  name: String,
  password: String (hashed),
  profilePicture: String,
  gender: String (male/female),
  transactions: [Transaction]
}
```

### Transaction Model
```javascript
{
  userId: ObjectId (ref: User),
  description: String,
  paymentType: String (cash/card),
  category: String (saving/expense/investment),
  amount: Number,
  location: String,
  date: Date
}
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 🎯 Key Features Explained

### GraphQL Implementation
- **Type Definitions**: Schema-first approach with strongly typed GraphQL schema
- **Resolvers**: Business logic for data fetching and mutations
- **Apollo Server**: Production-ready GraphQL server with middleware support

### Authentication Flow
- User registration and login with password hashing
- Session-based authentication with MongoDB session store
- Protected routes and GraphQL resolvers

### State Management
- Apollo Client for GraphQL state management
- Optimistic updates for better user experience
- Error handling and loading states


## 🙏 Acknowledgments

- Built as part of a GraphQL crash course
- Demonstrates modern full-stack development practices
- Educational project showcasing MERN + GraphQL integration
