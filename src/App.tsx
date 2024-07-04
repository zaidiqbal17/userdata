import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SecondPage from './pages/SecondPage';
import PostDetails from './pages/PostDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/second-page" element={<SecondPage />} />
        <Route path="/details/:id" element={<PostDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
