import { Flex, Heading, Link, Stack, StackProps, Wrap, WrapItem } from '@chakra-ui/react';
import gql from 'graphql-tag';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { TopicSubHeaderData } from '../../../components/topics/TopicSubHeader';
import { TopicLinkData } from '../../../graphql/topics/topics.fragments';
import { TopicLinkDataFragment } from '../../../graphql/topics/topics.fragments.generated';
import { SubTopicFilterDataFragment } from './SubTopicFilter.generated';

export const SubTopicFilterData = gql`
  fragment SubTopicFilterData on Topic {
    ...TopicLinkData
    description
    ...TopicSubHeaderData
  }
  ${TopicLinkData}
  ${TopicSubHeaderData}
`;

const wrapPxSpacing = 6;
const wrapItemPxHeight = 32;

interface SubTopicFilterProps extends Omit<StackProps, 'onChange'> {
  mainTopic: TopicLinkDataFragment;
  subTopics: TopicLinkDataFragment[];
  selectedSubTopic: SubTopicFilterDataFragment | null;
  onChange: (selectedTopicKey: string | null) => void;
  isLoading?: boolean;
}
export const SubTopicFilter: React.FC<SubTopicFilterProps> = ({
  mainTopic,
  subTopics,
  selectedSubTopic,
  onChange,
  isLoading, // TODO : ?
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);

  useEffect(() => {
    const checkIsExpandable = () => {
      if (containerRef.current) {
        const { clientHeight, scrollHeight } = containerRef.current;

        setIsExpandable(scrollHeight - wrapPxSpacing / 2 > clientHeight);
      }
    };

    const debouncedCheck = debounce(checkIsExpandable, 50);

    checkIsExpandable();
    window.addEventListener('resize', debouncedCheck);

    return () => {
      window.removeEventListener('resize', debouncedCheck);
    };
  }, [containerRef.current, mainTopic._id]);

  return (
    <Stack spacing={4} alignItems="center" {...props}>
      <Heading size="xl" fontWeight={400}>
        SubTopics
      </Heading>
      <Stack spacing="4px" alignItems="center">
        <Wrap
          ref={containerRef}
          justify="center"
          spacing={`${wrapPxSpacing}px`}
          {...(!isExpanded && {
            maxH: 2 * wrapItemPxHeight + wrapPxSpacing + 'px',
            overflow: 'hidden',
          })}
        >
          <WrapItem fontWeight={500} h={`${wrapItemPxHeight}px`}>
            <SubTopicFilterItem name="See All" isSelected={selectedSubTopic === null} onClick={() => onChange(null)} />
          </WrapItem>
          {subTopics.map((subTopic) => (
            <WrapItem key={subTopic._id} h={`${wrapItemPxHeight}px`}>
              <SubTopicFilterItem
                name={subTopic.name}
                isSelected={selectedSubTopic?._id === subTopic._id}
                onClick={() => onChange(subTopic.key)}
              />
            </WrapItem>
          ))}
        </Wrap>
        {isExpandable && (
          <Link fontSize="sm" color="blue.500" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Show less' : 'Show all'}
          </Link>
        )}
      </Stack>
    </Stack>
  );
};

const SubTopicFilterItem: React.FC<{
  name: string;
  isSelected?: boolean;
  onClick: () => void;
}> = ({ name, isSelected, onClick }) => {
  return (
    <Flex
      onClick={onClick}
      borderRadius={10}
      borderWidth={1}
      borderColor={isSelected ? 'teal.600' : 'black'}
      bgColor={isSelected ? 'teal.600' : 'white'}
      color={isSelected ? 'white' : 'black'}
      fontSize="17px"
      px="8px"
      py="2px"
      _hover={{
        cursor: isSelected ? 'auto' : 'pointer',
      }}
    >
      {name}
    </Flex>
  );
};
