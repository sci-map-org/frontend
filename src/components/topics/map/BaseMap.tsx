import { forwardRef, ReactNode } from 'react';
import { theme } from '../../../theme/theme';

interface BaseMapProps {
  pxWidth: number;
  pxHeight: number;
  renderTopLeft?: ReactNode;
}
export const BaseMap = forwardRef<SVGSVGElement, BaseMapProps>(({ pxWidth, pxHeight, renderTopLeft }, ref) => {
  return (
    <svg
      ref={ref}
      width={`${pxWidth}px`}
      height={`${pxHeight}px`}
      style={{ backgroundColor: theme.colors.gray[600] }}
    />
  );
});
