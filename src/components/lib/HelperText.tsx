import { Alert, AlertIcon, AlertProps } from '@chakra-ui/alert';

export const HelperText: React.FC<AlertProps> = ({ children, ...props }) => {
  return (
    <Alert status="info" borderRadius={4} {...props}>
      <AlertIcon />
      {children}
    </Alert>
  );
};
