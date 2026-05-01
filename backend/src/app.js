import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend build
const frontendPath = path.join(__dirname, '../../frontend/dist');
const frontendExists = fs.existsSync(frontendPath);

if (frontendExists) {
  app.use(express.static(frontendPath));
  console.log('Frontend static files served from:', frontendPath);
} else {
  console.warn('Frontend dist folder not found at:', frontendPath);
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

// Serve frontend for all other routes (SPA fallback)
if (frontendExists) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
} else {
  app.get('*', (req, res) => {
    res.status(200).json({ 
      success: true, 
      message: 'API Server is running. Frontend build not found.',
      endpoints: {
        health: '/api/health',
        auth: '/api/auth',
        projects: '/api/projects',
        tasks: '/api/tasks'
      }
    });
  });
}

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

export default app;

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

export default app;
