import { Module } from '@nestjs/common';
import { DbModule } from '@app/db/db.module';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';

@Module({
  imports: [DbModule],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
