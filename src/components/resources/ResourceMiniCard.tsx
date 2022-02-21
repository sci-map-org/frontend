import gql from 'graphql-tag';
import { ResourcePageInfo } from '../../pages/RoutesPageInfos';
import { LearningMaterialMiniCardContainer } from '../learning_materials/LearningMaterialMiniCardContainer';
import { ResourceMiniCardDataFragment } from './ResourceMiniCard.generated';

export const ResourceMiniCardData = gql`
  fragment ResourceMiniCardData on Resource {
    _id
    key
    name
    types
    url
    recommendationsCount
    recommended {
      recommendedAt
    }
  }
`;

interface ResourceMiniCardProps {
  resource: ResourceMiniCardDataFragment;
  inCompactList?: boolean;
  firstItemInCompactList?: boolean;
}

export const ResourceMiniCard: React.FC<ResourceMiniCardProps> = ({ resource }) => {
  return (
    <LearningMaterialMiniCardContainer
      learningMaterial={resource}
      learningMaterialTypes={resource.types}
      pageInfo={ResourcePageInfo(resource)}
    />
  );
};
