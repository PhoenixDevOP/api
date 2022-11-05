export default () => ({
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
  authType: ['discord', 'google'],
  session: {
    secret: process.env.SESSION_SECRET,
  },
  authorization: {
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      authorizationURL: process.env.GOOGLE_AUTHORIZATION_URL,
      accessType: 'offline',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
    },
    discord: {
      callbackURL: process.env.DISCORD_CALLBACK_URL,
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      scope: ['guilds', 'identify'],
    },
  },
  login: {
    discord: process.env.DISCORD_LOGIN_URL,
  },
});
