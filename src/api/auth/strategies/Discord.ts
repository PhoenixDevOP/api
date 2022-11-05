import { Inject, Injectable } from '@nestjs/common';
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
  public async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {
    const guilds: Types.GuildMetaData[] = profile.guilds.map((guild) => ({
      features: guild.features,
      icon: guild.icon,
      id: guild.id,
      name: guild.name,
      owner: guild.owner,
      permissions: guild.permissions,
    }));
    const data: Types.DiscordUser = {
      type: Types.LoginType.DISCORD,
      accessToken,
      fetchedAt: profile.fetchedAt,
      id: profile.id,
      metadata: { guilds },
      refreshToken,
    };
    return await this.authService.validateUser(data);
  }
}
