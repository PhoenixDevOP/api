export default () => ({
  authType: ['discord'],
  session: {
    secret: process.env.SESSION_SECRET,
  },
  authorization: {
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
