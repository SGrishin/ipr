export type CalculatorOperation = '+' | '-' | '*' | '/' | '=' | 'C';

export interface Metric {
  name: string;
  value: number;
  timestamp: Date;
}

export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
}