function timer(duration) {
  const durationArray = duration.split(' ');
  const [hours, minutes, seconds] = durationArray;
  let durationInMs = 
    +(hours.slice(0, -1)) * 60 * 60 * 1000 +
    +(minutes.slice(0, -1)) * 60 * 1000 +
    +(seconds.slice(0, -1)) * 1000;

  setTimeout(() => {
    console.log('Time is up!');
  }, durationInMs);
}

timer(process.argv[2]);