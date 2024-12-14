import { useState } from 'react';
import { getGamesQuery, useGames } from '../hooks/useGames';
import { Carousel } from '../components/Carousel/Carousel';
import { GameCover } from '../components/GameCover';

function Overview() {
  const [topRated] = useState(getGamesQuery(80));
  const  [lowRated ] = useState(getGamesQuery(50, true));
  const { data: goodGames, isLoading } = useGames(topRated);
  const { data: lowRatedGames, isLoading: lowIsLoading } = useGames(lowRated);

  return (
    <main>
      <div style={{ marginLeft: 10 }}>
        <h3 className="category-heading">Highest rated of all time</h3>
        <Carousel isLoading={isLoading}
            listItems={goodGames?.map((g) => (
              <GameCover game={g} key={g.slug} />
            ))}
          />
          <h3 className="category-heading">Discover Games</h3>
        {lowRatedGames?.length && (
          <Carousel isLoading={lowIsLoading}
            listItems={lowRatedGames.map((g) => (
              <GameCover game={g} key={g.slug} />
            ))}
          />
        )}
      </div>
    </main>
  );
}

export default Overview;
