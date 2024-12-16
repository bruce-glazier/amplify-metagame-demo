import React from "react";

type Props = {
  listItems: JSX.Element[] | undefined;
  classes?: string[];
  'data-testId'?: string;
};

export const CarouselGroup = (props: Props) => {
  const { listItems, classes } = props;

  return <div className={classes?.join(' ')} data-testId={props['data-testId'] ?? 'carousel-group'}>{listItems}</div>;
};
