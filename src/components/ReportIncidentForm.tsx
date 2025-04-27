import React, { useState } from 'react';

interface ReportIncidentFormProps {
  onReportNewIncident: (incident: any) => void;
}

const ReportIncidentForm: React.FC<ReportIncidentFormProps> = ({ onReportNewIncident }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [sev, setSev] = useState('Medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInc = {
      id: Math.random(),
      title,
      description: desc,
      severity: sev,
      reported_at: new Date().toISOString(),
    };
    onReportNewIncident(newInc);
    setTitle('');
    setDesc('');
  };

  return (
    <div className="report-incident-form">
      <h3>Report New Incident</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Incident Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Incident Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <select value={sev} onChange={(e) => setSev(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Submit Incident</button>
      </form>
    </div>
  );
};

export default ReportIncidentForm;
