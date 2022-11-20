import { DbModule } from '@app/db/db.module';
import { GroupController } from '@app/group/group.controller';
import { GroupService } from '@app/group/group.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [DbModule],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
