const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, survival } = require('../controllers/authController');
const { joinTeam } = require('../controllers/jointeamController');
const { CreateC } = require('../controllers/CreateCodeCortex');
const { joinCodeCortex } = require('../controllers/JoinCodeCortexController.js');

// Allowed frontend URLs
const allowedOrigins = [
  'https://riv-f.vercel.app',
  'http://localhost:3001',
  'http://localhost:3000',
  'https://riv-f-frontend.vercel.app',
];

// Middleware setup for CORS
router.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  })
);

// Route for testing the server
router.get('/', test);

// Route for handling Survival Showdown team creation
router.post('/survival', survival); // For creating a new team

// Routes for Code Cortex
router.post('/createCortex', CreateC);
router.post('/joinCortex', joinCodeCortex);

// Route for handling joining a team in Survival Showdown
router.post('/joinTeam', joinTeam);

module.exports = router;
