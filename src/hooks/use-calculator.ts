import { useState, useCallback } from 'react';
import { evaluateExpression } from '@/lib/calculator';

interface CalculatorState {
  expression: string;
  result: string;
  memory: number | null;
  history: { expression: string; result: string }[];
  handleInput: (value: string) => void;
}

export function useCalculator(): CalculatorState {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0');
  const [memory, setMemory] = useState<number | null>(null);
  const [history, setHistory] = useState<{ expression: string; result: string }[]>([]);

  const handleInput = useCallback((value: string) => {
    switch (value) {
      case '=':
        try {
          const newResult = evaluateExpression(expression);
          if (newResult !== 'Error') {
            setHistory(prev => [...prev, { expression, result: newResult }]);
          }
          setResult(newResult);
          setExpression('');
        } catch (error) {
          setResult('Error');
        }
        break;

      case 'C':
        setExpression('');
        setResult('0');
        break;

      case '⌫':
        setExpression(prev => prev.slice(0, -1));
        break;

      case 'MC':
        setMemory(null);
        break;

      case 'MR':
        if (memory !== null) {
          setExpression(prev => prev + memory);
        }
        break;

      case 'M+':
        try {
          const currentValue = parseFloat(result);
          if (!isNaN(currentValue)) {
            setMemory((prev) => (prev || 0) + currentValue);
          }
        } catch (error) {
          // Ignore invalid numbers
        }
        break;

      case 'M-':
        try {
          const currentValue = parseFloat(result);
          if (!isNaN(currentValue)) {
            setMemory((prev) => (prev || 0) - currentValue);
          }
        } catch (error) {
          // Ignore invalid numbers
        }
        break;

      case '±':
        if (expression.startsWith('-')) {
          setExpression(expression.slice(1));
        } else {
          setExpression('-' + expression);
        }
        break;

      default:
        setExpression(prev => prev + value);
        break;
    }
  }, [expression, result, memory]);

  return {
    expression,
    result,
    memory,
    history,
    handleInput
  };
}
