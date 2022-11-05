import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { Types, Validator } from '../../utils';

@Injectable()
export class AuthService {
  constructor(@Inject(Types.ModuleType.PRISMA) private prisma: PrismaService) {}
  public async validateUser<T extends Types.UserResolver>(data: T) {
    if (Validator.isDiscordUser(data))
      return await this.validateDiscordUser(data);
    if (Validator.isGoogleUser(data))
      return await this.validateGoogleUser(data);
    return null;
  }

  private async validateDiscordUser(context: Types.DiscordUser) {
    const user = await this.resolver(context);
    if (context.accessToken !== user.accessToken) {
      await this.prisma.user.update({
        where: { id: context.id },
        data: context,
      });
    }
    return user;
  }
  private async validateGoogleUser(context: Types.GoogleUser) {
    const user = await this.resolver(context);
    if (context.accessToken !== user.accessToken)
      await this.prisma.user.update({
        where: { id: context.id },
        data: context,
      });
    return user;
  }

  private async resolver(context: Types.UserResolver) {
    let user = await this.prisma.user.findUnique({ where: { id: context.id } });
    if (!user) user = await this.prisma.user.create({ data: context });
    return user;
  }
}
