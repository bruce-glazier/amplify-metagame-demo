import { useState } from 'react';
import { useGames } from '../hooks/useGames';
import { Carousel } from '../components/Carousel/Carousel';
import { GameCover } from '../components/GameCover';

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
      {(!isCarouselOneLoaded || !isCarouselTwoLoaded) && (
        <div className="loading" />
      )}
      <div style={{ marginLeft: 10, paddingTop: '50%' }}>
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
    </main>
  );
}

export default Overview;
