const Transaction = require('../models/transaction');

exports.getDashboardSummary = async (req, res) => {
  const userId = req.user.id;
  const { month, year } = req.query;

  try {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    const transactions = await Transaction.find({
      userId,
      date: { $gte: start, $lte: end },
    });

    const summary = { Income: 0, Expense: 0 };

    transactions.forEach(tx => {
      summary[tx.type] += tx.amount;
    });

    res.json(summary);
  } catch (err) {
    console.error('Dashboard summary error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
