// HII NI DASHBORD YANGU.
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard'); 

  return (
    <div className="dashboard-container-user">
      <Header />
      <div className="dashboard-body">
        <Sidebar setActiveSection={setActiveSection} />
        <MainContent activeSection={activeSection} />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
