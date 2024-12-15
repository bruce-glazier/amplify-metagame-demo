import { PropsWithChildren } from 'react';

export function CarouselContent(props: PropsWithChildren<{}>) {
  const { children } = props;

  return (
    <div className="carousel-content">
      {children}
    </div>
  );
}
