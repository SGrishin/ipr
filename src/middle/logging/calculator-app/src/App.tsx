import React from 'react';
import Calculator from './components/Calculator';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Калькулятор с мониторингом</h1>
      <Calculator />
    </div>
  );
};

export default App;