import gql from 'graphql-tag';
import {
  LearningGoalPageInfo,
  LearningPathPageInfo,
  ResourcePageInfo,
  TopicPageInfo,
} from '../../../../pages/RoutesPageInfos';
import { SearchResultCardDataFragment } from './SearchResultCard.generated';
import { SearchResultLearningGoalCard, SearchResultLearningGoalCardData } from './SearchResultLearningGoalCard';
import { SearchResultLearningPathCard, SearchResultLearningPathCardData } from './SearchResultLearningPathCard';
import { SearchResultResourceCard, SearchResultResourceCardData } from './SearchResultResourceCard';
import { SearchResultTopicCard, SearchResultTopicCardData } from './SearchResultTopicCard';

export const SearchResultCardData = gql`
  fragment SearchResultCardData on SearchResult {
    entity {
      ...SearchResultTopicCardData
      ...SearchResultLearningGoalCardData
      ...SearchResultLearningPathCardData
      ...SearchResultResourceCardData
    }
  }
  ${SearchResultTopicCardData}
  ${SearchResultLearningGoalCardData}
  ${SearchResultLearningPathCardData}
  ${SearchResultResourceCardData}
`;

export const SearchResultCard: React.FC<{ searchResult: SearchResultCardDataFragment; isHighlighted?: boolean }> = ({
  searchResult,
  isHighlighted,
}) => {
  switch (searchResult.entity.__typename) {
    case 'Topic':
      return (
        <SearchResultTopicCard
          entityPageInfo={TopicPageInfo(searchResult.entity)}
          topic={searchResult.entity}
          isHighlighted={isHighlighted}
        />
      );
    case 'LearningGoal':
      return (
        <SearchResultLearningGoalCard
          entityPageInfo={LearningGoalPageInfo(searchResult.entity)}
          learningGoal={searchResult.entity}
          isHighlighted={isHighlighted}
        />
      );
    case 'LearningPath':
      return (
        <SearchResultLearningPathCard
          entityPageInfo={LearningPathPageInfo(searchResult.entity)}
          learningPath={searchResult.entity}
          isHighlighted={isHighlighted}
        />
      );
    case 'Resource':
      return (
        <SearchResultResourceCard
          entityPageInfo={ResourcePageInfo(searchResult.entity)}
          resource={searchResult.entity}
          isHighlighted={isHighlighted}
        />
      );
    default:
      return null;
  }
};
