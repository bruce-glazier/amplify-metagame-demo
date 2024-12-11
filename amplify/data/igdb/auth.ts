import { Cache } from 'aws-amplify/utils';
import Axios from 'axios';

const fetchAccessToken = async (clientId: string, secret: string) => {
    const twitchAuthURL = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${secret}&grant_type=client_credentials`
    const response = await Axios.post(twitchAuthURL, undefined, { 
        headers: {
        'Content-Type': 'application/json'
    }})

    if (response.status !== 200) {
        throw new Error(`Failed to fetch access token: ${response.statusText}`)
    }

    return response.data;
};

const getNewToken = async (clientId: string, secret: string) => {
    console.log('About to fetch token')
    const tokenResponse = await fetchAccessToken(clientId, secret)
    console.log(tokenResponse)
    const { access_token, expires_in } = tokenResponse;
    const expireTime = new Date()
    expireTime.setSeconds(expireTime.getSeconds() + expires_in)
    Cache.setItem('twitchToken', access_token, { expires: expireTime.getTime() })
    return access_token;
}

export const getToken = async (clientId: string, secret: string) => {
    console.log('getToken', clientId)
    const cachedToken = await Cache.getItem('twitchToken')
    return cachedToken ?? await getNewToken(clientId, secret);
};
