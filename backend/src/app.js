import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Simple health check - no dependencies
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
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

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
