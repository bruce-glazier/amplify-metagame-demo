import React from 'react';

type Props = {
  listItems: JSX.Element[] | undefined;
  classes?: string[];
  'data-testid'?: string;
};

export const CarouselGroup = (props: Props) => {
  const { listItems, classes } = props;

  return (
    <div
    tabIndex={-1}
      className={classes?.join(' ')}
      data-testid={props['data-testid'] ?? 'carousel-group'}
    >
      {listItems}
    </div>
  );
};
