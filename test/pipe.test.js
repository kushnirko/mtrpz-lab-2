import { test, expect } from '@jest/globals';
import pipe from '../lib/pipe.js';

test('Function pipe', () => {
  const pow2 = (value) => value * value;
  const increment = (value) => value + 1;
  const half = (value) => value / 2;
  const res = pipe([pow2, increment, half])(5);
  expect(res).toBe(13);
});
