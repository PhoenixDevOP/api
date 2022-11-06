import {
  ForbiddenException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Types, Utils } from '../utils';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user = Utils.getUser<Types.BaseUserData>(req.user);
    if (!user) throw new ForbiddenException('Forbidden resource');
    if (req.path.includes(user.type.toLowerCase())) next();
    else throw new UnauthorizedException();
  }
}
