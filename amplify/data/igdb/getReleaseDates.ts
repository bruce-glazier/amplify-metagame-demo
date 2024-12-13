import type { Schema } from '../resource'
import { getAxios } from './auth';


export const handler: Schema["getReleaseDates"]["functionHandler"] = async (event, context) => {
    const axios = await getAxios();
    const result = await axios.post('/release_dates', event.arguments.query)

    if (result.status !== 200) {
        throw new Error('Failed fetching by release date')
    }

    console.log(result.data)
    console.log(result.statusText)
    return result.data;
};