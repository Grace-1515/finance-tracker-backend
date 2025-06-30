const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { getDashboardSummary } = require('../controllers/dashboard.controller');

router.get('/summary', verifyToken, getDashboardSummary);

module.exports = router;
