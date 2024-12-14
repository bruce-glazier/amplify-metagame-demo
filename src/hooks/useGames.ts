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

export const useGames = (gamesQuery: string) =>
  useQuery({
    queryKey: ['getGames', gamesQuery],
    queryFn: async () => {
      const result = await client.queries.getGames({
        query: gamesQuery,
      });

      if (!result.data) return null;

      return result.data;
    },
    select: (s) => compact(s), // Only keep defined values, mostly for typing
    placeholderData: [{ slug: 'loading-1' }, { slug: 'loading-2' }, { slug: 'loading-3' }, { slug: 'loading-4' }, { slug: 'loading-5' }, { slug: 'loading-6' }, { slug: 'loading-7' }, { slug: 'loading-8' }, { slug: 'loading-9' }],
  });

export const getGamesQuery = (rating: number, lessThan?: boolean) => {
  const year2023Time = new Date();
  year2023Time.setFullYear(2024, 1, 1);
  const year2023AsSeconds = year2023Time.valueOf();
  return `fields *, artworks.*, cover.*, genres.name; sort rating_count desc; limit 16; where rating ${lessThan ? '<' : '>'}= ${rating} & release_dates.date > ${year2023AsSeconds} & artworks != null;`;
};
