const calc = (array) => {
  let number = 0
  for (let i = 0; i < array.length; i++) {
    if (array[i] % 3 === 0) {
      number++;
    }
  }
  return number
}

module.exports = { calc }