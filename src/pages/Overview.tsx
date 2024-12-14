import { useState } from 'react';
import { getGamesQuery, useGames } from '../hooks/useGames';
import { Carousel } from '../components/Carousel/Carousel';
import { GameCover } from '../components/GameCover';

function Overview() {
  const [topRated] = useState(getGamesQuery(80));
  const [lowRated ] = useState(getGamesQuery(50, true));
  const [isCarouselOneLoaded, setIsCarouselOneLoaded] = useState(false);
  const [isCarouselTwoLoaded, setIsCarouselTwoLoaded] = useState(false);

  const { data: topGames } = useGames(topRated);
  const { data: lowRatedGames } = useGames(lowRated);

  return (
      <main>
        {(!isCarouselOneLoaded || !isCarouselTwoLoaded) && <div className="loading"/>}
        <div style={{ marginLeft: 10, paddingTop: '50%' }}>
          <h3 className="category-heading">Highest rated of all time</h3>
          <Carousel
              listItems={topGames?.map((g) => (
                <GameCover game={g} key={g.slug} onLoadComplete={() => setIsCarouselOneLoaded(true)}/>
              ))}
            />
            <h3 className="category-heading">Discover Games</h3>
          {lowRatedGames?.length && (
            <Carousel
              listItems={lowRatedGames.map((g) => (
                <GameCover game={g} key={g.slug} onLoadComplete={() => setIsCarouselTwoLoaded(true)} />
              ))}
            />
          )}
        </div>
      </main>
    );
}

export default Overview;
