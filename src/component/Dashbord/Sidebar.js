// HII NI SEHEMU YA PEMBE
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ setActiveSection }) => {
  return (
    <div className="sidebar">
      <div className="brand">
        <h2>Luxury Dashboard</h2>
      </div>
      <ul className="sidebar-links">
        <li onClick={() => setActiveSection('dashboard')}><span className="link-text">Dashboard</span></li>
        <li onClick={() => setActiveSection('orders')}><span className="link-text">Orders</span></li>
        <li onClick={() => setActiveSection('payments')}><span className="link-text">Payments</span></li>
        <li onClick={() => setActiveSection('profile')}><span className="link-text">Profile</span></li>
      </ul>
    </div>
  );
};

export default Sidebar;
