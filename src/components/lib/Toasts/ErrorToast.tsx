import { useToast, UseToastOptions } from '@chakra-ui/react';

export const useErrorToast = (options?: Omit<UseToastOptions, 'status'>) => {
  const toast = useToast({ duration: 3000, ...options, status: 'error', position: 'bottom' });
  return toast;
};
