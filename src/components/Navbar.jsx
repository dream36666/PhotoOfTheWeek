import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { currentUser, login, logout } = useAuth();

  return (
    <nav style={{ padding: '1rem', background: '#333', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }}>PhotoOfTheWeek</Link>
        <Link to="/upload" style={{ color: '#ddd', textDecoration: 'none' }}>Upload (This Week)</Link>
        <Link to="/vote" style={{ color: '#ddd', textDecoration: 'none' }}>Vote (Last Week)</Link>
        <Link to="/search" style={{ color: '#ddd', textDecoration: 'none' }}>Search</Link>
        <Link to="/leaderboard" style={{ color: '#ddd', textDecoration: 'none' }}>Leaderboard</Link>
        <Link to="/info" style={{ color: '#ddd', textDecoration: 'none' }}>Help</Link>
      </div>
      <div>
        {currentUser ? (
          <div style={{ display: 'flex', gap: '15px' }}>
             <Link to={`/profile/${currentUser.uid}`} style={{ color: 'white' }}>My Profile</Link>
             <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <button onClick={login}>Login with Google</button>
        )}
      </div>
    </nav>
  );
}
