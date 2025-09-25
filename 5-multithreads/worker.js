const { parentPort, workerData } = require('worker_threads');
const { calc } = require('./calc');

const { array } = workerData;

parentPort.postMessage(calc(array));