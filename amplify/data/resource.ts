import { type ClientSchema, a, defineData, defineFunction, secret } from "@aws-amplify/backend";

const igdbHandler = defineFunction({
  entry: './igdb/handler.ts',
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
    }),
  getGames:
    a
     .query() // So without a model, maybe this doesn't exist?
     .arguments({ query: a.string()})
     .returns(a.ref('Game').array())
     .authorization(allow => [allow.authenticated()])
     .handler(
        a.handler.function(igdbHandler)
     ),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
