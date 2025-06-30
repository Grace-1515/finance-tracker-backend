const mongoose = require('mongoose');
const Transaction = require('../models/transaction');

// 1. GET /api/analytics/category-summary
exports.getCategorySummary = async (req, res) => {
  const userId = req.user.id;
  const { month, year } = req.query;

  try {
    const start = new Date(`${year}-${month}-01`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const categorySummary = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          total: 1
        }
      }
    ]);

    res.json(categorySummary);
  } catch (error) {
    console.error("Category Summary Error:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

// 2. GET /api/analytics/monthly-totals
exports.getMonthlyTotals = async (req, res) => {
  const userId = req.user.id;
  const { month, year } = req.query;

  try {
    const start = new Date(`${year}-${month}-01`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const totals = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: "$type", // 'Income' or 'Expense'
          total: { $sum: "$amount" }
        }
      }
    ]);

    const result = { Income: 0, Expense: 0 };
    totals.forEach(t => {
      result[t._id] = t.total;
    });

    res.json(result);
  } catch (error) {
    console.error("Monthly Totals Error:", error);
    res.status(500).json({ error: 'Server error' });
  }
};
