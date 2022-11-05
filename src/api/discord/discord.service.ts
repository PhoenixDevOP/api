import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Types, Utils } from 'src/utils';
@Injectable({ scope: Scope.REQUEST })
export class DiscordService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}
  public findGuildById(id: string) {
    const user = Utils.getUser<Types.DiscordUser>(this.request.user);
    const guild = user.metadata.guilds.find((guild) => guild.id === id);
    return guild;
  }
}
