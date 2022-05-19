export const shortenString = (s: string, maxLength: number): string => {
  return s.length > maxLength ? s.slice(0, maxLength) + '...' : s;
};

export const decodeJWT = <T extends object = { [k: string]: string | number }>(token: string): T | undefined => {
  try {
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
  } catch (err) {
    console.error(err);
    return undefined;
  }
};
