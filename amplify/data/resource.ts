import { type ClientSchema, a, defineData, defineFunction, secret } from "@aws-amplify/backend";

const getGamesHandler = defineFunction({
  entry: './igdb/getGames.ts',
  environment: {
    CLIENT_ID: secret('twitch-client-id'),
    SECRET: secret('twitch-secret')
  }
})

const getReleaseDatesHandler = defineFunction({
  entry: './igdb/getReleaseDates.ts',
  environment: {
    CLIENT_ID: secret('twitch-client-id'),
    SECRET: secret('twitch-secret')
  }
})


const schema = a.schema({
  Game: a
    .customType({
      slug: a.string().required(),
      name: a.string(),
      summary: a.string(),
      storyline: a.string(),
      cover: a.string(),
      artworks: a.ref('gameImage').array(),
      genres: a.ref('genre').array(),
      total_rating: a.float(),
      total_rating_count: a.integer(),
    }),
  getGames:
    a
     .query()
     .arguments({ query: a.string()})
     .returns(a.ref('Game').array())
     .authorization(allow => [allow.publicApiKey()])
     .handler(
        a.handler.function(getGamesHandler)
     ),
  gameImage: a.
     customType({
      alpha_channel: a.boolean(),
      animated: a.boolean(),
      checksum: a.string(),
      game: a.string(),
      game_localization: a.string(),
      height: a.integer(),
      image_id: a.string(),
      url: a.string().required(),
      width: a.integer(),
     }),
    genre: 
      a.customType({
        name: a.string()
      }),
    releaseDate: 
        a.customType({
          game: a.string().required()
        }),
    getReleaseDates: 
      a
      .query()
      .arguments({ query: a.string()})
      .returns(a.ref('releaseDate').array())
      .authorization(allow => [allow.publicApiKey()])
      .handler(
        a.handler.function(getReleaseDatesHandler)
      ),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
