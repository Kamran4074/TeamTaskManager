================================================================================
                    TEAMTASKMANAGER - PROJECT MANAGEMENT APP
================================================================================

PROJECT OVERVIEW
================================================================================
TeamTaskManager is a full-stack web application built with the MERN stack 
(MongoDB, Express, React, Node.js) that allows teams to create projects, 
assign tasks, and track progress with role-based access control.

LIVE DEPLOYMENT
================================================================================
Frontend (Vercel):  https://team-task-manager-plum.vercel.app
Backend API (Railway): https://teamtaskmanager-production-d52c.up.railway.app
GitHub Repository: https://github.com/Kamran4074/TeamTaskManager

FEATURES
================================================================================
✓ User Authentication (Signup/Login with JWT tokens)
✓ Role-Based Access Control (Admin & Member roles)
✓ Project Management (Create, Read, Update, Delete)
✓ Task Management (Create, Assign, Update Status, Delete)
✓ Employee ID System (Unique identification for team members)
✓ Task Assignment by Employee ID
✓ Real-time Toast Notifications
✓ Responsive UI with Lucide React Icons
✓ MongoDB Atlas Cloud Database
✓ CORS-enabled API

TECH STACK
================================================================================
Frontend:
  - React 18.2.0
  - Vite 5.0.0
  - React Router DOM 6.16.0
  - Axios 1.5.0
  - React Toastify 9.1.3
  - Lucide React 0.263.1

Backend:
  - Node.js 22.22.2
  - Express 4.18.0
  - MongoDB 7.0.0
  - Mongoose 7.0.0
  - JWT (jsonwebtoken 9.0.0)
  - CORS 2.8.5
  - bcryptjs 2.4.3

Database:
  - MongoDB Atlas (Cloud)
  - Connection: mongodb+srv://TeamTaskManager:***@teamtaskmanager.qzf6xvt.mongodb.net

INSTALLATION & SETUP
================================================================================

1. CLONE THE REPOSITORY
   git clone https://github.com/Kamran4074/TeamTaskManager.git
   cd TeamTaskManager

2. INSTALL DEPENDENCIES

   Backend:
   cd backend
   npm install
   
   Frontend:
   cd ../frontend
   npm install

3. CONFIGURE ENVIRONMENT VARIABLES

   Backend (.env file):
   PORT=8080
   MONGODB_URI=mongodb+srv://TeamTaskManager:TeamTaskManager123@teamtaskmanager.qzf6xvt.mongodb.net/project-management?retryWrites=true&w=majority
   JWT_SECRET=your-secret-key-change-in-production
   JWT_EXPIRE=7d
   NODE_ENV=development

4. START THE APPLICATION

   Backend (from backend directory):
   npm start
   
   Frontend (from frontend directory):
   npm run dev

   The app will be available at http://localhost:5173

PROJECT STRUCTURE
================================================================================

TeamTaskManager/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 (MongoDB connection)
│   │   ├── controllers/
│   │   │   ├── authController.js     (Auth logic)
│   │   │   ├── projectController.js  (Project logic)
│   │   │   └── taskController.js     (Task logic)
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js     (JWT verification)
│   │   │   └── roleMiddleware.js     (Role-based access)
│   │   ├── models/
│   │   │   ├── User.js               (User schema)
│   │   │   ├── Project.js            (Project schema)
│   │   │   ├── Task.js               (Task schema)
│   │   │   └── Membership.js         (Project membership)
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── projectRoutes.js
│   │   │   └── taskRoutes.js
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── projectService.js
│   │   │   └── taskService.js
│   │   ├── app.js                    (Express app setup)
│   │   └── utils/
│   │       ├── generateToken.js
│   │       └── validators.js
│   ├── server.js                     (Server entry point)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── common/
│   │   │       ├── Header.jsx        (Navigation header)
│   │   │       └── Header.css
│   │   ├── context/
│   │   │   ├── AuthContext.jsx       (Auth state management)
│   │   │   └── AppContext.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.js            (Auth hook)
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
│   │   ├── services/
│   │   │   ├── api.js                (Axios instance)
│   │   │   ├── authService.js
│   │   │   ├── projectService.js
│   │   │   └── taskService.js
│   │   ├── App.jsx                   (Main app component)
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── .gitignore
├── README.md                         (Detailed documentation)
└── README.txt                        (This file)

API ENDPOINTS
================================================================================

Authentication:
  POST   /api/auth/signup             Create new account
  POST   /api/auth/login              Login user
  GET    /api/auth/me                 Get current user (requires token)

