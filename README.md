# Project Management Application

A comprehensive full-stack project management system built with the MERN stack (MongoDB, Express, React, Node.js). This application enables teams to efficiently manage projects, assign tasks, and track progress with role-based access control.

## Features

### Core Functionality
- **User Authentication**: Secure signup and login with JWT-based authentication
- **Project Management**: Create, manage, and organize projects with team collaboration
- **Task Management**: Assign tasks to team members with status tracking and priority levels
- **Role-Based Access Control**: Distinct permissions for Admin and Member roles
- **Real-time Dashboard**: Monitor project statistics and task progress at a glance
- **Employee ID System**: Unique identification for task assignment and tracking

### Admin Capabilities
- Create and manage projects
- Assign tasks to team members using employee IDs
- View all tasks and monitor team progress
- Delete projects and tasks
- Manage team members and their roles

### Member Capabilities
- View all available projects
- See tasks assigned to them (by employee ID)
- Update task status (To Do → In Progress → Completed)
- Track personal task progress
- View project details and team information

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

### Frontend
- **Library**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **UI Icons**: Lucide React
- **Notifications**: React Toastify
- **Date Handling**: date-fns

## Project Structure

```
project-management-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # Database connection
│   │   ├── controllers/
│   │   │   ├── authController.js     # Authentication logic
│   │   │   ├── projectController.js  # Project operations
│   │   │   └── taskController.js     # Task operations
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js     # JWT verification
│   │   │   └── roleMiddleware.js     # Role-based access control
│   │   ├── models/
│   │   │   ├── User.js               # User schema
│   │   │   ├── Project.js            # Project schema
│   │   │   ├── Task.js               # Task schema
│   │   │   └── Membership.js         # Project membership
│   │   ├── routes/
│   │   │   ├── authRoutes.js         # Auth endpoints
│   │   │   ├── projectRoutes.js      # Project endpoints
│   │   │   └── taskRoutes.js         # Task endpoints
│   │   ├── services/
│   │   │   ├── authService.js        # Auth business logic
│   │   │   ├── projectService.js     # Project business logic
│   │   │   └── taskService.js        # Task business logic
│   │   ├── utils/
│   │   │   ├── generateToken.js      # JWT token generation
│   │   │   └── validators.js         # Input validation
│   │   └── app.js                    # Express app setup
│   ├── server.js                     # Server entry point
│   ├── .env                          # Environment variables
│   └── package.json                  # Dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── common/
│   │   │       ├── Header.jsx        # Navigation header
│   │   │       └── Header.css
│   │   ├── context/
│   │   │   ├── AuthContext.jsx       # Auth state management
│   │   │   └── AppContext.jsx        # App state management
│   │   ├── hooks/
│   │   │   └── useAuth.js            # Auth hook
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Signup.jsx
│   │   │   │   └── Auth.css
│   │   │   ├── dashboard/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   └── Dashboard.css
│   │   │   ├── projects/
│   │   │   │   ├── ProjectList.jsx
│   │   │   │   └── Projects.css
│   │   │   └── tasks/
│   │   │       ├── TaskList.jsx
│   │   │       └── Tasks.css
│   │   ├── routes/
│   │   │   └── PrivateRoute.jsx      # Protected routes
│   │   ├── services/
│   │   │   ├── api.js                # Axios configuration
│   │   │   ├── authService.js        # Auth API calls
│   │   │   ├── projectService.js     # Project API calls
│   │   │   └── taskService.js        # Task API calls
│   │   ├── App.jsx                   # Main app component
│   │   ├── App.css
│   │   └── main.jsx                  # React entry point
│   ├── vite.config.js                # Vite configuration
│   ├── index.html
│   └── package.json                  # Dependencies
│
├── .gitignore
├── package.json                      # Root package.json
└── README.md                         # This file
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project-management-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

### Configuration

1. **Backend Environment Variables** (`backend/.env`)
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   JWT_SECRET=your-secret-key
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

2. **Frontend Proxy** (configured in `vite.config.js`)
   - Automatically proxies `/api` requests to `http://localhost:5000`

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm start
   ```
   Server runs on `http://localhost:5000`

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Application runs on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects/my-projects` - Get user's projects
- `GET /api/projects/all-projects` - Get all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/tasks/my-tasks` - Get user's tasks
- `GET /api/tasks/all-tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## User Roles

### Admin
- Full access to create and manage projects
- Can assign tasks to team members
- View all tasks and monitor progress
- Manage team members and roles

### Member
- View all projects in the system
- See tasks assigned to them (by employee ID)
- Update task status
- Cannot create or delete projects/tasks

## Authentication Flow

1. User registers with name, email, password, employee ID, and role
2. System validates input and creates user account
3. User logs in with email and password
4. JWT token is generated and stored in localStorage
5. Token is included in all subsequent API requests
6. Token expires after 7 days

## Task Assignment

Tasks are assigned using employee IDs:
- Admin enters employee ID when creating a task
- System matches the ID with the member's employee ID
- Member sees tasks assigned to their ID
- Only assigned member or admin can update task status

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Role-based access control (RBAC)
- Protected API routes
- Secure token storage
- Input validation and sanitization

## Error Handling

- Comprehensive error messages
- Toast notifications for user feedback
- Graceful error recovery
- Validation on both client and server

## Future Enhancements

- Task comments and collaboration
- File attachments
- Email notifications
- Advanced reporting and analytics
- Team performance metrics
- Recurring tasks
- Task dependencies
- Calendar view

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@projectmanagement.com or open an issue in the repository.

## Deployment

The application is ready for deployment on platforms like:
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, Railway, AWS, DigitalOcean
- **Database**: MongoDB Atlas (already configured)

## Changelog

### Version 1.0.0
- Initial release
- User authentication with JWT
- Project management system
- Task assignment and tracking
- Role-based access control
- Employee ID-based task assignment
- Real-time dashboard
- Toast notifications
