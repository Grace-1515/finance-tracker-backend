import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', background: '#f0f0f0' }}>
      <Link to="/" style={{ marginRight: '15px' }}>Dashboard</Link>
      <Link to="/transactions" style={{ marginRight: '15px' }}>Transactions</Link>
      <Link to="/analytics" style={{ marginRight: '15px' }}>Analytics</Link>
      <Link to="/login" style={{ marginRight: '15px' }}>Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
};

export default Navbar;
