import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthorizedGuard } from '../auth/Guards';
import { Types } from '../../utils';
import { Request } from 'express';

@Controller('api/discord')
export class DiscordController {
  @UseGuards(AuthorizedGuard)
  @Get('/@me')
  public me(@Req() req: Request): Types.DiscordUser {
    return req.user as Types.DiscordUser;
  }
}
