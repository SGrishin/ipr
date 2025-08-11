import React from 'react';
import { CalculatorOperation } from '../types/index';
import '../styles/Keypad.css';

interface KeypadProps {
  onNumberInput: (num: string) => void;
  onOperation: (op: CalculatorOperation) => void;
}

const Keypad: React.FC<KeypadProps> = ({ onNumberInput, onOperation }) => {
  return (
    <div className="keypad">
      <div className="keypad-row">
        <button 
          className="key clear-key" 
          onClick={() => onOperation('C')}
          aria-label="Clear"
        >
          AC
        </button>
        <button 
          className="key operation-key" 
          onClick={() => onOperation('/')}
          aria-label="Divide"
        >
          ÷
        </button>
        <button 
          className="key operation-key" 
          onClick={() => onOperation('*')}
          aria-label="Multiply"
        >
          ×
        </button>
      </div>
      
      <div className="keypad-row">
        <button className="key digit-key" onClick={() => onNumberInput('7')}>7</button>
        <button className="key digit-key" onClick={() => onNumberInput('8')}>8</button>
        <button className="key digit-key" onClick={() => onNumberInput('9')}>9</button>
        <button 
          className="key operation-key" 
          onClick={() => onOperation('-')}
          aria-label="Subtract"
        >
          -
        </button>
      </div>
      
      <div className="keypad-row">
        <button className="key digit-key" onClick={() => onNumberInput('4')}>4</button>
        <button className="key digit-key" onClick={() => onNumberInput('5')}>5</button>
        <button className="key digit-key" onClick={() => onNumberInput('6')}>6</button>
        <button 
          className="key operation-key" 
          onClick={() => onOperation('+')}
          aria-label="Add"
        >
          +
        </button>
      </div>
      
      <div className="keypad-row">
        <button className="key digit-key" onClick={() => onNumberInput('1')}>1</button>
        <button className="key digit-key" onClick={() => onNumberInput('2')}>2</button>
        <button className="key digit-key" onClick={() => onNumberInput('3')}>3</button>
        <button 
          className="key equals-key" 
          onClick={() => onOperation('=')}
          aria-label="Equals"
        >
          =
        </button>
      </div>
      
      <div className="keypad-row">
        <button 
          className="key digit-key zero-key" 
          onClick={() => onNumberInput('0')}
        >
          0
        </button>
        <button 
          className="key digit-key" 
          onClick={() => onNumberInput('.')}
          aria-label="Decimal point"
        >
          .
        </button>
      </div>
    </div>
  );
};

export default Keypad;