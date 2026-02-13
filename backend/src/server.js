const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../../public')));

// Import routes
const landingRoutes = require('./routes/landing');
const adminRoutes = require('./routes/admin');
const { initializeDatabase } = require('./config/database');

// Initialize database
initializeDatabase().catch(console.error);

// Routes
app.use('/api/landing', landingRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'VOSH Church Kitengela API is running' });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to VOSH Church International Kitengela API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      landing: '/api/landing'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, async () => {
  console.log(`🚀 VOSH Church Kitengela API server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  try {
    await initializeDatabase();
  } catch (error) {
    console.error('Database initialization error:', error);
  }
});
