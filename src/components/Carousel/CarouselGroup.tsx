import { CarouselContent } from './CarouselContent';

type Props = {
  listItems: JSX.Element[] | undefined;
  classes?: string[];
};

  // #1; What is the window width? That determines how many tiles can fit on one screen width
    // Get tile break points for current width and do calculation
  // #2; Create pager with number of pages = total / per page
  // #3; All items in a single row, left to right, wrap around occurs only on final page and first page
  // #4; A click on the page right button triggers a "page action"
    // A page action will translateX() by the breakpoint EL width / 2
    // 

// TODO: BUG #1: Continous scrolling on touch device can cause rendering issues
// TODO: Currently width is hard-coded for the GameCard breakpoints but I intended to make this usable for anything
export const CarouselGroup = (props: Props) => {
  const { listItems, classes } = props;

  // groupSize = dynamic?
  return (
    <div
      className={classes?.join(' ')}
    >
      {listItems?.map((item, index) =>
        (
          <CarouselContent
            key={index}
          >
            {item}
          </CarouselContent>
        )
      )}
    </div>
  );
};
