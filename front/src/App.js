// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Accueil from './screen/Accueil';
import DashboardAdmin from './screen/DashboardAdmin';
import PageLivreur from './screen/PageLivreur';
import LoginPage from './screen/LoginPage';
const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Accueil/>} />
      <Route path="/dashboard" element={<DashboardAdmin/>} />
      <Route path="/livreur" element={<PageLivreur/>} />
      <Route path="/login" element={<LoginPage/>} />
    </Routes>
  </Router>
);

export default App;
