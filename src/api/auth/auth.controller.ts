import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthorizedGuard, DiscordGuard, GoogleGuard } from './Guards';

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

  @Get('/logout')
  @UseGuards(AuthorizedGuard)
  public async discordLogout(@Req() req: Request, @Res() res: Response) {
    await req.sessionStore.destroy(req.sessionID);
    return req.logOut(() => res.redirect('/'));
  }

  @UseGuards(GoogleGuard)
  @Get('/google/login')
  public googleLogin() {
    return true;
  }

  @UseGuards(GoogleGuard)
  @Get('/google/authorize')
  public googleAuthorize(@Req() req: Request, @Res() res: Response) {
    return res.redirect('/api/google/@me');
  }
}
