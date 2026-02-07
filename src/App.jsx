import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Upload from './pages/Upload';
import Vote from './pages/Vote';
import Search from './pages/Search';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<div style={{padding:'20px'}}><h1>Welcome to PhotoOfTheWeek</h1><p>Upload a photo this week to enter!</p></div>} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
