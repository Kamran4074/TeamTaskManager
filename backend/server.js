import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import app from './src/app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log('Starting server...');
    console.log('PORT:', PORT);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    
    // Connect to database
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('MongoDB connection successful');

    // Start server
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Handle server errors
    server.on('error', (err) => {
      console.error('Server error:', err);
      process.exit(1);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
