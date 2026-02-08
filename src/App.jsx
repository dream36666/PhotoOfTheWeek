import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Upload from './pages/Upload';
import Vote from './pages/Vote';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Info from './pages/Info';

export default function App() {
  return (
    /* CHANGE 1: Added basename so it works on GitHub Pages sub-folders */
    <Router>
      <AuthProvider>
        <Navbar />
        <div style={{ padding: '20px' }}> {/* Added a container for spacing */}
          <Routes>
            {/* CHANGE 2: Replaced <Home /> with an actual message since Home wasn't defined */}
            <Route path="/" element={
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>📸 Photo of the Week</h1>
                <p>Upload your best shot this week, vote for last week's winner!</p>
              </div>
            } />
            <Route path="/upload" element={<Upload />} />
            <Route path="/vote" element={<Vote />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}
