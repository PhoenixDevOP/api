import { Types } from '.';

export default class Validator {
  public static isDiscordUser(
    data: Types.UserResolver,
  ): data is Types.DiscordUser {
    return data.type === Types.LoginType.DISCORD;
  }

  public static isGoogleUser(
    data: Types.UserResolver,
  ): data is Types.GoogleUser {
    return data.type === Types.LoginType.GOOGLE;
  }
}
