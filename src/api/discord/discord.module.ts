import { Module } from '@nestjs/common';
import { Types } from 'src/utils';
import { DiscordController } from './discord.controller';
import { DiscordService } from './discord.service';

@Module({
  controllers: [DiscordController],
  providers: [{ provide: Types.ModuleType.DISCORD, useClass: DiscordService }],
  exports: [{ provide: Types.ModuleType.DISCORD, useClass: DiscordService }],
})
export class DiscordModule {}
