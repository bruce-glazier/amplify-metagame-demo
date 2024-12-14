import { useState } from 'react';
import { getGamesQuery, useGames } from '../hooks/useGames';
import { Carousel } from '../components/Carousel/Carousel';
import { GameCover } from '../components/GameCover';

function Overview() {
  const [goodGamesQuery] = useState(getGamesQuery(80));
  const  [badGamesQuery ] = useState(getGamesQuery(50, true));
  const { data: goodGames } = useGames(goodGamesQuery);
  const { data: badGames } = useGames(badGamesQuery);

  return (
    <main>
      <div style={{ marginLeft: 10 }}>
        <h3 className="category-heading">Highest rated of all time</h3>
        <Carousel
            listItems={goodGames?.map((g) => (
              <GameCover game={g} key={g.slug} />
            ))}
          />
          <h3 className="category-heading">Discover Games</h3>
        {badGames?.length && (
          <Carousel
            listItems={badGames.map((g) => (
              <GameCover game={g} key={g.slug} />
            ))}
          />
        )}
      </div>
    </main>
  );
}

export default Overview;
