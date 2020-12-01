import { SettingsIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Flex,
  FlexProps,
  IconButton,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react';
import { flatten } from 'lodash';
import React, { forwardRef, ReactNode, useState } from 'react';
import { ConceptDataFragment } from '../../graphql/concepts/concepts.fragments.generated';
import { LearningMaterialWithCoveredConceptsByDomainDataFragment } from '../../graphql/learning_materials/learning_materials.fragments.generated';
import { useCurrentUser } from '../../graphql/users/users.hooks';
import { useUnauthentificatedModal } from '../auth/UnauthentificatedModal';
import { InternalLink } from '../navigation/InternalLink';
import { LearningMaterialDomainCoveredConceptsSelector } from '../resources/CoveredConceptsSelector';
import { LearningMaterialCoveredConceptsByDomainViewer } from '../resources/LearningMaterialCoveredConceptsByDomainViewer';
import { LearningMaterialDomainAndCoveredConceptsSelector } from '../resources/LearningMaterialDomainAndCoveredConceptsSelector';
import { BoxBlockDefaultClickPropagation } from '../resources/ResourcePreviewCard';

interface LearningMaterialCardContainerProps {
  renderCenterLeft: ReactNode;
  leftBlockWidth: FlexProps['w'];
  renderRight: ReactNode;
  renderBottom: ReactNode;
  inCompactList?: boolean;
  firstItemInCompactList?: boolean;
  borderColor?: FlexProps['borderColor'];
  hoverBorderColor?: FlexProps['borderColor'];
  onClick: () => void;
  children: ReactNode;
}

export const LearningMaterialCardContainer = forwardRef<HTMLDivElement, LearningMaterialCardContainerProps>(
  (
    {
      renderCenterLeft,
      leftBlockWidth,
      renderRight,
      renderBottom,
      children,
      inCompactList,
      firstItemInCompactList,
      borderColor = 'gray.200',
      hoverBorderColor = 'gray.400',
      onClick,
    },
    ref
  ) => {
    return (
      <Flex
        ref={ref}
        direction="row"
        alignItems="stretch"
        borderWidth={1}
        borderTopColor={inCompactList && !firstItemInCompactList ? 'transparent' : borderColor}
        marginTop={inCompactList && !firstItemInCompactList ? '-1px' : '0px'}
        borderLeftColor={borderColor}
        borderRightColor={borderColor}
        borderBottomColor={borderColor}
        _hover={{
          cursor: 'pointer',
          borderColor: hoverBorderColor,
        }}
        onClick={() => onClick()}
      >
        <Center w={leftBlockWidth} flexShrink={0}>
          <BoxBlockDefaultClickPropagation display="flex">{renderCenterLeft}</BoxBlockDefaultClickPropagation>
        </Center>
        <Flex direction="column" alignItems="stretch" flexGrow={1}>
          {children}
          {renderBottom}
        </Flex>
        {renderRight}
      </Flex>
    );
  }
);

const shortenCoveredConceptsList = (coveredConcepts: Pick<ConceptDataFragment, 'name'>[], maxLength: number = 40) => {
  const { s, count } = [...coveredConcepts]
    .sort((c1, c2) => c1.name.length - c2.name.length)
    .reduce(
      (o, concept, index) => {
        if (o.s.length > maxLength) {
          o.count = o.count + 1;
        } else {
          o.s = index > 0 ? o.s + ', ' + concept.name : concept.name;
        }
        return o;
      },
      { s: '', count: 0 }
    );
  return count ? `${s}, and more...` : s;
};

export const LearningMaterialCardCoveredTopics: React.FC<{
  learningMaterial: LearningMaterialWithCoveredConceptsByDomainDataFragment;
  domainKey?: string;
  editable?: boolean;
}> = ({ learningMaterial, domainKey, editable }) => {
  const [coveredConceptsEditorMode, setCoveredConceptsEditorMode] = useState(false);
  const { currentUser } = useCurrentUser();
  const unauthentificatedModalDisclosure = useUnauthentificatedModal();
  const domainCoveredConcepts = learningMaterial.coveredConceptsByDomain?.filter(
    (d) => !domainKey || d.domain.key === domainKey
  );

  if (!domainCoveredConcepts) return null;
  const coveredConcepts = flatten(domainCoveredConcepts.map(({ coveredConcepts }) => coveredConcepts));
  if (!coveredConcepts.length && !editable) return null;

  return (
    <Popover placement="bottom-end" isLazy>
      <PopoverTrigger>
        <Stack direction="row" spacing="1px" _hover={{ color: 'gray.800' }} fontSize="15px">
          <Text color="gray.800" fontWeight={300} as="span">
            About:{' '}
          </Text>
          <Link color="gray.800" fontWeight={300} onClick={() => setCoveredConceptsEditorMode(false)}>
            {shortenCoveredConceptsList(flatten(coveredConcepts), 32)}
          </Link>
          {editable && (
            <IconButton
              onClick={(e) => {
                if (!currentUser) {
                  unauthentificatedModalDisclosure.onOpen();
                  e.preventDefault();
                  return;
                }
                setCoveredConceptsEditorMode(true);
              }}
              aria-label="Add or remove covered concepts"
              variant="ghost"
              size="xs"
              color="gray.600"
              icon={<SettingsIcon />}
            />
          )}
        </Stack>
      </PopoverTrigger>
      <PopoverContent zIndex={4} backgroundColor="white">
        <PopoverArrow />
        <PopoverHeader fontWeight={500}>Covered Concepts</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody pt={1}>
          {coveredConceptsEditorMode ? (
            domainCoveredConcepts.length === 1 ? (
              <LearningMaterialDomainCoveredConceptsSelector
                domainKey={domainCoveredConcepts[0].domain.key}
                learningMaterialId={learningMaterial._id}
                coveredConcepts={domainCoveredConcepts[0].coveredConcepts}
              />
            ) : (
              <LearningMaterialDomainAndCoveredConceptsSelector learningMaterial={learningMaterial} />
            )
          ) : domainCoveredConcepts.length === 1 ? (
            <Stack direction="column">
              {domainCoveredConcepts[0].coveredConcepts.map((concept) => (
                <Box key={concept._id}>
                  <InternalLink
                    routePath="/domains/[key]/concepts/[conceptKey]"
                    asHref={`/domains/${domainKey}/concepts/${concept.key}`}
                  >
                    {concept.name}
                  </InternalLink>
                </Box>
              ))}
            </Stack>
          ) : (
            <LearningMaterialCoveredConceptsByDomainViewer learningMaterial={learningMaterial} />
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
