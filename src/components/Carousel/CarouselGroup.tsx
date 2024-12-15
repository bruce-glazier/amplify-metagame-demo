import { CarouselContent } from './CarouselContent';

type Props = {
  listItems: JSX.Element[] | undefined;
  classes?: string[];
};

export const CarouselGroup = (props: Props) => {
  const { listItems, classes } = props;

  return (
    <div className={classes?.join(' ')}>
      {listItems?.map((item, index) => (
        <CarouselContent key={index}>{item}</CarouselContent>
      ))}
    </div>
  );
};
