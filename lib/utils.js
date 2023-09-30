function calculatePercentile(arr, percentile) {
  let count = 0;
  arr.forEach((p) => {
    if (p < percentile) {
      count++;
    } else if (p === percentile) {
      count += 0.5;
    }
  });
  return (100 * count) / arr.length;
}

async function sleep() {
  return setTimeout(() => {}, 10000);
}

module.exports.calculatePercentile = calculatePercentile;
