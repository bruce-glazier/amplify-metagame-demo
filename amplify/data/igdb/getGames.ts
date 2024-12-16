import type { Schema } from '../resource'
import { getAxios } from './auth';


export const handler: Schema["getGames"]["functionHandler"] = async (event, context) => {
    const axios = await getAxios();
    const result = await axios.post('/games', event.arguments.query)

    if (result.status !== 200) {
        throw new Error('Failed fetching games')
    }
    
    return result.data;
};