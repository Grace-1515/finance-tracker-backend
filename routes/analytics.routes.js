const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { getCategorySummary } = require('../controllers/analytics.controller');

// GET /api/analytics/summary
router.get('/summary', verifyToken, getCategorySummary);

module.exports = router;
