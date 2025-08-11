import { CalculatorOperation } from '../types/index';
import { log } from './logger';
import { recordMetric } from './metrics';

export const calculate = (
  currentValue: string,
  previousValue: string,
  operation: CalculatorOperation | null
): { currentValue: string; previousValue: string; operation: CalculatorOperation | null } => {
  log.info(`Calculating: ${previousValue} ${operation} ${currentValue}`, {
    currentValue,
    previousValue,
    operation
  });

  if (operation === null) {
    return { currentValue, previousValue, operation };
  }

  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  let result = 0;

    console.log("test123 prev = ", prev);
    console.log("test123 current = ", current);
  try {
    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        if (current === 0) {
          log.error('Division by zero attempted', { previousValue, currentValue });
          throw new Error('Division by zero');
        }
        result = prev / current;
        break;
      case '=':
        return { currentValue, previousValue: '0', operation: null };
      case 'C':
        return { currentValue: '0', previousValue: '0', operation: null };
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }

    recordMetric('calculation_count', 1);
    recordMetric('calculation_time', performance.now());
    recordMetric('calculation_result', result);

    log.debug(`Calculation result: ${result}`, { result });

    console.log("test123 result = ", result);
    
    
    return {
      currentValue: result.toString(),
      previousValue: '0',
      operation: null
    };
  } catch (error) {
    const err = error as Error;
    console.log("test123 error = ", error);
    log.error(`Calculation error: ${err.message}`, { 
      stack: err.stack,
      currentValue,
      previousValue,
      operation 
    });
    recordMetric('calculation_errors', 1);
    return { currentValue: 'Error', previousValue: '0', operation: null };
  }
};