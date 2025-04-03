export const parseRange = (range: string) => {
  if (range.includes('-')) {
    const [start, end] = range.split('-').map(Number);
    return [start - 1, end - 1]; // Convert to 0-based
  }
  const line = Number(range) - 1;
  return [line, line];
};
