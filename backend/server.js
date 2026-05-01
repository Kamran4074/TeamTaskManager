import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import app from './src/app.js';

dotenv.config();

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const startServer = async () => {
  try {
    console.log('Starting server...');
    console.log('PORT:', PORT);
    console.log('HOST:', HOST);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    
    // Connect to database
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('MongoDB connection successful');

    // Start server
    const server = app.listen(PORT, HOST, () => {
      console.log(`✓ Server running on ${HOST}:${PORT}`);
      console.log(`✓ API available at http://${HOST}:${PORT}/api`);
    });

    // Handle server errors
    server.on('error', (err) => {
      console.error('Server error:', err);
      process.exit(1);
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
