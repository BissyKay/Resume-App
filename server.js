const express = require('express');
const multer = require('multer');
const path = require('path');
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');
const db = require('./database/db');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/auth', authRoutes);
app.use('/resume', resumeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
