import { Injectable } from '@nestjs/common';
import { StudentRepository } from '@app/db/student/student.repository';
import { CreateStudentDto, UpdateStudentDto } from '@app/student/dto';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  create(data: CreateStudentDto) {
    return this.studentRepository.create(data);
  }

  findManyByGroupId(groupId: number) {
    return this.studentRepository.findManyByGroupId(groupId);
  }

  findAll() {
    return this.studentRepository.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} participant`;
  }

  update(id: number, data: UpdateStudentDto) {
    return this.studentRepository.update(id, data);
  }

  remove(id: number) {
    return this.studentRepository.delete(id);
  }
}
