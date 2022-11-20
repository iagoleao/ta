import { PrismaService } from '@app/prisma/prisma.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
