// Exist mostly because having pageinfos in Pages creates circular dependencies

import { domainLinkStyleProps } from '../components/domains/DomainLink';
import { ConceptDataFragment } from '../graphql/concepts/concepts.fragments.generated';
import { DomainDataFragment, DomainLinkDataFragment } from '../graphql/domains/domains.fragments.generated';
import { LearningGoalLinkDataFragment } from '../graphql/learning_goals/learning_goals.fragments.generated';
import { LearningPathDataFragment } from '../graphql/learning_paths/learning_paths.fragments.generated';
import { ResourceDataFragment } from '../graphql/resources/resources.fragments.generated';
import { PageInfo } from './PageInfo';

// ====Domains====
export const DomainsListPagePath = '/domains';

export const DomainsListPageInfo: PageInfo = {
  name: 'Topics',
  path: DomainsListPagePath,
  routePath: DomainsListPagePath,
};

export const DomainPagePath = (domainKey: string) => `/domains/${domainKey}`;

export const DomainPageInfo = (domain: DomainLinkDataFragment): PageInfo => ({
  name: domain.name,
  path: DomainPagePath(domain.key),
  routePath: DomainPagePath('[key]'),
  breadcrumbLinkProps: domainLinkStyleProps,
});

export const EditDomainPagePath = (domainKey: string) => `/domains/${domainKey}/edit`;
export const EditDomainPageInfo = (domain: DomainDataFragment): PageInfo => ({
  name: 'Edit',
  path: EditDomainPagePath(domain.key),
  routePath: EditDomainPagePath('[key]'),
});

export const ManageDomainPagePath = (domainKey: string) => `/domains/${domainKey}/manage`;
export const ManageDomainPageInfo = (domain: DomainDataFragment): PageInfo => ({
  name: 'Manage',
  path: ManageDomainPagePath(domain.key),
  routePath: ManageDomainPagePath('[key]'),
});

// ====Concepts====
export const ConceptListPagePath = (domainKey: string) => `/domains/${domainKey}/concepts`;
export const ConceptListPageInfo = (domain: DomainDataFragment): PageInfo => ({
  name: 'Concepts',
  path: ConceptListPagePath(domain.key),
  routePath: ConceptListPagePath('[key]'),
});

export const ConceptPagePath = (domainKey: string, conceptKey: string) =>
  `/domains/${domainKey}/concepts/${conceptKey}`;
export const ConceptPageInfo = (domain: DomainDataFragment, concept: ConceptDataFragment): PageInfo => ({
  name: `${domain.name} - ${concept.name}`,
  path: ConceptPagePath(domain.key, concept.key),
  routePath: ConceptPagePath('[key]', '[conceptKey]'),
});

export const EditConceptPagePath = (domainKey: string, conceptKey: string) =>
  `/domains/${domainKey}/concepts/${conceptKey}/edit`;
export const EditConceptPageInfo = (
  domain: Pick<DomainDataFragment, 'name' | 'key'>,
  concept: Pick<ConceptDataFragment, 'name' | 'key'>
): PageInfo => ({
  name: `Edit: ${domain.name} - ${concept.name}`,
  path: EditConceptPagePath(domain.key, concept.key),
  routePath: EditConceptPagePath('[key]', '[conceptKey]'),
});

//====Resources====
export const ResourcePagePath = (resourceId: string) => `/resources/${resourceId}`;
export const ResourcePageInfo = (resource: Pick<ResourceDataFragment, '_id' | 'name'>): PageInfo => ({
  name: `${resource.name}`,
  path: ResourcePagePath(resource._id),
  routePath: ResourcePagePath('[_id]'),
});

export const EditResourcePagePath = (resourceId: string) => `/resources/${resourceId}/edit`;
export const EditResourcePageInfo = (resource: ResourceDataFragment): PageInfo => ({
  name: `Edit - ${resource.name}`,
  path: EditResourcePagePath(resource._id),
  routePath: EditResourcePagePath('[_id]'),
});

export const DomainResourceListPagePath = (domainKey: string) => `/domains/${domainKey}/resources`;
export const DomainResourceListPageInfo = (domain: DomainDataFragment): PageInfo => ({
  name: 'Resources',
  path: DomainResourceListPagePath(domain.key),
  routePath: DomainResourceListPagePath('[key]'),
});

//====Learning Goals====
export const LearningGoalPagePath = (learningGoalKey: string) => '/goals/' + learningGoalKey;
export const LearningGoalPageInfo = (learningGoal: LearningGoalLinkDataFragment): PageInfo => {
  return learningGoal.domain
    ? DomainLearningGoalPageInfo(learningGoal.domain.domain, learningGoal)
    : {
        name: learningGoal.name,
        path: LearningGoalPagePath(learningGoal.key),
        routePath: LearningGoalPagePath('[learningGoalKey]'),
      };
};

export const DomainLearningGoalPagePath = (domainKey: string, learningGoalKey: string) =>
  `/domains/${domainKey}/goals/${learningGoalKey}`;
export const DomainLearningGoalPageInfo = (
  domain: DomainLinkDataFragment,
  learningGoal: LearningGoalLinkDataFragment
): PageInfo => ({
  name: `${domain.name} - ${learningGoal.name}`,
  path: DomainLearningGoalPagePath(domain.key, learningGoal.key),
  routePath: DomainLearningGoalPagePath('[key]', '[learningGoalKey]'),
});

//====Learning Paths====
export const LearningPathPagePath = (learningPathKey: string = '[learningPathKey]') =>
  `/learning_paths/${learningPathKey}`;
export const LearningPathPageInfo = (learningPath: Pick<LearningPathDataFragment, 'key' | 'name'>): PageInfo => ({
  name: learningPath.name,
  path: LearningPathPagePath(learningPath.key),
  routePath: LearningPathPagePath(),
});
