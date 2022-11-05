import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Types, Utils } from 'src/utils';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  public use(req: Request, _res: Response, next: NextFunction) {
    const user = Utils.getUser<Types.BaseUserData>(req.user);
    if (!user) throw new ForbiddenException('Forbidden resource');
    if (req.path === `/api/${user.type.toLowerCase()}/@me`) next();
    else throw new UnauthorizedException();
  }
}
