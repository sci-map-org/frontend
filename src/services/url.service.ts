export const toUrlPreview = (url: string, maxStringLength = 20): string => {
  const [_1, _2, path] = url.split(/http(s?):\/\//);
  if (!path) return url;

  return path.length > maxStringLength ? path.slice(0, maxStringLength) + '...' : path;
};
