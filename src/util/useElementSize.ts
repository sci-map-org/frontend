import { useEffect, useState, useRef, MutableRefObject } from 'react';

export function useElementSize(ref: MutableRefObject<any>) {
  const [size, setSize] = useState(
    ref.current
      ? {
          width: ref.current.clientWidth,
          height: ref.current.clientHeight,
        }
      : null
  );

  useEffect(() => {
    function handleResize() {
      setSize(
        ref.current
          ? {
              width: ref.current.clientWidth,
              height: ref.current.clientHeight,
            }
          : null
      );
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [ref.current]);
  return size;
}
