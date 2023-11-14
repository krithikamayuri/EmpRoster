// calculator.test.js
import { calculate } from '../src/boundary/calculator';

// Test case 1
test('adds 1 + 2 to equal 3', () => {
  expect(calculate(1, 2, 'add')).toBe(3);
});

// Test case 2
test('subtracts 5 - 2 to equal 3', () => {
  expect(calculate(5, 2, 'subtract')).toBe(3);
});
