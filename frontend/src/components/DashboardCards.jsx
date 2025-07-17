import React from 'react';

function DashboardCards({ onSelect }) {
  return (
    <div className="dashboard-cards">
      <div className="dashboard-card" onClick={() => onSelect('add')}>
        <h2>Add Sweet</h2>
      </div>
      <div className="dashboard-card" onClick={() => onSelect('view')}>
        <h2>View Sweets</h2>
      </div>
      <div className="dashboard-card" onClick={() => onSelect('manage')}>
        <h2>Purchase/Restock Sweet</h2>
      </div>
    </div>
  );
}

export default DashboardCards; 