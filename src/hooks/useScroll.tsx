import { RefObject, useCallback } from 'react';

export const useScroll = (
  behavior: ScrollBehavior = 'smooth'
): {
  scrollToY: (y: number) => void;
  scrollToElement: (ref: RefObject<HTMLElement>, offset?: number) => void;
} => {
  const scrollToY = useCallback((y: number) => window.scroll({ top: y, behavior }), [behavior]);

  const scrollToElement = useCallback(
    (element: React.RefObject<HTMLElement>, verticalOffset = 0) => {
      //@ts-ignore
      const elementOffsetTop = element.current?.getBoundingClientRect().top + window.scrollY || 0;

      window.scroll({ top: elementOffsetTop - verticalOffset, behavior });
    },
    [behavior]
  );

  return { scrollToY, scrollToElement };
};
