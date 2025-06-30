const Transaction = require('../models/transaction');

exports.getTransactions = async (req, res) => {
  const userId = req.user.id;
  const { startDate, endDate, category, description, limit } = req.query;

  let query = { userId };

  if (startDate && endDate) {
    query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  if (category) {
    query.category = category;
  }

  if (description) {
    query.description = { $regex: description, $options: 'i' };
  }

  try {
    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .limit(limit ? parseInt(limit) : 0); // Limit if provided
    res.json(transactions);
  } catch (err) {
    console.error('Get Transactions Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc   Add a new transaction
exports.addTransaction = async (req, res) => {
  const { date, description, amount, category, type } = req.body;

  try {
    const newTx = new Transaction({
      userId: req.user.id,
      date,
      description,
      amount,
      category,
      type,
    });

    const savedTx = await newTx.save();
    res.status(201).json(savedTx);
  } catch (err) {
    console.error('Add Transaction Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc   Delete a transaction
exports.deleteTransaction = async (req, res) => {
  const userId = req.user.id;
  const txId = req.params.id;

  try {
    const tx = await Transaction.findOneAndDelete({ _id: txId, userId });
    if (!tx) return res.status(404).json({ error: 'Transaction not found' });
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    console.error('Delete Transaction Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc   Update a transaction
exports.updateTransaction = async (req, res) => {
  const userId = req.user.id;
  const txId = req.params.id;
  const updates = req.body;

  try {
    const updatedTx = await Transaction.findOneAndUpdate(
      { _id: txId, userId },
      updates,
      { new: true }
    );

    if (!updatedTx) return res.status(404).json({ error: 'Transaction not found' });

    res.json(updatedTx);
  } catch (err) {
    console.error('Update Transaction Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
