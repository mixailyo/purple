const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const { calc } = require('./calc');

const array = []

for (let i = 1; i <= 300000; i++) {
  array.push(i);
}

console.log('array[array.length - 1]', array[array.length - 1])

const linearCalc = async() => {
  performance.mark('start');
  
  const number = calc(array);
  console.log(number);

  performance.mark('end');
  performance.measure('simpleCalc', 'start', 'end');
}

const workerCalc = (array) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', {
      workerData: {
        array: array
      }
    });

    worker.on('message', (message) => {
      resolve(message);
    });

    worker.on('error', (error) => {
      reject(error);
    });
  })
}

const multiThreadCalc = async() => {
  performance.mark('start');
  
  let number = 0
  
  const results = await Promise.all([
    workerCalc(array.slice(0, 75000)),
    workerCalc(array.slice(75000, 150000)),
    workerCalc(array.slice(150000, 225000)),
    workerCalc(array.slice(225000, 300000))
  ])

  console.log(results)
  number = results.reduce((acc, curr) => acc + Number(curr), 0);

  console.log(number)

  performance.mark('end');
  performance.measure('multiThreadCalc', 'start', 'end');
  console.log(performance.getEntriesByType('measure'));
}

const main = async() => {
  await linearCalc();
  await multiThreadCalc();
}

main();