import React from 'react';
import '../styles/Display.css';

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <div className="display">
      <div className="display-value">{value}</div>
    </div>
  );
};

export default Display;