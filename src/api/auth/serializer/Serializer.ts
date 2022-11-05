import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Types } from '../../../utils';

@Injectable()
export default class Serializer extends PassportSerializer {
  constructor() {
    super();
  }
  serializeUser(user: Express.User, done: Types.Done) {
    return done(null, user);
  }

  public deserializeUser(user: Express.User, done: Types.Done) {
    return done(null, user);
  }
}
