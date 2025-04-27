import React, { useState } from 'react';
import IncidentList from './IncidentList';
import ReportIncidentForm from './ReportIncidentForm';
import { initialIncidents } from './mockdata';

const Dashboard: React.FC = () => {
  const [incidents, setIncidents] = useState(initialIncidents);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Newest First');

  const addIncident = (newIncident: any) => {
    setIncidents([newIncident, ...incidents]);
  };

  const changeFilter = (severity: string) => {
    setFilter(severity);
  };

  const changeSort = (order: string) => {
    setSort(order);
  };

  const filtered = incidents.filter((incident) =>
    filter === 'All' ? true : incident.severity === filter
  );

  const sorted = filtered.sort((a, b) => {
    if (sort === 'Newest First') {
      return new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime();
    } else {
      return new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime();
    }
  });

  return (
    <div className="dashboard">
      <h1>AI Safety Incident Dashboard</h1>
      <div className="controls">
        <button onClick={() => changeFilter('All')}>All</button>
        <button onClick={() => changeFilter('Low')}>Low</button>
        <button onClick={() => changeFilter('Medium')}>Medium</button>
        <button onClick={() => changeFilter('High')}>High</button>
        <select onChange={(e) => changeSort(e.target.value)} value={sort}>
          <option value="Newest First">Newest First</option>
          <option value="Oldest First">Oldest First</option>
        </select>
      </div>
      <IncidentList incidents={sorted} />
      <ReportIncidentForm onReportNewIncident={addIncident} />
    </div>
  );
};

export default Dashboard;
