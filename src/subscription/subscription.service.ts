import { Injectable } from '@nestjs/common';
import { SubscriptionRepository } from '@app/db/subscription/subscription.repository';
import {
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
} from '@app/subscription/dto';
import { StudentRepository } from '@app/db/student/student.repository';
import { GroupRepository } from '@app/db/group/group.repository';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly studentRepository: StudentRepository,
    private readonly groupRepository: GroupRepository,
  ) {}

  async create(data: CreateSubscriptionDto) {
    const [student, group] = await Promise.all([
      this.studentRepository.findByUUIDOrFail(data.studentId),
      this.groupRepository.findByUUIDOrFail(data.groupId),
    ]);

    return this.subscriptionRepository.create({
      studentId: student.id,
      groupId: group.id,
    });
  }

  findAll() {
    return this.subscriptionRepository.findMany();
  }

  findOne(id: string) {
    return `This action returns a #${id} participant`;
  }

  update(uuid: string, data: UpdateSubscriptionDto) {
    return this.subscriptionRepository.update(uuid, data);
  }
}
