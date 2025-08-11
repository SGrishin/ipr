import React from 'react';
import '../styles/MetricsPanel.css';

interface MetricsPanelProps {
  metrics: { 
    calculationCount?: number;
    calculationErrors?: number;
    calculationTime?: number;
  };
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics }) => {
  return (
    <div className="metrics-panel">
      <h3>Метрики</h3>
      <ul>
        <li>Операций в минуту: {metrics.calculationCount?.toFixed(2) || 0}</li>
        <li>Ошибок в минуту: {metrics.calculationErrors?.toFixed(2) || 0}</li>
        <li>Среднее время вычисления: {metrics.calculationTime?.toFixed(2) || 0} мс</li>
      </ul>
    </div>
  );
};

export default MetricsPanel;