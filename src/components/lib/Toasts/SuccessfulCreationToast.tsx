import { useToast, UseToastOptions } from '@chakra-ui/react';

export const useSuccessfulCreationToast = (options?: Omit<UseToastOptions, 'status'>) => {
  const toast = useToast({ duration: 3000, ...options, status: 'success', position: 'bottom' });
  return toast;
};
