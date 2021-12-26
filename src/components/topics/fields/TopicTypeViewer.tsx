import { Stack, Text } from '@chakra-ui/react';
import { upperFirst } from 'lodash';
import { TopicType } from '../../../graphql/types';

const sizesMapping = {
  sm: {
    px: '4px',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '1.25em',
    pt: '1px',
    pb: '2px',
    borderRadius: 2,
  },
  md: {
    px: '6px',
    fontSize: '17px',
    fontWeight: 500,
    lineHeight: '1.25em',
    pt: '1px',
    pb: '2px',
    borderRadius: 2,
  },
};

interface TopicTypeViewerProps {
  topicType: TopicType;
  size?: 'sm' | 'md';
  onClick?: () => void;
  shade?: 'pale' | 'solid';
}
export const TopicTypeViewer: React.FC<TopicTypeViewerProps> = ({
  topicType,
  size = 'md',
  onClick,
  shade = 'solid',
}) => {
  return (
    <Text
      color="white"
      bgColor={
        topicType.color
          ? `${topicType.color}.${shade === 'solid' ? 500 : 300}`
          : `gray.${shade === 'solid' ? 500 : 300}`
      }
      {...sizesMapping[size]}
      {...(onClick && { onClick: () => onClick() })}
      display="flex"
      alignItems="center"
      _hover={{
        ...(!!onClick && { cursor: 'pointer' }),
      }}
    >
      {topicType.name.split(' ').map(upperFirst).join(' ')}
    </Text>
  );
};

interface TopicTypesViewerProps {
  topicTypes: TopicType[];
  size?: 'sm' | 'md';
  onClick?: (topicType: TopicType) => void;
  shade?: 'pale' | 'solid';
  maxShown?: number;
}
export const TopicTypesViewer: React.FC<TopicTypesViewerProps> = ({
  topicTypes,
  size = 'md',
  onClick,
  shade = 'solid',
  maxShown,
}) => {
  if (!topicTypes.length) return null;
  return (
    <Stack direction="row">
      {topicTypes.slice(0, maxShown || topicTypes.length).map((topicType) => (
        <TopicTypeViewer
          topicType={topicType}
          size={size}
          {...(onClick && { onClick: () => onClick(topicType) })}
          shade={shade}
        />
      ))}
      {maxShown && maxShown < topicTypes.length && (
        <Text
          color="white"
          bgColor={`red.${shade === 'solid' ? 500 : 300}`}
          {...sizesMapping[size]}
          display="flex"
          alignItems="center"
          _hover={{
            ...(!!onClick && { cursor: 'pointer' }),
          }}
        >
          +{topicTypes.length - maxShown}
        </Text>
      )}
    </Stack>
  );
};
