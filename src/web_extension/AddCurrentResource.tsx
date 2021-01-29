import { Alert, AlertIcon, Button, Center, Flex, Heading, Link, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { NewResource } from '../components/resources/NewResource';
import { env } from '../env';
import { ResourceDataFragment } from '../graphql/resources/resources.fragments.generated';
import { ResourcePagePath } from '../pages/RoutesPageInfos';
import { shortenString } from '../util/utils';

export const AddCurrentResource: React.FC<{}> = () => {
  const [currentUrl, setCurrentUrl] = useState<string>();
  useEffect(() => {
    /** @ts-ignore */
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let url = tabs[0].url;
      setCurrentUrl(url);
      // use `url` here inside the callback because it's asynchronous!
    });
  }, []);

  const [createdResource, setCreatedResource] = useState<ResourceDataFragment>();
  return createdResource ? (
    <Center py="100px">
      <Stack>
        <Alert status="success" size="lg" fontSize="md">
          <AlertIcon />
          <Link href={`${env.FRONTEND_URL}${ResourcePagePath(createdResource._id)}`} fontWeight={500} mr={2} isExternal>
            {shortenString(createdResource.name, 40)}
          </Link>
          successfully created !
        </Alert>
        <Center>
          <Button colorScheme="teal" onClick={() => setCreatedResource(undefined)}>
            Add new Resource
          </Button>
        </Center>
      </Stack>
    </Center>
  ) : (
    <Flex direction="column" alignItems="stretch">
      <Center>
        <Heading size="md" color="gray.700">
          Add a resource
        </Heading>
      </Center>
      {currentUrl && (
        <NewResource
          defaultResourceCreationData={{ url: currentUrl }}
          onResourceCreated={(resource) => setCreatedResource(resource)}
        />
      )}
    </Flex>
  );
};
