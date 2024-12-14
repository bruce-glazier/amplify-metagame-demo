import { useParams } from 'react-router-dom';
import { useGames } from '../hooks/useGames';

function GameDetails() {
  const { slugId } = useParams();
  const { data } = useGames({ slug: slugId });

  return <div className="details-container">{data?.[0].name}</div>;
}

export default GameDetails;
