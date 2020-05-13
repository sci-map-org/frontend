import {
  Box,
  Divider,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/core';
import { createContext, useContext, useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

const UnauthentificatedModalContext = createContext<{ onOpen: () => void; onClose: () => void; isOpen: boolean }>({
  onOpen: () => null,
  onClose: () => null,
  isOpen: false,
});

export const UnauthentificatedModalProvider: React.FC<{}> = ({ children }) => {
  const modalDisclosure = useDisclosure(false);
  const { isOpen, onOpen, onClose } = modalDisclosure;
  return (
    <>
      <UnauthentificatedModalContext.Provider value={modalDisclosure}>
        {children}
      </UnauthentificatedModalContext.Provider>
      <UnauthentificatedModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};

export const useUnauthentificatedModal = () => {
  return useContext(UnauthentificatedModalContext);
};

export const UnauthentificatedModal: React.FC<{ onOpen: () => void; onClose: () => void; isOpen: boolean }> = ({
  isOpen,
  onClose,
}) => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <Modal
      isOpen={isOpen}
      onClose={(e, reason) => {
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{showLogin ? 'Login' : 'Register'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {showLogin ? (
            <>
              <LoginForm onSuccessfulLogin={onClose} />
              <Divider my={4}></Divider>
              <Box pb={4} textAlign="center">
                <Text fontSize="l">
                  No account yet ? <Link onClick={() => setShowLogin(false)}>Register</Link>
                </Text>
              </Box>
            </>
          ) : (
            <>
              <RegisterForm onSuccess={onClose} />
              <Divider my={4}></Divider>
              <Box pb={4} textAlign="center">
                <Text fontSize="l">
                  Already have an account ? <Link onClick={() => setShowLogin(true)}>Login</Link>
                </Text>
              </Box>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
