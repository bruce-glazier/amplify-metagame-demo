import { type ClientSchema, a, defineData, defineFunction, secret } from "@aws-amplify/backend";

const getGamesHandler = defineFunction({
  entry: './igdb/getGames.ts',
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
      cover: a.ref('gameImage'),
      multiplayer_modes: a.ref('multiplayer_modes').array(),
      artworks: a.ref('gameImage').array(),
      genres: a.ref('genre').array(),
      release_dates: a.ref('releaseDate').array(),
      total_rating: a.float(),
      total_rating_count: a.integer(),
      videos: a.ref('gameVideo').array(),
      websites: a.ref('website').array(),
      platforms: a.ref('platforms').array(),
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
  gameVideo: a.customType({
    name: a.string(),
    video_id: a.string().required(),
  }),
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
          human: a.string().required(),
        }),
    website: a.customType({
      category: a.integer(),
      url: a.string().required(),
    }),
    multiplayer_modes: a.customType({
      splitscreen: a.boolean(),
      offlinecoop: a.boolean(),
      onlinemax: a.integer(),
    }),
    platforms: a.customType({
      name: a.string(),
      platform_logo: a.customType({
        url: a.string(),
        alpha_channel: a.boolean(),
      }),
    }),
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
