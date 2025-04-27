import React, { useState } from 'react';

type Incident = {
  id: number;
  title: string;
  description: string;
  severity: string;
  reported_at: string;
};

interface IncidentListProps {
  incidents: Incident[];
}

const IncidentList: React.FC<IncidentListProps> = ({ incidents }) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleDescription = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="incident-list">
      {incidents.map((incident) => (
        <div key={incident.id} className="incident-item">
          <h2>{incident.title}</h2>
          <p>Severity: {incident.severity}</p>
          <p>Reported At: {new Date(incident.reported_at).toLocaleDateString()}</p>
          <button onClick={() => toggleDescription(incident.id)}>
            {expanded === incident.id ? 'Hide Details' : 'View Details'}
          </button>
          {expanded === incident.id && <p>{incident.description}</p>}
        </div>
      ))}
    </div>
  );
};

export default IncidentList;
