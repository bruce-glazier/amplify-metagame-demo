
import type { Schema } from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'
import { useQuery } from '@tanstack/react-query'

const client = generateClient<Schema>();

export const useReleaseDates = () => useQuery({
    queryKey: ['getReleaseDates'],
    queryFn: async () => {
        const year2023Time = new Date();
        year2023Time.setFullYear(2023, 1, 1);
        const year2023AsSeconds = year2023Time.valueOf();
        const result = await client.queries.getReleaseDates({
            query: `fields *; where game.platforms = 48 & date > ${year2023AsSeconds}; sort date desc;`
        });

        if (!result.data) return null;

        return result.data;
    },
})


export const useGames = () => useQuery({
    queryKey: ['getGames'],
    queryFn: async () => {
        const year2023Time = new Date();
        year2023Time.setFullYear(2023, 1, 1);
        const year2023AsSeconds = year2023Time.valueOf();

        const result = await client.queries.getGames({
            query: `fields *, artworks.*, genres.name; sort rating_count desc; limit 10; where rating >= 80 & release_dates.date > ${year2023AsSeconds};`
        });

        if (!result.data) return null;
  
        return result.data;
    },
})