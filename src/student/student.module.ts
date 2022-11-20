import { DbModule } from '@app/db/db.module';
import { StudentController } from '@app/student/student.controller';
import { StudentService } from '@app/student/student.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [DbModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
