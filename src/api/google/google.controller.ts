import { Controller, UseGuards, Get, Req } from '@nestjs/common';
import { Types } from '../../utils';
import { Request } from 'express';
import { AuthorizedGuard } from '../auth/Guards';
import { GoogleUser } from 'src/utils/Types';

@Controller('api/google')
export class GoogleController {
  @UseGuards(AuthorizedGuard)
  @Get('/@me')
  public me(@Req() req: Request): Types.GoogleUser {
    return req.user as GoogleUser;
  }
}
