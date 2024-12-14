import type { Schema } from '../../amplify/data/resource';

type Props = {
  game: Schema['Game']['type'] | undefined;
};

export const GameCover = (props: Props) => {
  const { game } = props;
  const isLoading = !game?.name || !game.summary;

  return (
    <div className="cover" aria-label="Game Cover Art Container">
      {!isLoading && (
        game?.cover?.url && (
          <img draggable={false} src={getLargeUri(game.cover.url)} loading='lazy' />
        ))}
        {isLoading && <p style={{ color: 'white', fontSize: '22px'}}>Loading</p>}
    </div>
  );
};

const getLargeUri = (imageUri: string) =>
  imageUri.replace(`t_thumb`, 't_1080p');
