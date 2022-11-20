import { Injectable } from '@nestjs/common';
import { SubjectRepository } from '@app/db/subject/subject.repository';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(private readonly subjectRepository: SubjectRepository) {}

  create(data: CreateSubjectDto) {
    return this.subjectRepository.create(data);
  }

  findAll() {
    return this.subjectRepository.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} participant`;
  }

  update(id: number, data: UpdateSubjectDto) {
    return this.subjectRepository.update(id, data);
  }

  remove(id: number) {
    return this.subjectRepository.delete(id);
  }
}
