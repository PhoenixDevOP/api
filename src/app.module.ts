import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { DiscordModule } from './api/discord/discord.module';
import { ServicesModule } from './services/services.module';
import config from './utils/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    AuthModule,
    DiscordModule,
    ServicesModule,
  ],
})
export class AppModule {}
