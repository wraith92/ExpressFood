// App.js
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Accueil from './screen/Accueil';
import DashboardAdmin from './screen/DashboardAdmin';

const App = () => (
  <Router>
    <Navbar />
    <Route path="/" exact component={Accueil} />
    <Route path="/dashboard" component={DashboardAdmin} />
  </Router>
);

export default App;