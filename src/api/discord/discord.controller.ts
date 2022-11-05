import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthorizedGuard } from '../auth/Guards';
import { Types, Utils } from '../../utils';
import { Request } from 'express';
import { DiscordService } from './discord.service';

@Controller('api/discord')
export class DiscordController {
  constructor(
    @Inject(Types.ModuleType.DISCORD) private discordService: DiscordService,
  ) {}
  @UseGuards(AuthorizedGuard)
  @Get('/@me')
  public me(@Req() req: Request) {
    return Utils.getUser<Types.DiscordUser>(req.user);
  }
  @Get('/guilds/:id')
  @UseGuards(AuthorizedGuard)
  public getGuildById(@Param('id') id: string) {
    const guild = this.discordService.findGuildById(id);
    if (!guild) throw new NotFoundException();
    return guild;
  }
}
