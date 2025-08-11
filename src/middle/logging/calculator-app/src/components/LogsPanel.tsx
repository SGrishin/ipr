import React from 'react';
import '../styles/LogsPanel.css';

interface LogsPanelProps {
  logs: string[];
}

const LogsPanel: React.FC<LogsPanelProps> = ({ logs }) => {
  return (
    <div className="logs-panel">
      <h3>Логи</h3>
      <div className="logs-container">
        {logs.map((log, index) => (
          <div key={index} className="log-entry">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogsPanel;