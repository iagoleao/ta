import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma/prisma.module';
import { StudentRepository } from '@app/db/student/student.repository';
import { UserRepository } from '@app/db/user/user.repository';
import { GroupRepository } from '@app/db/group/group.repository';
import { SubjectRepository } from '@app/db/subject/subject.repository';
import { SubscriptionRepository } from '@app/db/subscription/subscription.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    StudentRepository,
    UserRepository,
    GroupRepository,
    SubjectRepository,
    SubscriptionRepository,
  ],
  exports: [
    StudentRepository,
    UserRepository,
    GroupRepository,
    SubjectRepository,
    SubscriptionRepository,
  ],
})
export class DbModule {}
