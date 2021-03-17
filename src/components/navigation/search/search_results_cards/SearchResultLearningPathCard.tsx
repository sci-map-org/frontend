import { Text } from '@chakra-ui/layout';
import gql from 'graphql-tag';
import { LearningPathLinkData } from '../../../../graphql/learning_paths/learning_paths.fragments';
import { LearningPathIcon } from '../../../lib/icons/LearningPathIcon';
import { SearchResultCardContainer, SearchResultCardContainerProps } from './SearchResultCardContainer';
import { SearchResultLearningPathCardDataFragment } from './SearchResultLearningPathCard.generated';

export const SearchResultLearningPathCardData = gql`
  fragment SearchResultLearningPathCardData on LearningPath {
    ...LearningPathLinkData
  }
  ${LearningPathLinkData}
`;

export const SearchResultLearningPathCard: React.FC<
  { learningPath: SearchResultLearningPathCardDataFragment } & SearchResultCardContainerProps
> = ({ learningPath, ...props }) => {
  return (
    <SearchResultCardContainer
      renderIcon={(props) => <LearningPathIcon {...props} />}
      {...props}
      borderLeftColor="teal.300"
    >
      <Text fontWeight={500}>{learningPath.name}</Text>
    </SearchResultCardContainer>
  );
};
