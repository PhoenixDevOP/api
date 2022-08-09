import { Module } from '@nestjs/common';
import { Types } from '../utils';
import { PrismaService } from './prisma.service';

@Module({
  providers: [{ provide: Types.ModuleType.PRISMA, useClass: PrismaService }],
  exports: [{ provide: Types.ModuleType.PRISMA, useClass: PrismaService }],
})
export class ServicesModule {}
