// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Accueil from './screen/Accueil';
import DashboardAdmin from './screen/DashboardAdmin';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/dashboard" element={<DashboardAdmin />} />
    </Routes>
  </Router>
);

export default App;
