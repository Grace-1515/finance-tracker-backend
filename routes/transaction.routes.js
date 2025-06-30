const express = require('express');
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction
} = require('../controllers/transaction.controller');

const { verifyToken } = require('../middleware/auth'); // adjust if filename differs

// Routes
router.get('/', verifyToken, getTransactions);
router.post('/', verifyToken, addTransaction);
router.delete('/:id', verifyToken, deleteTransaction);
router.put('/:id', verifyToken, updateTransaction);

module.exports = router;
