import React from 'react';
import { useParams } from 'react-router-dom';
import { getLargeUri, useGames } from '../hooks/useGames';
import './GameDetails.css';
import { useCallback } from 'react';
import compact from 'lodash/compact';

function GameDetails() {
  const { slugId } = useParams();
  const { data } = useGames({ slug: slugId });
  const backgroundImage = data?.[0]?.artworks?.[0]?.url;
  const largeUrl = backgroundImage ? getLargeUri(backgroundImage) : '';

  const listItems = useCallback(() => {
    return compact(
      data?.[0]?.videos?.map((v) => (
        <iframe
          className={'game-video-iframe'}
          key={v?.video_id}
          src={`https://www.youtube.com/embed/${v?.video_id}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={`Video ${v?.video_id}`}
          aria-label={v?.name ?? 'Game Video'}
        />
      ))
    );
  }, [data]);

  return (
    <div
      className="details-page-container"
      style={
        { '--game-details-image': `url(${largeUrl})` } as React.CSSProperties
      }
      data-testId="details-page-container"
    >
      <div className="details-page-content">
        <div className="game-info">
          <div className="cover">
            <img src={`${getLargeUri(data?.[0]?.cover?.url ?? '')}`}></img>
          </div>
          <div className="name">{data?.[0]?.name}</div>
          <div className="release-date">
            {`Released: ${data?.[0]?.release_dates?.[0]?.human}`}
          </div>
          <div className="summary">{data?.[0]?.summary}</div>
        </div>
        <h1 className="media-heading">Videos</h1>
        <div className="videos">
          {listItems().map((IFRAME) => (
            <div className="video">{IFRAME}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
