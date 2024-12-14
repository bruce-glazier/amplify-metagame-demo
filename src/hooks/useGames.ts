import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import { useQuery } from '@tanstack/react-query';
import compact from 'lodash/compact';

const client = generateClient<Schema>();

export const useReleaseDates = () =>
  useQuery({
    queryKey: ['getReleaseDates'],
    queryFn: async () => {
      const year2023Time = new Date();
      year2023Time.setFullYear(2023, 1, 1);
      const year2023AsSeconds = year2023Time.valueOf();
      const result = await client.queries.getReleaseDates({
        query: `fields *; where game.platforms = 48 & date > ${year2023AsSeconds}; sort date desc;`,
      });

      if (!result.data) return null;

      return result.data;
    },
  });

type GamesQueryProps = {
  rating?: {
    rating_type: '>' | '<',
    rating: number;
  };
  slug?: string // Match specific games by slug Id
}

export const useGames = (queryProps: GamesQueryProps) =>
  useQuery({
    queryKey: ['getGames', queryProps],
    queryFn: async () => {
      const query = getGamesQuery(queryProps);
      const result = await client.queries.getGames({
        query,
      });

      if (!result.data) return null;

      return result.data;
    },
    select: (s) => compact(s), // Only keep defined values, mostly for typing
    placeholderData: [{ slug: 'loading-1' }, { slug: 'loading-2' }, { slug: 'loading-3' }, { slug: 'loading-4' }, { slug: 'loading-5' }, { slug: 'loading-6' }, { slug: 'loading-7' }, { slug: 'loading-8' }, { slug: 'loading-9' }],
  });

export const getGamesQuery = (queryProps: GamesQueryProps) => {
  let query = 'fields *, artworks.*, cover.*, genres.name; sort rating_count desc; limit 16;'
  if (queryProps.rating || queryProps.slug) {
    query = query.concat(' where ')
  }

  if (queryProps.rating) {
    const { rating, rating_type } = queryProps.rating;
    query = query.concat(`rating ${rating_type}= ${rating}`)
  } 
  
  if (queryProps.slug) {
    if (queryProps.rating) query.concat(' & ');
    query = query.concat(`slug = "${queryProps.slug}"`);
  }

  if (queryProps.rating || queryProps.slug) {
    query = query.concat(';');
  }

  console.log(query)
  return query;
};
