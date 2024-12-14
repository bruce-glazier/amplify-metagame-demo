import { Link } from 'react-router-dom';
import type { Schema } from '../../amplify/data/resource';

type Props = {
  game: Schema['Game']['type'] | undefined;
  onLoadComplete?: () => void;
};

export const GameCover = (props: Props) => {
  const { game } = props;
  const isLoading = !game?.name || !game.summary;

  return (
    <Link className="cover" aria-label="Game Cover Art Container" to="/details">
      {!isLoading && (
        game?.cover?.url && (
          <img draggable={false} src={getLargeUri(game.cover.url)} onLoad={props.onLoadComplete} />
        ))}
        {isLoading && <p style={{ color: 'white', fontSize: '22px'}}>Loading</p>}
    </Link>
  );
};

const getLargeUri = (imageUri: string) =>
  imageUri.replace(`t_thumb`, 't_1080p');
