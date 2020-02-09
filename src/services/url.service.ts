export const toUrlPreview = (url: string, maxStringLength = 20): string => {
  const [_1, _2, path] = url.split(/http(s?):\/\//);
  if (!path) return url;

  return path.length > maxStringLength ? path.slice(0, maxStringLength) + '...' : path;
};

const toSnakeCase = (s?: string) => {
  if (!s) return '';
  const r = s.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);

  if (!r) throw new Error(`Failed to convert ${s} to snake case`);
  return r.map(x => x.toLowerCase()).join('_');
};

export const generateUrlKey = (s: string): string => toSnakeCase(s);
