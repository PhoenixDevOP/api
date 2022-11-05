import { ForbiddenException } from '@nestjs/common';
import { google } from 'googleapis';
import { config } from '.';
export default class Utils {
  static defer<T extends (...args: unknown[]) => any, A extends unknown[]>(
    callback: T,
    ...args: A
  ) {
    return setImmediate(() => callback(...args));
  }
  public static getUser<T>(user: Express.User) {
    if (!user) throw new ForbiddenException();
    return user as T;
  }
  public static generateGoogleURL() {
    const data = new google.auth.OAuth2({
      clientId: config().authorization.google.clientID,
      clientSecret: config().authorization.google.clientSecret,
      redirectUri: config().authorization.google.callbackURL,
    });
    const AuthURL = data.generateAuthUrl({
      access_type: 'offline',
      scope: config().authorization.google.scope,
      include_granted_scopes: true,
    });
    return AuthURL;
  }
}
