import { Flex } from '@chakra-ui/react';
import { PropsWithChildren, ReactElement } from 'react';
import { Resource } from '../../graphql/types';

type BaseResource = Pick<Resource, 'name' | 'url'>;

type ResourceListProps<T extends BaseResource> = {
  resources: T[];
  renderItem: (resource: T, index: number) => ReactElement;
};

export const ResourceList = <T extends BaseResource>({
  resources,
  renderItem,
}: PropsWithChildren<ResourceListProps<T>>) => {
  return (
    <Flex direction="column" alignItems="stretch" borderWidth="1px 1px 0px 1px" borderColor="gray.200" width="100%">
      {resources.map((resource, index) => (
        <Flex key={resource.url} direction="row" borderBottomWidth="1px" borderColor="gray.200">
          {renderItem(resource, index)}
        </Flex>
      ))}
    </Flex>
  );
};

type ResourceListBasicLayoutProps<T extends BaseResource> = {
  resources: T[];
  renderTop: (resource: T, index: number) => ReactElement;
  renderBottom?: (resource: T, index: number) => ReactElement;
  renderRight?: (resource: T, index: number) => ReactElement;
};
export const ResourceListBasicLayout = <T extends BaseResource>({
  resources,
  renderTop,
  renderBottom,
  renderRight,
}: PropsWithChildren<ResourceListBasicLayoutProps<T>>) => {
  return (
    <ResourceList
      resources={resources}
      renderItem={(resource, index) => (
        <Flex direction="row" w="100%" alignItems="stretch" justifyContent="space-between" pt={2} pb={2} px={2}>
          <Flex direction="column">
            {renderTop(resource, index)}
            {renderBottom && renderBottom(resource, index)}
          </Flex>
          {renderRight && renderRight(resource, index)}
        </Flex>
      )}
    />
  );
};
