import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Types, config } from '../../../utils';
import { AuthService } from '../auth.service';
@Injectable()
export default class GoogleStrategy extends PassportStrategy(
  Strategy,
  'google',
) {
  constructor(@Inject(Types.ModuleType.AUTH) private auth: AuthService) {
    super(config().authorization.google);
  }
  public validate(accessToken: string, refreshToken: string, profile: Profile) {
    const data: Types.GoogleUser = {
      id: profile.id,
      accessToken,
      refreshToken: refreshToken ?? '',
      metadata: {
        email: profile._json.email,
      },
      type: Types.LoginType.GOOGLE,
      fetchedAt: new Date().toLocaleString(),
    };
    return this.auth.validateUser(data);
  }
}
