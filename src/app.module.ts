import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { DiscordModule } from './api/discord/discord.module';
import { GoogleModule } from './api/google/google.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
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
    GoogleModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: '/api/google/@me',
        method: RequestMethod.GET,
      },
      {
        method: RequestMethod.GET,
        path: '/api/discord/@me',
      },
    );
  }
}
