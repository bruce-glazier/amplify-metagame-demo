import { useCallback, useEffect, useState } from 'react';
import { CarouselGroup } from './CarouselGroup';
import chunk from 'lodash/chunk';
import throttle from 'lodash/throttle';

type Props = {
  listItems: JSX.Element[] | undefined;
};

const groupSize = 5;

  // #1; What is the window width? That determines how many tiles can fit on one screen width
    // Get tile break points for current width and do calculation
  // #2; Create pager with number of pages = total / per page
  // #3; All items in a single row, left to right, wrap around occurs only on final page and first page
  // #4; A click on the page right button triggers a "page action"
    // A page action will translateX() by the breakpoint EL width / 2
    // 

export const Carousel = (props: Props) => {
  const { listItems } = props;
  const [activeGroup, setActiveGroup] = useState(1);
  const [groupClass, setGroupClass] = useState(['carousel-group']);
  const [groups, setGroups] = useState<JSX.Element[][]>();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setGroups(groupItems(listItems, activeGroup));
  }, [activeGroup, listItems])

  const addClass = (className: string) => {
    setGroupClass((prevClasses) => {
      if (!prevClasses.includes(className)) {
        return [...prevClasses, className]
      }

      return prevClasses;
    })
  }

  const removeClass = (className: string) => {
    setGroupClass((prevClasses) => prevClasses.filter(prevClassName => prevClassName !== className));
  }

  const prevPage = useCallback(throttle(() => {

    if (isTransitioning) return;
    setIsTransitioning(true);

    // #1. Apply transition class
    addClass('slide-right');
    // #2. Schedule removal of class + increment of group
    setTimeout(() => {
      console.log('Slide finished', groups?.length)

      removeClass('slide-right');
      // Always start at position 1 as position 0 is reservered
      setActiveGroup((i) => {
        const groupLength = groups?.length ?? 2;
        return i > 1 ? i - 1 : groupLength - 1;
      });
      setIsTransitioning(false);
    }, 500) // Length of animation defined by CSS
  }, 700), [groups])

  const nextPage = useCallback(throttle(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    console.log('Next page!')
    // #1. Apply transition class
    addClass('slide-left');
    // #2. Schedule removal of class + increment of group
    setTimeout(() => {
      removeClass('slide-left');
      setActiveGroup((i) => {
        const groupLength = groups?.length ?? 2;
        return i < groupLength - 1 ? i + 1 : 1;
      });
    setIsTransitioning(false);
    }, 500) // Length of animation defined by CSS
  }, 700), [groups])

  return (
    <div
      className="carousel"
    >
    {groups?.map((group, index) => (
          <CarouselGroup
            listItems={group}
            key={index}
            classes={groupClass}
          />
      ))}
          <button className="pageLeft" onClick={() => { 
          prevPage();
        }}>{leftArrow}</button>
              <button className="pageRight" style={{ position: 'absolute', right: 0 }} onClick={() => { 
                nextPage();
        }}>{rightArrow}</button>
    </div>
  );
};


const groupItems = (listItems: JSX.Element[] | undefined, selectedGroup: number) => {
  const chunkedGroups = chunk(listItems, groupSize);
  const orderedGroups = [...chunkedGroups.slice(selectedGroup), ...chunkedGroups.slice(0, selectedGroup)];
  const weightedGroup = [orderedGroups[orderedGroups.length - 1], ...orderedGroups];

  return weightedGroup
}

const rightArrow = ">";
const leftArrow = "<";