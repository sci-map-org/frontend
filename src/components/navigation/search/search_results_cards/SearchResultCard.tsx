import gql from 'graphql-tag';
import {
  ConceptPageInfo,
  DomainPageInfo,
  LearningGoalPageInfo,
  LearningPathPageInfo,
  ResourcePageInfo,
} from '../../../../pages/RoutesPageInfos';
import { SearchResultCardDataFragment } from './SearchResultCard.generated';
import { SearchResultLearningGoalCard, SearchResultLearningGoalCardData } from './SearchResultLearningGoalCard';
import { SearchResultLearningPathCard, SearchResultLearningPathCardData } from './SearchResultLearningPathCard';
import { SearchResultResourceCard, SearchResultResourceCardData } from './SearchResultResourceCard';

export const SearchResultCardData = gql`
  fragment SearchResultCardData on SearchResult {
    entity {
      # ...SearchResultDomainCardData
      # ...SearchResultConceptCardData
      ...SearchResultLearningGoalCardData
      ...SearchResultLearningPathCardData
      ...SearchResultResourceCardData
    }
  }
  ${SearchResultLearningGoalCardData}
  ${SearchResultLearningPathCardData}
  ${SearchResultResourceCardData}
`;

export const SearchResultCard: React.FC<{ searchResult: SearchResultCardDataFragment; isHighlighted?: boolean }> = ({
  searchResult,
  isHighlighted,
}) => {
  switch (searchResult.entity.__typename) {
    // TODO: Topic case
    // case 'Domain':
    //   return (
    //     <SearchResultDomainCard
    //       entityPageInfo={DomainPageInfo(searchResult.entity)}
    //       domain={searchResult.entity}
    //       isHighlighted={isHighlighted}
    //     />
    //   );
    // case 'Concept':
    //   return searchResult.entity.domain ? (
    //     <SearchResultConceptCard
    //       entityPageInfo={ConceptPageInfo(searchResult.entity.domain, searchResult.entity)}
    //       concept={searchResult.entity}
    //       isHighlighted={isHighlighted}
    //     />
    //   ) : null;
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
