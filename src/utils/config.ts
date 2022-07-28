export default () => ({
  session: {
    secret: process.env.SESSION_SECRET,
  },
  authorization: {
    github: {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user'],
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
