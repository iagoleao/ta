import { UserModule } from '@app/user/user.module';
import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

@Module({
  imports: [DbModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
