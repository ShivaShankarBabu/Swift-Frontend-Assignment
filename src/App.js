import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CommentsDashboard from './pages/CommentsDashboard';
import ProfileScreen from './pages/ProfileScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CommentsDashboard />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
    </Router>
  );
};

export default App;