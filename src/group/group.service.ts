import { GroupRepository } from '@app/db/group/group.repository';
import { CreateGroupDto, UpdateGroupDto } from '@app/group/dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  create(data: CreateGroupDto) {
    return this.groupRepository.create({
      ...data,
      subjectId: 1,
    });
  }

  findAll() {
    return this.groupRepository.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, data: UpdateGroupDto) {
    return this.groupRepository.update(id, {
      ...data,
      subjectId: 1,
    });
  }

  remove(id: number) {
    return this.groupRepository.delete(id);
  }
}
