import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export default class DiscordSerializer extends PassportSerializer {
  constructor() {
    super();
  }
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    return done(null, user);
  }

  public deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void,
  ) {
    return done(null, payload);
  }
}
