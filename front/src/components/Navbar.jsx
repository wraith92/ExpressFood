import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/">Accueil</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
    </ul>
  </nav>
);

export default Navbar;
