import type { Schema } from '../resource'
import { getToken } from './auth';
import Axios from 'axios';

const baseURL = 'https://api.igdb.com/v4'
const getAxios = async () => {
    const clientId = process.env.CLIENT_ID!;
    const secret = process.env.SECRET!;

    const token = await getToken(clientId, secret);
    return Axios.create({ baseURL, headers: {
        'Client-ID': clientId,
        Authorization: `Bearer ${token}`
    }})
}

export const handler: Schema["getGames"]["functionHandler"] = async (event, context) => {
    // Assert environment variable

    const axios = await getAxios();
    console.log('query text', event.arguments.query)
    const result = await axios.post('/games', event.arguments.query)

    if (result.status !== 200) {
        throw new Error('Failed fetching games')
    }

    console.log('result', result.data)

    return result.data;
};