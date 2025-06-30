import { useEffect, useState } from 'react';
import axios from 'axios';

const Analytics = () => {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const token = localStorage.getItem('token');

  const fetchCategorySummary = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/analytics/category-summary?month=${month}&year=${year}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    } catch (err) {
      console.error('Error fetching summary:', err);
    }
  };

  useEffect(() => {
    fetchCategorySummary();
  }, [month, year]); // ✅ Added dependencies

  return (
    <div>
      <h2>Analytics (Category Summary)</h2>
      <ul>
        {data.map((item) => (
          <li key={item.category}>
            {item.category}: ₹{item.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Analytics;
