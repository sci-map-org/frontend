import { Box, Stack, Text, TextProps } from '@chakra-ui/react';
import { upperFirst } from 'lodash';
import { TopicType } from '../../../graphql/types';
import { useHover } from '../../../hooks/useHover';

const sizesMapping = {
  sm: {
    px: '3px',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '1.25em',
    pt: '1px',
    pb: '2px',
    borderRadius: 2,
  },
  md: {
    px: '5px',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '1.25em',
    pt: '1px',
    pb: '1px',
    borderRadius: 2,
  },
};

const getTopicTypeViewerBgColor = (topicType: TopicType, shade: 'pale' | 'solid'): string => {
  return topicType.color
    ? `${topicType.color}.${shade === 'solid' ? 500 : 300}`
    : `gray.${shade === 'solid' ? 500 : 300}`;
};

interface TopicTypeViewerProps extends TextProps {
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
  ...props
}) => {
  return (
    <Text
      color="white"
      bgColor={getTopicTypeViewerBgColor(topicType, shade)}
      {...sizesMapping[size]}
      {...(onClick && { onClick: () => onClick() })}
      display="flex"
      alignItems="center"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
      overflow="hidden"
      _hover={{
        ...(!!onClick && { cursor: 'pointer' }),
      }}
      {...props}
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
  const [setRef, isHover] = useHover();

  return (
    <Stack direction="row" ref={setRef} spacing={{ md: '8px', sm: '4px' }[size]}>
      {topicTypes.slice(0, maxShown || topicTypes.length).map((topicType) => (
        <TopicTypeViewer
          key={topicType.name}
          topicType={topicType}
          size={size}
          {...(onClick && { onClick: () => onClick(topicType) })}
          shade={shade}
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        />
      ))}
      {!!maxShown && maxShown < topicTypes.length && (
        <Box position="relative">
          {isHover && (
            <Stack direction="row" position="absolute" bgColor="white" zIndex={2}>
              {topicTypes.slice(maxShown, topicTypes.length).map((topicType, idx) => (
                <TopicTypeViewer
                  key={topicType.name}
                  topicType={topicType}
                  size={size}
                  {...(onClick && { onClick: () => onClick(topicType) })}
                  shade={shade}
                />
              ))}
            </Stack>
          )}
          <Text
            color="white"
            bgGradient={
              topicTypes.length - maxShown > 1
                ? `linear(to-r, ${getTopicTypeViewerBgColor(
                    topicTypes[maxShown],
                    shade
                  )} 0%, ${getTopicTypeViewerBgColor(topicTypes[maxShown], shade)} 50%, ${getTopicTypeViewerBgColor(
                    topicTypes[maxShown + 1],
                    shade
                  )} 50%, ${getTopicTypeViewerBgColor(topicTypes[maxShown + 1], shade)} 100%)`
                : `linear(to-r, ${getTopicTypeViewerBgColor(topicTypes[maxShown], shade)}, ${getTopicTypeViewerBgColor(
                    topicTypes[maxShown],
                    shade
                  )})`
            }
            {...sizesMapping[size]}
            display="flex"
            alignItems="center"
            _hover={{
              ...(!!onClick && { cursor: 'pointer' }),
            }}
          >
            +{topicTypes.length - maxShown}
          </Text>
        </Box>
      )}
    </Stack>
  );
};
