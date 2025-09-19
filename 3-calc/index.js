import { add } from './add.js';
import { multiply } from './multiply.js';
import { subtraction } from './subtraction.js';
import { division } from './division.js';

const [, , a, b, operation] = process.argv;

switch (operation) {
  case 'add':
    console.log(add(+a, +b));
    break;
  case 'multiply':
    console.log(multiply(+a, +b));
    break;
  case 'subtraction':
    console.log(subtraction(+a, +b));
    break;
  case 'division':
    console.log(division(+a, +b));
    break;
  default:
    console.log('Invalid operation');
    break;
}