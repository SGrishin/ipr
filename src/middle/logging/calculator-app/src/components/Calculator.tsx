import React, { useState, useEffect } from 'react';
import Display from './Display';
import Keypad from './Keypad';
import MetricsPanel from './MetricsPanel';
import LogsPanel from './LogsPanel';
import { CalculatorOperation } from '../types/index';
import { calculate } from '../services/calculatorLogic';
import { log } from '../services/logger';
import { recordMetric, getAverage, getSumAverage } from '../services/metrics';
import '../styles/Calculator.css';

const Calculator: React.FC = () => {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState('0');
  const [operation, setOperation] = useState<CalculatorOperation | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const updateLogsAndMetrics = () => {
      try {
        setLogs(log.getLogs().slice().reverse());
        
        const newMetrics = {
          calculationCount: getSumAverage('calculation_count', 1),
          calculationErrors: getSumAverage('calculation_errors', 1),
          calculationTime: getAverage('calculation_time', 1),
        };
        setMetrics(newMetrics);
      } catch (error) {
        console.error('Error updating logs and metrics:', error);
      }
    };

    const interval = setInterval(updateLogsAndMetrics, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNumberInput = (num: string) => {
    log.info(`Number input: ${num}`, { currentValue });
    recordMetric('button_presses', 1);

    if (currentValue === '0' || currentValue === 'Error') {
      setCurrentValue(num);
    } else {
      setCurrentValue(currentValue + num);
    }
  };

  const handleOperation = (op: CalculatorOperation) => {
    log.info(`Operation selected: ${op}`, { operation: op });
    recordMetric('operation_selections', 1);

    if (op === 'C') {
      const result = calculate(currentValue, previousValue, op);
      setCurrentValue(result.currentValue);
      setPreviousValue(result.previousValue);
      setOperation(result.operation);
      return;
    }

    if (op === '=') {
      const result = calculate(currentValue, previousValue, operation);
      setCurrentValue(result.currentValue);
      setPreviousValue(result.previousValue);
      setOperation(result.operation);
      return;
    }

    setPreviousValue(currentValue);
    setCurrentValue('0');
    setOperation(op);
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <Display value={currentValue} />
        <Keypad
          onNumberInput={handleNumberInput}
          onOperation={handleOperation}
        />
      </div>
      
      <div className="monitoring-panels">
        <MetricsPanel metrics={metrics} />
        <LogsPanel logs={logs} />
      </div>
    </div>
  );
};

export default Calculator;