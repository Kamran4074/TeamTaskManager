import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();

// CORS configuration
const corsOptions = {
  origin: '*',  // Allow all origins
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Simple health check
app.get('/health', (req, res) => {
  console.log('Health check called');
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API health check
app.get('/api/health', (req, res) => {
  console.log('API health check called');
  res.status(200).json({ success: true, message: 'Server is running', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  console.log('Root endpoint called');
  res.status(200).json({ 
    success: true, 
    message: 'TeamTaskManager API Server',
    version: '1.0.0'
  });
});

// OPTIONS handler for CORS preflight
app.options('*', cors(corsOptions));

// 404 handler
app.use((req, res) => {
  console.log('404 - Route not found:', req.path);
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
});

export default app;
