import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transactions = () => {
  const [form, setForm] = useState({
    date: '',
    description: '',
    amount: '',
    category: '',
    type: 'Expense',
  });

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch transactions
  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/transactions', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch transactions');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:5000/api/transactions', form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setForm({ date: '', description: '', amount: '', category: '', type: 'Expense' });
      fetchTransactions(); // Refresh list
    } catch (err) {
      console.error(err);
      setError('Failed to add transaction');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchTransactions(); // Refresh list
    } catch (err) {
      console.error(err);
      setError('Failed to delete transaction');
    }
  };

  return (
    <div className="container">
      <h2>Transactions</h2>

      <form onSubmit={handleSubmit}>
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Transaction'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {transactions.map((tx) => (
          <li key={tx._id}>
            {tx.date?.slice(0, 10)} - {tx.description} - ₹{tx.amount} ({tx.category})
            <button onClick={() => handleDelete(tx._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
