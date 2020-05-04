import { ReactNode } from 'react';
import { useRouter } from 'next/router';

interface AccessProps {
  condition: boolean;
  renderAccessDenied?: () => ReactNode;
  redirectTo?: string;
  goBack?: boolean;
}

export const Access: React.FC<AccessProps> = ({ condition, renderAccessDenied, redirectTo, goBack, children }) => {
  const router = useRouter();
  if (!condition) {
    if (renderAccessDenied) {
      return <>{renderAccessDenied()}</>;
    } else if (redirectTo) {
      router.push(redirectTo);
    } else if (goBack) {
      router.back();
    } else {
      return null;
    }
  }
  return <>{children}</>;
};
