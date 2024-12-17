/// <reference types="vite-plugin-svgr/client" />
import React from 'react';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { CarouselGroup } from './CarouselGroup';
import chunk from 'lodash/chunk';
import throttle from 'lodash/throttle';
import './Carousel.css';
import { useScreenSize } from '../../hooks/useScreenSize';
import Chevron from './chevron-right.svg?react';

type Props = {
  listItems: JSX.Element[] | undefined;
};

export const Carousel = (props: Props) => {
  const { listItems } = props;
  const [activeGroup, setActiveGroup] = useState(1);
  const [groupClass, setGroupClass] = useState(['carousel-group']);
  const [groups, setGroups] = useState<JSX.Element[][]>(
    groupItems(listItems, activeGroup, 8)
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const screenSize = useScreenSize();
  const [isMobile, setIsMobile] = useState(false);

  // TODO: This only works within the carousel, I'd prefer to do this if the browser is tapped anywhere
  useEffect(() => {
    // Simple detection of touch devices
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useLayoutEffect(() => {
    let groupSize = 4; // between 600-1000
    if (screenSize.width > 1000) {
      groupSize = 8;
    } else if (screenSize.width < 600) {
      groupSize = 2; // keep divisible by number of games
    }

    setGroups(groupItems(listItems, activeGroup, groupSize));
  }, [activeGroup, listItems, screenSize.width]);

  const addClass = (className: string) => {
    setGroupClass((prevClasses) => {
      if (!prevClasses.includes(className)) {
        return [...prevClasses, className];
      }

      return prevClasses;
    });
  };

  const removeClass = (className: string) => {
    setGroupClass((prevClasses) =>
      prevClasses.filter((prevClassName) => prevClassName !== className)
    );
  };

  const prevPage = useCallback(
    throttle(() => {
      if (isTransitioning) return;
      setIsTransitioning(true);

      // #1. Apply transition class
      addClass('slide-right');
      // #2. Schedule removal of class + increment of group
      setTimeout(() => {
        removeClass('slide-right');
        // Always start at position 1 as position 0 is reservered
        setActiveGroup((i) => {
          const groupLength = groups?.length ?? 2;
          return i > 1 ? i - 1 : groupLength - 1;
        });
        setIsTransitioning(false);
      }, 500); // Length of animation defined by CSS
    }, 700),
    [groups]
  );

  const nextPage = useCallback(
    throttle(() => {
      if (isTransitioning) return;
      setIsTransitioning(true);

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
      }, 500); // Length of animation defined by CSS
    }, 700),
    [groups]
  );

  // TODO: The way TAB behaves is not ideal (but passable for screen readers)
  // Need to improve focus and scrolling
  return (
    <div className="carousel" data-testid="carousel-root">
      <div className="carousel-container">
        {groups?.map((group, index) => (
          <CarouselGroup
            listItems={group}
            key={index}
            classes={groupClass}
            data-testid={`carousel-group-${index}`}
          />
        ))}
        <button
          aria-disabled
          tabIndex={-1} // These buttons are only useful for visual users, tabbing handles scrolling on its own
          className={`pageLeft${isMobile ? ' .touch' : ''}`}
          data-testid="prev-button"
          onClick={() => {
            prevPage();
          }}
        >
          <Chevron
            width={'3rem'}
            height={'3rem'}
            style={{ transform: 'scaleX(-1)' }}
          />
        </button>
        <button
          aria-disabled
          tabIndex={-1}
          data-testid="next-button"
          className={`pageRight${isMobile ? ' .touch' : ''}`}
          onClick={() => {
            nextPage();
          }}
        >
          <Chevron width={'3rem'} height={'3rem'} />
        </button>
      </div>
    </div>
  );
};

/***
 * @param listItems The elements that need to be grouped
 * @param selectedGroup The group index that is currently displayed on screen
 * @param groupingSize The number of elements that should be in each group (listItems must be divisible by this value)
 * @returns An array of element arrays of a specified groupingSize. To simulate infinite scrolling behavior the final array of elements
 * is copied to the front of the array.
 */
const groupItems = (
  listItems: JSX.Element[] | undefined,
  selectedGroup: number,
  groupingSize: number
) => {
  // [0, 1, 2, 3] => [[0, 1], [2, 3]] assuming groupSize = 2
  const chunkedGroups = chunk(listItems, groupingSize);

  // SelectedGroup = 1 then [[0, 1], [2, 3]] => [[2, 3], [0, 1]]
  const orderedGroups = [
    ...chunkedGroups.slice(selectedGroup),
    ...chunkedGroups.slice(0, selectedGroup),
  ];

  // Becomes [[2, 3], [0, 1]] => [[0, 1], [2, 3], [0, 1]]
  const weightedGroup = [
    orderedGroups[orderedGroups.length - 1],
    ...orderedGroups,
  ];

  return weightedGroup;
};
