import { Link } from 'react-router-dom';
import type { Schema } from '../../amplify/data/resource';
import React, { useEffect, useRef, useState } from 'react';
import { useScreenSize } from '../hooks/useScreenSize';
import { getLargeUri } from '../hooks/useGames';
import './GameCover.css';

type Props = {
  game: Schema['Game']['type'] | undefined;
  onLoadComplete?: () => void;
};

export const GameCover = (props: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [centerXOffset, setCenterXOffset] = useState(0);
  const { game } = props;

  const isLoading = !game?.name || !game.summary;
  const detailsRef = useRef<HTMLDivElement>(null);
  const screenSize = useScreenSize();

  useEffect(() => {
    // We want a few conditions to be met
    // #1. Final position must have overlap with original elements position so we can mouse over without loosing focus
    // #2. Adjust Y position so that we are not out of screen
    if (detailsRef.current) {
      const rect = detailsRef.current.getBoundingClientRect();
      const toCenterX = Math.round(
        screenSize.width / 2 - rect.x - rect.width / 2
      );

      const destinationLeftEdge = rect.x + toCenterX;
      const destinationRightEdge = rect.right + toCenterX;

      const leftEdge = rect.x;

      if (game?.slug === 'diablo-immortal') {
        // 452, 1148, 1108.....
        // my destination > the right of the original el
        // therefore.... we need to use the right value....
        console.log({
          width: rect.width,
          x: rect.x,
          toCenterX,
          destination: destinationLeftEdge,
          left: rect.x,
        });
      }

      // Do not permit travel further than the edge of the original container
      if (toCenterX > 0 && destinationLeftEdge > rect.right) {
        if (game?.slug === 'diablo-immortal') {
          console.log('using right', rect.right);
        }
        setCenterXOffset(rect.width);
        // if my new right edge is beyond the initial left edge
      } else if (toCenterX < 0 && destinationRightEdge < leftEdge) {
        if (game?.slug === 'diablo-immortal') {
          console.log('using left', rect.left);
        }
        setCenterXOffset(-rect.width);
      } else {
        if (game?.slug === 'diablo-immortal') {
          console.log('using nominal');
        }
        setCenterXOffset(toCenterX);
      }
    }
  }, [screenSize]);

  // New plan
  // Desktop: On hover, show the details after 400

  // On Desktop, focus occurs after 400ms of hovering
  // On mobile, focus occurs from a tap
  // On keyboard, focus occurs on tab...
  //       to={`/details/${game?.slug}`}
  // Transition from one to the other....
  // Thats more a CSS thing...

  // Viewport Width / 2 = center
  // Element X = current position
  // Center - current position = translate amount to center

  return (
    <div className="cover-container" ref={detailsRef}>
      <div
        className={isFocused ? 'cover-details focused' : 'cover-details'}
        aria-label={`${game?.name}`}
        style={
          {
            '--x-distance-to-center': `${centerXOffset}px`,
          } as React.CSSProperties
        }
        onClick={() => {
          focus();
          console.log(game?.slug);
          setIsFocused(true);
        }}
        onBlur={() => {
          console.log('lostFocus');
          setIsFocused(false);
        }}
      >
        {!isLoading && game?.artworks?.[0]?.url && (
          <img
            draggable={false}
            src={getLargeUri(game?.artworks?.[0]?.url)}
            onLoad={props.onLoadComplete}
            aria-disabled
          />
        )}
        {isLoading && (
          <p style={{ color: 'white', fontSize: '22px' }}>Loading</p>
        )}
        <h2 className="game-name">{game?.name}</h2>
        <h5 className="genres">
          {game?.genres?.map((g) => g?.name).join(' ')}
        </h5>
        <h3 className="summary-heading">About this game</h3>
        <textarea
          className="summary"
          spellCheck={false}
          readOnly
          disabled
          value={game?.summary ?? ''}
        ></textarea>
        <Link className="learn-more" to={`/details/${game?.slug}`}>
          Learn more
        </Link>
      </div>
      <div className="cover" aria-label={`${game?.name}`}>
        {!isLoading && game?.cover?.url && (
          <img
            draggable={false}
            src={getLargeUri(game.cover.url)}
            onLoad={props.onLoadComplete}
            aria-disabled
          />
        )}
        {isLoading && (
          <p style={{ color: 'white', fontSize: '22px' }}>Loading</p>
        )}
      </div>
    </div>
  );
};
