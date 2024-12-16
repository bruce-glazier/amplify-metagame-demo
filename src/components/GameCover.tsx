import { Link } from 'react-router-dom';
import type { Schema } from '../../amplify/data/resource';
import React, { useEffect, useRef, useState } from 'react';
import { useScreenSize } from '../hooks/useScreenSize';
import { getLargeUri } from '../hooks/useGames';
import './GameCover.css';

type Props = {
  game: Schema['Game']['type'] | undefined;
  onLoadComplete?: () => void;
  index?: number;
};

export const GameCover = (props: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { game } = props;

  const isLoading = !game?.name || !game.summary;
  const detailsRef = useRef<HTMLDivElement>(null);
  const screenSize = useScreenSize();
  const [position, setPosition] = useState(
    detailsRef.current?.getBoundingClientRect()
  );

  // Setup listeners to track components current position and size in state
  useEffect(() => {
    const updatePosition = () => {
      if (detailsRef.current) {
        setPosition(detailsRef.current.getBoundingClientRect());
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, { passive: true });

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, []);

  // Calculate how far the details card needs to travel to be center in the viewport
  useEffect(() => {
    if (position) {
      // Distance to travel for middle of screen
      const toCenterX = Math.round(
        screenSize.width / 2 - position.x - position.width / 2
      );

      // Put bounds on how far the element can travel
      // We need to make sure it retains some overlap with its original position
      // so that you can mouse hover of to it
      let xOffset = 0;
      const destinationLeftEdge = position.x + toCenterX;
      const destinationRightEdge = position.right + toCenterX;
      const leftEdge = position.x;
      const rightEdge = position.right;
      const travelingRight = toCenterX > 0;
      const travelingLeft = toCenterX < 0;

      if (travelingRight && destinationLeftEdge > rightEdge) {
        // if moving right, make sure my new left edge is not beyond my original right position
        xOffset = position.width;
      } else if (travelingLeft && destinationRightEdge < leftEdge) {
        // if moving left, make sure my new right edge is not beyond my original left position
        xOffset = -position.width;
      } else {
        xOffset = toCenterX;
      }

      // For Y, we just use the center of the screen
      // 0 is top, down is positive, up is negative
      const toCenterY = Math.round(
        screenSize.height / 2 - position.y - position.height / 2
      );
      setOffset({ x: xOffset, y: toCenterY });
    }
  }, [screenSize, position]);

  return (
    <div
      className="cover-container"
      ref={detailsRef}
      data-testId={`game-cover-container-${props?.index}`}
    >
      <div
        className={isFocused ? 'cover-details focused' : 'cover-details'}
        aria-label={`${game?.name}`}
        data-testId={`game-cover-details-${props?.index}`}
        style={
          {
            '--x-distance-to-center': `${offset.x}px`,
            '--y-distance-to-center': `${offset.y}px`,
          } as React.CSSProperties
        }
        onClick={() => {
          focus();
          setIsFocused(true);
        }}
        onBlur={() => {
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
        <div className="description-container">
          <h2 className="game-name">{game?.name}</h2>
          <h5 className="genres">
            {game?.genres?.map((g) => g?.name).join(' ')}
          </h5>
          <h3 className="summary-heading">About this game</h3>
          <textarea
            rows={6}
            className="summary"
            spellCheck={false}
            readOnly
            disabled
            value={game?.summary ?? ''}
          />
          <Link className="learn-more" to={`/details/${game?.slug}`}>
            Learn more
          </Link>
        </div>
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
