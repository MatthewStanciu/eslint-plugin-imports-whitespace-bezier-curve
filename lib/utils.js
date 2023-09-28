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

module.exports.calculatePercentile = calculatePercentile;
