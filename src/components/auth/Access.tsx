import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';

export interface AccessProps {
  condition: boolean;
  renderAccessDenied?: () => ReactNode;
  redirectTo?: string;
  goBack?: boolean;
}

export const Access: React.FC<AccessProps> = ({ condition, renderAccessDenied, redirectTo, goBack, children }) => {
  const router = useRouter();

  useEffect(() => {
    if (!condition) {
      if (redirectTo) {
        router.push(redirectTo);
      } else if (goBack) {
        router.back();
      }
    }
  }, [condition]);
  if (!condition) {
    if (renderAccessDenied) {
      return <>{renderAccessDenied()}</>;
    } else {
      return null;
    }
  }
  return <>{children}</>;
};
