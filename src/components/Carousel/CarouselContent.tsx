import { PropsWithChildren } from 'react';
import { useOnToggleToFalse } from '../../hooks/useOnChange';
import useOnScreen, { ExitDirection } from '../../hooks/useOnScreen';
import './CarouselContent.css';

type Props = {
  onItemVisibilityChange?: (exitDirection: ExitDirection) => void;
  order?: number;
};

export function CarouselContent(props: PropsWithChildren<Props>) {
  const { children, onItemVisibilityChange, order } = props;
  const { ref, isOnScreen, exitDirection } = useOnScreen(0);

  useOnToggleToFalse(isOnScreen, () => {
    onItemVisibilityChange?.(exitDirection);
  });

  return (
    <div className="carousel-content" style={{ order }} ref={ref}>
      {children}
    </div>
  );
}
