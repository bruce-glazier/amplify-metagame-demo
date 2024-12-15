import { useState } from 'react';
import { useGames } from '../hooks/useGames';
import { Carousel } from '../components/Carousel/Carousel';
import { GameCover } from '../components/GameCover';
import "./Overview.css"

function Overview() {
  const [isCarouselOneLoaded, setIsCarouselOneLoaded] = useState(false);
  const [isCarouselTwoLoaded, setIsCarouselTwoLoaded] = useState(false);

  const { data: topGames } = useGames({
    rating: { rating: 80, rating_type: '>' },
  });
  const { data: lowRatedGames } = useGames({
    rating: { rating: 50, rating_type: '<' },
  });

  return (
    <main>
      <div className='overview-container'>
      {(!isCarouselOneLoaded || !isCarouselTwoLoaded) && (
        <div className="loading" />
      )}
      <h1 className="page-title">MetaGames: Discover new games</h1>
      <div style={{ marginLeft: 10, paddingTop: '20%' }}>
        <h3 className="category-heading" aria-label="Highest rating games of all time" tabIndex={0}>Highest rated of all time</h3>
        <Carousel
          listItems={topGames?.map((g) => (
            <GameCover
              game={g}
              key={g.slug}
              onLoadComplete={() => setIsCarouselOneLoaded(true)}
            />
          ))}
        />
        <h3 className="category-heading" aria-label="Discover new games" tabIndex={0}>Discover Games</h3>
        {lowRatedGames?.length && (
          <Carousel
            listItems={lowRatedGames.map((g) => (
              <GameCover
                game={g}
                key={g.slug}
                onLoadComplete={() => setIsCarouselTwoLoaded(true)}
              />
            ))}
          />
        )}
      </div>
      </div>
    </main>
  );
}

export default Overview;
