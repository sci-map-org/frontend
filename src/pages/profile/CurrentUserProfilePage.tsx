import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import { PageLayout } from '../../components/layout/PageLayout';
import { EditableTextarea } from '../../components/lib/inputs/EditableTextarea';
import { EditableTextInput } from '../../components/lib/inputs/EditableTextInput';
import { UserAvatar } from '../../components/users/UserAvatar';
import { UserRole } from '../../graphql/types';
import { CurrentUserDataFragment } from '../../graphql/users/users.fragments.generated';
import { useUpdateCurrentUserMutation } from '../../graphql/users/users.operations.generated';

const ReactCrop = dynamic(() => import('react-image-crop'), { ssr: false });

export const CurrentUserProfilePage: React.FC<{ currentUser: CurrentUserDataFragment }> = ({ currentUser }) => {
  const [updateCurrentUser] = useUpdateCurrentUserMutation();
  return (
    <PageLayout marginSize="xl">
      <Center mb={10}>
        <Heading fontWeight={400}>
          My Profile (
          <Text as="span" fontWeight={500} color="blue.600">
            @{currentUser.key}
          </Text>
          )
        </Heading>
      </Center>
      <Flex justifyContent="space-between">
        <Stack spacing={6}>
          <Stack>
            <Text fontSize="xl" fontWeight={600}>
              Display Name:
            </Text>
            <EditableTextInput
              fontSize="lg"
              fontWeight={400}
              value={currentUser.displayName}
              onChange={(newDisplayName) =>
                updateCurrentUser({ variables: { payload: { displayName: newDisplayName } } })
              }
              editMode
              color="gray.800"
            />
          </Stack>
          <Stack>
            <Text fontSize="xl" fontWeight={600}>
              Bio:
            </Text>
            <EditableTextarea
              fontWeight={300}
              minRows={2}
              fontSize="lg"
              defaultValue={currentUser.bio || undefined}
              placeholder="Write about yourself..."
              onSubmit={(bio: string) => updateCurrentUser({ variables: { payload: { bio } } })}
            />
          </Stack>
          <Stack>
            <Text fontSize="xl" fontWeight={600}>
              Email:
            </Text>

            <Text fontSize="lg" fontWeight={400} color="gray.800">
              {currentUser.email}
            </Text>
          </Stack>
          {currentUser.role !== UserRole.User && (
            <Box>
              <Badge fontSize="md" colorScheme="teal">
                {currentUser.role}
              </Badge>
            </Box>
          )}
        </Stack>

        <UserAvatarEditor currentUser={currentUser} />
      </Flex>
    </PageLayout>
  );
};

const UserAvatarEditor: React.FC<{ currentUser: CurrentUserDataFragment }> = ({ currentUser }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string>();
  const [crop, setCrop] = useState<ReactCrop.Crop>({ unit: '%', aspect: 1, y: 0, width: 80 });

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Stack spacing={5}>
        <Center>
          <UserAvatar disablePopover user={currentUser} size="2xl" />
        </Center>
        <Stack>
          <Button size="sm" colorScheme="blue" onClick={() => inputRef!.current!.click()}>
            Upload an Image
          </Button>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const reader = new FileReader();
                reader.addEventListener('load', () => setUploadedImageSrc(reader.result as string));
                reader.readAsDataURL(e.target.files[0]);
                onOpen();
              }
            }}
            name="file"
            ref={inputRef}
            style={{ display: 'none' }}
          ></input>

          <Button size="sm" variant="outline" colorScheme="gray">
            Remove photo
          </Button>
        </Stack>
      </Stack>

      {uploadedImageSrc && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Upload Photo</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ReactCrop
                src={uploadedImageSrc}
                crop={crop}
                ruleOfThirds
                onImageLoaded={(...p) => console.log(p)}
                onComplete={(...p) => console.log(p)}
                onChange={(newCrop) => setCrop(newCrop)}
                circularCrop
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="gray" variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  console.log('upload');
                }}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
