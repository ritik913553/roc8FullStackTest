import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmailView from './pages/EmailView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmailView />} />
      </Routes>
    </Router>
  );
}

export default App;
