import { useContext, createContext, useState } from 'react';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Text,
  Link,
  Divider,
} from '@chakra-ui/core';
import { RegisterForm } from './RegisterForm';
import { LoginForm } from './LoginForm';

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
  onOpen,
  isOpen,
  onClose,
}) => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <Modal
      isOpen={isOpen}
      onClose={(e, reason) => {
        console.log(reason);
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
              <RegisterForm />
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
