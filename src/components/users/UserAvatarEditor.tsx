import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import fetch from 'cross-fetch';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import { UserAvatar } from '../../components/users/UserAvatar';
import { CurrentUserDataFragment } from '../../graphql/users/users.fragments.generated';
import { useUpdateCurrentUserMutation } from '../../graphql/users/users.operations.generated';

const ReactCrop = dynamic(() => import('react-image-crop'), { ssr: false });

export const UserAvatarEditor: React.FC<{ currentUser: CurrentUserDataFragment }> = ({ currentUser }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string>();
  const [imageDimensions, setImageDimensions] = useState<{
    displayWidth: number;
    displayHeight: number;
    naturalWidth: number;
    naturalHeight: number;
  }>();
  const [crop, setCrop] = useState<ReactCrop.Crop>({ unit: '%', aspect: 1, y: 0, width: 80 });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateCurrentUser] = useUpdateCurrentUserMutation();
  const [isUploading, setIsUploading] = useState(false);

  const uploadNewProfilePicture = async (uploadedImageSrc: string) => {
    setIsUploading(true);
    var fd = new FormData();
    if (!imageDimensions || !crop.x || !crop.y || !crop.width || !crop.height)
      throw new Error('Unreachable code, missing some data');
    const xRatio = imageDimensions?.naturalWidth / imageDimensions?.displayWidth;
    const yRatio = imageDimensions?.naturalHeight / imageDimensions?.displayHeight;
    const scaledCrop: { x: number; y: number; width: number; height: number } = {
      x: Math.floor(crop.x * xRatio),
      y: Math.floor(crop.y * yRatio),
      width: Math.floor(crop.width * xRatio),
      height: Math.floor(crop.height * yRatio),
    };
    fd.append('file', uploadedImageSrc);
    fd.append('upload_preset', 'qrsc0mhb');
    fd.append('folder', currentUser._id);
    fd.append('custom_coordinates', `${scaledCrop.x},${scaledCrop.y},${scaledCrop.width},${scaledCrop.height}`);

    const res = await fetch('https://api.cloudinary.com/v1_1/sci-map/upload', {
      method: 'POST',
      body: fd,
    });
    const { url } = await res.json();
    await updateCurrentUser({ variables: { payload: { profilePictureUrl: url } } });
    setIsUploading(false);
  };
  return (
    <>
      <Stack spacing={5} alignItems="center">
        <UserAvatar disablePopover user={currentUser} size="2xl" />
        <Stack>
          <Button size="sm" colorScheme="blue" onClick={() => inputRef!.current!.click()} isLoading={isUploading}>
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

          <Button
            size="sm"
            variant="outline"
            colorScheme="gray"
            onClick={() => updateCurrentUser({ variables: { payload: { profilePictureUrl: null } } })}
          >
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
                onImageLoaded={({ naturalWidth, naturalHeight, width, height }) =>
                  setImageDimensions({ displayWidth: width, displayHeight: height, naturalWidth, naturalHeight })
                }
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
                isLoading={isUploading}
                onClick={async () => {
                  await uploadNewProfilePicture(uploadedImageSrc);
                  onClose();
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
