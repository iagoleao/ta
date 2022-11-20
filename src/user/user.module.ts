import { DbModule } from '@app/db/db.module';
import { UserService } from '@app/user/user.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [DbModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
