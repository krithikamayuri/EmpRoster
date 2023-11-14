// calculator.js
import { add, subtract } from './mathUtils';

export function calculate(a, b, operation) {
  if (operation === 'add') {
    return add(a, b);
  } else if (operation === 'subtract') {
    return subtract(a, b);
  } else {
    throw new Error('Unsupported operation');
  }
}
