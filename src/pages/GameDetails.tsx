import { useParams } from 'react-router-dom';
import { getLargeUri, useGames } from '../hooks/useGames';
import './GameDetails.css';
import { Carousel } from '../components/Carousel/Carousel';
import { useCallback } from 'react';
import compact from 'lodash/compact';

function GameDetails() {
  const { slugId } = useParams();
  const { data } = useGames({ slug: slugId });
  const backgroundImage = data?.[0]?.artworks?.[1]?.url;


  const largeUrl = backgroundImage ? getLargeUri(backgroundImage) : '';
  const listItems = useCallback(() => {
    return compact(data?.[0]?.videos?.map((v) => <iframe
      key={v?.video_id}
      src={`https://www.youtube.com/embed/${v?.video_id}`}
      width={440}
      height={220}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={`Video ${v?.video_id}`}
   />))
  }, [data])

  return <div className="details-container" style={{ '--game-details-image': `url(${largeUrl})`} as React.CSSProperties}>
    {<Carousel listItems={listItems()} />}
  </div>;
}

export default GameDetails;
