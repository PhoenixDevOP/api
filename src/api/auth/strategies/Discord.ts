import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-discord';
import { config, Types } from '../../../utils';
import { AuthService } from '../auth.service';

@Injectable()
export default class DiscordStrategy extends PassportStrategy(
  Strategy,
  'discord',
) {
  constructor(@Inject(Types.ModuleType.AUTH) private authService: AuthService) {
    super(config().authorization.discord);
  }
  public validate(accessToken: string, refreshToken: string, profile: Profile) {
    const data: Types.DiscordUser = {
      accessToken,
      fetchedAt: profile.fetchedAt,
      id: profile.id,
      refreshToken,
    };
    const user = this.authService.validateUser(data);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
