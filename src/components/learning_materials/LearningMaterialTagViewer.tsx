import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';

export const LearningMaterialTagViewer: React.FC<{
  tagName: String;
  size?: 'sm' | 'md';
}> = ({ tagName, size = 'md' }) => {
  return <LearningMaterialTagBase size={size}>{tagName}</LearningMaterialTagBase>;
};

const sizesMapping = {
  sm: {
    fontSize: '12px',
    fontWeight: 500,
    borderRadius: '14px',
    pt: '1px',
    pb: '2px',
    px: '6px',
  },
  md: {
    fontSize: '14px',
    fontWeight: 500,
    borderRadius: '14px',
    pt: '4px',
    pb: '5px',
    px: '10px',
  },
};
export const LearningMaterialTagBase: React.FC<{
  isSelected?: boolean;
  size?: 'sm' | 'md';
  onClick?: () => void;
  onClose?: () => void;
}> = ({ isSelected, size = 'md', onClick, onClose, children }) => {
  return (
    <Tag
      {...sizesMapping[size]}
      letterSpacing="0.03em"
      {...(isSelected ? { color: 'white', bgColor: 'gray.600' } : { color: 'gray.600', bgColor: 'gray.100' })}
      {...(onClick && {
        onClick,
        _hover: {
          cursor: 'pointer',
        },
      })}
      size={size}
      key={size}
      borderRadius="full"
      variant="solid"
      colorScheme="green"
    >
      <TagLabel>{children}</TagLabel>
      {onClose && <TagCloseButton color={isSelected ? 'white' : 'gray.600'} my={-1} onClick={onClose} />}
    </Tag>
  );
};
