import { Flex, Stack, Text } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import gql from 'graphql-tag';
import { DomainLinkData } from '../../../../graphql/domains/domains.fragments';
import { LearningMaterialCountIcon } from '../../../learning_materials/LearningMaterialCountIcon';
import { DomainIcon } from '../../../lib/icons/DomainIcon';
import { ResourceSeriesIcon } from '../../../lib/icons/ResourceSeriesIcon';
import { SubTopicsCountIcon } from '../../../topics/SubTopicsCountIcon';
import { SearchResultCardContainer, SearchResultCardContainerProps } from './SearchResultCardContainer';
import { SearchResultDomainCardDataFragment } from './SearchResultDomainCard.generated';

export const SearchResultDomainCardData = gql`
  fragment SearchResultDomainCardData on Domain {
    ...DomainLinkData
    conceptTotalCount
    learningMaterialsTotalCount
  }
  ${DomainLinkData}
`;

export const SearchResultDomainCard: React.FC<
  { domain: SearchResultDomainCardDataFragment } & Omit<SearchResultCardContainerProps, 'borderLeftColor'>
> = ({ domain, ...props }) => {
  return (
    <SearchResultCardContainer
      renderIcon={(props) => <DomainIcon {...props} />}
      {...props}
      borderLeftColor="gray.500"
      bgColor={props.isHighlighted ? 'gray.200' : 'gray.100'}
    >
      <Flex direction="row" justifyContent="space-between" w="100%">
        <Text fontWeight={600} color="gray.600" fontSize="md" noOfLines={1}>
          {domain.name}
        </Text>
        <Stack direction="row">
          {!!domain.conceptTotalCount && (
            <SubTopicsCountIcon
              totalCount={domain.conceptTotalCount}
              tooltipLabel={`${domain.conceptTotalCount} Concepts in ${domain.name}`}
            />
          )}
          {!!domain.learningMaterialsTotalCount && (
            <LearningMaterialCountIcon
              totalCount={domain.learningMaterialsTotalCount}
              tooltipLabel={`${domain.learningMaterialsTotalCount} Learning Materials in ${domain.name}`}
            />
          )}
        </Stack>
      </Flex>
    </SearchResultCardContainer>
  );
};
