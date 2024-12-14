import type { Schema } from '../../amplify/data/resource';

type Props = {
  game: Schema['Game']['type'] | undefined;
  onLoadComplete?: () => void;
};

// TODO: Image, fix sizes
// Ensure consistent spacing
// Switch to flexbox from grid
// Collapse smaller for mobile
export const GameCard = (props: Props) => {
  const { game } = props;

  const isLoading = !game?.name || !game.summary;

  return (
    <div className="card" aria-label="Game Card">
      {!isLoading && (
        <>
          <div className="imageContainer">
            {game?.cover && (
              <img
                draggable={false}
                src={getLargeUri(game.cover.url)}
                loading="lazy"
              />
            )}
          </div>
          <div className="name" aria-label="Game Name">
            {game?.name}
          </div>
          <div className="detailsSection">
            <div className="genre">
              {game?.genres?.map((g) => g?.name).join(', ')}
            </div>
            <div className="summaryHeader">SUMMARY</div>
            <p className="summary">{game?.summary}</p>
          </div>
        </>
      )}
      {isLoading && <p style={{ color: 'white', fontSize: '22px' }}>Loading</p>}
    </div>
  );
};

const getLargeUri = (imageUri: string) =>
  imageUri.replace(`t_thumb`, 't_1080p');
