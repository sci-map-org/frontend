export const shortenString = (s: string, maxLength: number): string => {
  return s.length > maxLength ? s.slice(0, maxLength) + '...' : s;
};
