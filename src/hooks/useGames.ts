import type { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import { useQuery } from '@tanstack/react-query';
import compact from 'lodash/compact';

const client = generateClient<Schema>();

type GamesQueryProps = {
  rating?: {
    rating_type: '>' | '<';
    rating: number;
  };
  slug?: string; // Match specific games by slug Id
};

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
    placeholderData: [
      { slug: 'loading-1' },
      { slug: 'loading-2' },
      { slug: 'loading-3' },
      { slug: 'loading-4' },
      { slug: 'loading-5' },
      { slug: 'loading-6' },
      { slug: 'loading-7' },
      { slug: 'loading-8' },
      { slug: 'loading-9' },
    ],
  });

export const getGamesQuery = (queryProps: GamesQueryProps) => {
  let query =
    'fields *, artworks.*, cover.*, genres.name, videos.*; sort rating_count desc; limit 16;';
  if (queryProps.rating || queryProps.slug) {
    query = query.concat(' where ');
  }

  if (queryProps.rating) {
    const { rating, rating_type } = queryProps.rating;
    query = query.concat(`rating ${rating_type}= ${rating}`);
  }

  if (queryProps.slug) {
    if (queryProps.rating) query.concat(' & ');
    query = query.concat(`slug = "${queryProps.slug}"`);
  }

  if (queryProps.rating || queryProps.slug) {
    query = query.concat(';');
  }
  
  return query;
};

export const getLargeUri = (imageUri: string) =>
  imageUri.replace(`t_thumb`, 't_1080p');
