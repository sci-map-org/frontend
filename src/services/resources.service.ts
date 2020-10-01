import { ResourceType } from '../graphql/types';

export const isResourceGroupType = (resourceType: ResourceType): boolean => {
  return [ResourceType.Course, ResourceType.Website, ResourceType.Other].indexOf(resourceType) > -1;
};

export const isResourceSeriesType = (resourceType: ResourceType): boolean => {
  return (
    [ResourceType.ArticleSeries, ResourceType.Course, ResourceType.Website, ResourceType.Other].indexOf(resourceType) >
    -1
  );
};
