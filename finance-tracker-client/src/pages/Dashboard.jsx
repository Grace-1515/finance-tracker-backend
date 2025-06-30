import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [summary, setSummary] = useState({ Income: 0, Expense: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  // Optional: month/year based filtering
  const [month] = useState(new Date().getMonth() + 1);
  const [year] = useState(new Date().getFullYear());

  const fetchData = async () => {
    try {
      setLoading(true);
      const [summaryRes, recentRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/analytics/summary?month=${month}&year=${year}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://localhost:5000/api/transactions?limit=5', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setSummary(summaryRes.data);
      setRecent(recentRes.data);
    } catch (err) {
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [month, year]); // ✅ Added dependencies

  return (
    <div>
      <h2>Dashboard</h2>
      {loading ? <p>Loading...</p> : (
        <>
          <div>
            <h3>Summary</h3>
            <p><strong>Income:</strong> ₹{summary.Income}</p>
            <p><strong>Expense:</strong> ₹{summary.Expense}</p>
          </div>

          <div>
            <h3>Recent Transactions</h3>
            <ul>
              {recent.map(tx => (
                <li key={tx._id}>
                  {tx.date.slice(0, 10)} - {tx.description} - ₹{tx.amount} - {tx.category} ({tx.type})
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
