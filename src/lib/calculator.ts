import { create, all } from 'mathjs';

// Create math instance with specific configuration
const math = create(all);

export function evaluateExpression(expr: string): string {
  try {
    // Replace symbols with math functions
    const prepared = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'pi')
      .replace(/√/g, 'sqrt')
      .replace(/\|x\|/g, 'abs');

    const result = math.evaluate(prepared);
    return typeof result === 'number' ? result.toString() : result;
  } catch (error) {
    return 'Error';
  }
}

export function formatNumber(num: number): string {
  if (Number.isInteger(num)) {
    return num.toString();
  }
  return num.toFixed(8).replace(/\.?0+$/, '');
}