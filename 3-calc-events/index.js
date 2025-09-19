import { add } from './add.js';
import { multiply } from './multiply.js';
import { subtraction } from './subtraction.js';
import { division } from './division.js';
import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

const [, , a, b, operation] = process.argv;

eventEmitter.on('add', (a, b) => {
  console.log(add(a, b));
});

eventEmitter.on('multiply', (a, b) => {
  console.log(multiply(a, b));
});

eventEmitter.on('subtraction', (a, b) => {
  console.log(subtraction(a, b));
});

eventEmitter.on('division', (a, b) => {
  console.log(division(a, b));
});

switch (operation) {
  case 'add':
    eventEmitter.emit('add', +a, +b);
    break;
  case 'multiply':
    eventEmitter.emit('multiply', +a, +b);
    break;
  case 'subtraction':
    eventEmitter.emit('subtraction', +a, +b);
    break;
  case 'division':
    eventEmitter.emit('division', +a, +b);
    break;
  default:
    console.log('Invalid operation');
    break;
}