Projects:
  GET    /api/projects/my-projects    Get user's projects
  GET    /api/projects/all-projects   Get all projects (for members)
  POST   /api/projects                Create new project (admin only)
  GET    /api/projects/:projectId     Get project details
  PUT    /api/projects/:projectId     Update project (admin only)
  DELETE /api/projects/:projectId     Delete project (admin only)
  GET    /api/projects/:projectId/members  Get project members

Tasks:
  GET    /api/tasks/my-tasks          Get user's assigned tasks
  GET    /api/tasks/all-tasks         Get all tasks (admin only)
  POST   /api/tasks                   Create new task (admin only)
  GET    /api/tasks/:taskId           Get task details
  PUT    /api/tasks/:taskId           Update task
  DELETE /api/tasks/:taskId           Delete task (admin only)

Health Check:
  GET    /health                      Server health status
  GET    /api/health                  API health status

USER ROLES & PERMISSIONS
================================================================================

ADMIN:
  ✓ Create, edit, delete projects
  ✓ Create, edit, delete tasks
  ✓ Assign tasks to team members
  ✓ View all projects and tasks
  ✓ Manage project members

MEMBER:
  ✓ View all projects
  ✓ View assigned tasks
  ✓ Update task status
  ✓ Cannot create or delete projects/tasks

AUTHENTICATION FLOW
================================================================================

1. User signs up with:
   - Full Name
   - Email
   - Password
   - Employee ID (unique number)
   - Role (Admin or Member)

2. User logs in with Email & Password

3. Backend returns JWT token (valid for 7 days)

4. Token stored in localStorage

5. Token sent with every API request in Authorization header:
   Authorization: Bearer <token>

6. Logout clears token and redirects to login

EMPLOYEE ID SYSTEM
================================================================================

Each user has a unique Employee ID (number):
  - Admin enters Employee IDs manually (e.g., 2, 3, 5, 600)
  - Members enter their Employee ID during signup
  - Tasks are assigned using Employee IDs
  - Members see tasks assigned to their Employee ID

Example:
  Admin creates task and assigns to Employee ID: 123
  Member with Employee ID 123 logs in and sees the task

DEPLOYMENT INSTRUCTIONS
================================================================================

DEPLOY BACKEND TO RAILWAY:

1. Create Railway account at https://railway.app
2. Connect GitHub repository
3. Create new service from GitHub
4. Set environment variables in Railway dashboard:
   - MONGODB_URI
   - JWT_SECRET
   - JWT_EXPIRE
   - NODE_ENV=production
5. Railway auto-deploys on git push

DEPLOY FRONTEND TO VERCEL:

1. Create Vercel account at https://vercel.com
2. Import GitHub repository
3. Configure:
   - Framework: Vite
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: dist
4. Vercel auto-deploys on git push

ENVIRONMENT VARIABLES
================================================================================

Backend (.env):
  PORT=8080
  MONGODB_URI=<your-mongodb-connection-string>
  JWT_SECRET=<your-secret-key>
  JWT_EXPIRE=7d
  NODE_ENV=production

Frontend (.env):
  VITE_API_URL=https://teamtaskmanager-production-d52c.up.railway.app/api

TROUBLESHOOTING
================================================================================

Issue: CORS Error
Solution: Check backend CORS configuration allows frontend origin

Issue: 502 Bad Gateway
Solution: Check Railway deploy logs for server errors

Issue: MongoDB Connection Failed
Solution: Verify MONGODB_URI in environment variables

Issue: Tasks not showing
Solution: Ensure Employee ID matches between task assignment and user

Issue: Login not working
Solution: Check JWT_SECRET is set correctly in backend

SECURITY FEATURES
================================================================================

✓ Password hashing with bcryptjs
✓ JWT token-based authentication
✓ Role-based access control
✓ CORS protection
✓ Input validation
✓ Protected API routes
✓ Secure token storage (localStorage)
✓ 7-day token expiration

FUTURE ENHANCEMENTS
================================================================================

- Email notifications for task assignments
- Task comments and activity log
- File attachments for tasks
- Task priority levels
- Due date reminders
- Team collaboration features
- Advanced filtering and search
- Task templates
- Recurring tasks
- Performance analytics dashboard

SUPPORT & CONTACT
================================================================================

GitHub: https://github.com/Kamran4074/TeamTaskManager
Issues: Report bugs on GitHub Issues
Email: kamran4074@gmail.com

LICENSE
================================================================================

This project is open source and available under the ISC License.

CHANGELOG
================================================================================

Version 1.0.0 (May 1, 2026):
  - Initial release
  - Full MERN stack implementation
  - Role-based access control
  - Employee ID system
  - MongoDB Atlas integration
  - Railway & Vercel deployment

================================================================================
                            END OF README
================================================================================
