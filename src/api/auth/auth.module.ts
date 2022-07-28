import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { DiscordStrategy } from './strategies';
import Serializer from './serializer/Serializer';
import { ServicesModule } from 'src/services/services.module';
import { Types } from 'src/utils';

@Module({
  imports: [PassportModule.register({ session: true }), ServicesModule],
  providers: [
    { provide: Types.ModuleType.AUTH, useClass: AuthService },
    DiscordStrategy,
    Serializer,
  ],
  controllers: [AuthController],
  exports: [{ provide: Types.ModuleType.AUTH, useClass: AuthService }],
})
export class AuthModule {}
