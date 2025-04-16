function calculateAverage(answers) {
  const sum = answers.reduce((acc, val) => acc + val, 0);
  return sum / answers.length;
}

export { calculateAverage };
