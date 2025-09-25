const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const { calc } = require('./calc');

const array = []

for (let i = 0; i < 300000; i++) {
  array.push(i);
}

const linearCalc = () => {
  performance.mark('start');
  
  const number = calc(array);
  console.log(number);

  performance.mark('end');
  performance.measure('simpleCalc', 'start', 'end');
  console.log(performance.getEntriesByType('measure'));
}

const multiThreadCalc = () => {
  performance.mark('start');
  
  let number = 0
  
  for (let i = 0; i < 4; i++) {
    const worker = new Worker('./worker.js', {
      workerData: {
        array: array.slice(i * 75000, (i + 1) * 75000)
      }
    });

    worker.on('message', (message) => {
      number += message;
    });
  }

  console.log(number)

  performance.mark('end');
  performance.measure('multiThreadCalc', 'start', 'end');
  console.log(performance.getEntriesByType('measure'));
}

const main = () => {
  linearCalc();
  multiThreadCalc();
}

main();