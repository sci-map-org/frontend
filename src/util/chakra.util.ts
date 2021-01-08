export type StandardChakraSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const chakraStandardSizes: StandardChakraSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export const getChakraRelativeSize = (originalSize: StandardChakraSize, offset: number): StandardChakraSize => {
  const originalSizeIndex = chakraStandardSizes.indexOf(originalSize);
  if (originalSizeIndex === -1) throw new Error('invalid size (unreachable code');
  return chakraStandardSizes[originalSizeIndex + offset];
};
