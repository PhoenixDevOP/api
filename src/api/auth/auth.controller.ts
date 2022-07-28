import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthorizedGuard, DiscordGuard } from './Guards';

@Controller('api/auth')
export class AuthController {
  @UseGuards(DiscordGuard)
  @Get('/discord/login')
  public discordLogin() {
    return true;
  }

  @UseGuards(DiscordGuard)
  @Get('/discord/authorize')
  public discordAuthorize(@Res() res: Response) {
    return res.redirect('/api/discord/@me');
  }

  @Get('/discord/logout')
  @UseGuards(AuthorizedGuard)
  public async discordLogout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy(null);
    await req.sessionStore.destroy(req.sessionID);
    return req.logOut(() => res.redirect('/'));
  }
}
